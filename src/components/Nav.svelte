<nav>
	<ul>
		<li><a class="{ isActive('home') }" href="/">home</a></li>
		<li><a class="{ isActive('about') }" href="/about">about</a></li>
		<li><a class="{ isActive('blog') }" href="/blog">blog</a></li>
		{#if $isUser}
			<li><a class="{ isActive('private') }" href="/private">private</a></li>
			<li class="action"><a href="#" on:click|preventDefault={logout}>logout</a></li>
		{:else}
			<li class="action"><a class="{ isActive('login') }" href="/login">login</a></li>
		{/if}
	</ul>
</nav>

<script>
	import { getContext, tick } from 'svelte';
	import { user, isUser } from '../stores/auth';

	export let active;
	$: isActive = str => active === str ? 'selected' : '';

	function logout() {
		user.set(false);
		// Or move this to App as `isUser` subscription
		let rr = getContext('router');
		setTimeout(() => {
			rr.route('/login', true);
		}, 1);
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(170,30,30,0.1);
		font-weight: 300;
		padding: 0 1em;
	}
	ul {
		margin: 0;
		padding: 0;
	}
	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}
	li {
		display: block;
		float: left;
	}
	li.action {
		color: rgb(170,30,30);
		float: right;
	}
	.selected {
		position: relative;
		display: inline-block;
	}
	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(170,30,30);
		display: block;
		bottom: -1px;
	}
	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
