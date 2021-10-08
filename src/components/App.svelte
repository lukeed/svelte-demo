<script lang="ts">
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import Nav from './Nav.svelte';

	let uri = location.pathname;
	let Route: Component, params: Params = {};
	$: active = uri.split('/')[1] || 'home';

	function run(thunk: Promise<any>, obj?: Params) {
		const target = uri;

		(thunk as RouteLoader).then(m => {
			if (target !== uri) return;

			params = obj || {};

			if (m.preload) {
				m.preload({ params }).then(() => {
					if (target !== uri) return;
					Route = m.default;
					window.scrollTo(0, 0);
				});
			} else {
				Route = m.default;
				window.scrollTo(0, 0);
			}
		});
	}

	function track(obj: Event & { state?: string, uri?: string }) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) window.ga.send('pageview', { dp: uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	const router = Navaid('/')
		.on('/', () => run(import('../routes/Home.svelte')))
		.on('/about', () => run(import('../routes/About.svelte')))
		.on('/blog/:postid', p => run(import('../routes/Article.svelte'), p))
		.on('/blog', () => run(import('../routes/Blog.svelte')))
		.listen();

	onDestroy(router.unlisten!);
</script>

<Nav {active} />

<main>
	<svelte:component this={Route} {params} />
</main>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
