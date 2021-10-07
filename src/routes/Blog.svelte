<script context="module">
	let posts = [];
	export function preload() {
		return fetch('https://jsonplaceholder.typicode.com/posts')
			.then(r => r.json())
			.then(arr => {
				posts = arr;
			});
	}
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<li><a href="/blog/{post.id}">{post.title}</a></li>
	{/each}
</ul>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>
