<Nav {active} />

<main>
	<svelte:component this={Route} {params} />
</main>

<script>
	import Navaid from 'navaid';
	import { onMount, setContext } from 'svelte';
	import { isAdmin, isUser } from '../stores/auth';
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

	const router = (
		Navaid('/')
		.on('/', () => run(import('../routes/Home.svelte')))
		.on('/about', () => run(import('../routes/About.svelte')))
		.on('/login', () => run(import('../routes/Login.svelte')))
		.on('/private', () => onAdmin(import('../routes/Private.svelte')))
		.on('/forbidden', () => run(import('../routes/Forbidden.svelte')))
		.on('/blog', () => run(import('../routes/Blog.svelte')))
		.on('/blog/:postid', obj => run(import('../routes/Article.svelte'), obj))
	);

	function onAdmin(thunk, obj) {
		if ($isAdmin) return run(thunk, obj);
		if ($isUser) return router.route('/forbidden', true);
		router.route('/login', true);
	}

	onMount(() => {
		// available to App children
		setContext('router', router);

		return router.listen();
	});
</script>

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
