<Nav {active} />

<main>
	<svelte:component this={Route} {params} />
</main>

<script>
	import Nav from './Nav.svelte';

	export let Route;
	export let params = {};
	export let pathname = '';

	$: if (Route) window.scrollTo(0, 0);
	$: active = pathname.split('/')[1] || 'home';
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
