<script>
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import Nav from './Nav.svelte';

	let Route, params={}, active;
	let uri = location.pathname;
	$: active = uri.split('/')[1] || 'home';

	function run(thunk, obj) {
		const target = uri;

		thunk.then(m => {
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

	function track(obj) {
		uri = obj.state || obj.uri || location.pathname;
		if (window.ga) ga.send('pageview', { dp:uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	const router = Navaid('/')
		.on('/', () => run(import('../routes/Home.svelte')))
		.on('/about', () => run(import('../routes/About.svelte')))
		.on('/blog', () => run(import('../routes/Blog.svelte')))
		.on('/blog/:postid', obj => run(import('../routes/Article.svelte'), obj))
		.listen();

	onDestroy(router.unlisten);
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
