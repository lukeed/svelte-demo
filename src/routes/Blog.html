<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<li><a href="/blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>

<script context="module">
	let items = [];
	export function preload() {
		return fetch('https://sapper-template.now.sh/blog.json')
			.then(r => r.json())
			.then(arr => {
				items = arr;
			});
	}
</script>

<script>
	let posts = items;
	// ^ Current workaround
	// @see https://github.com/sveltejs/svelte/issues/2001
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>
