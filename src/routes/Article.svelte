<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class="content">
	{@html post.body}
</div>

<script context="module">
	let item = {};

	function load(postid) {
		const curr = item.id;
		const isCurrent = curr && curr == postid;
		if (!postid || isCurrent) return Promise.resolve(item);
		return fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`).then(r => r.json());
	}

	export function preload(req) {
		return load(req.params.postid).then(obj => item = obj);
	}
</script>

<script>
	// Comes from App (router)
	export let params = {};

	// Initial value (preload)
	let post = item;

	// Reactively update `post` value
	$: load(params.postid).then(obj => post = obj);
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}
	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}
	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}
	.content :global(ul) {
		line-height: 1.5;
	}
	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>
