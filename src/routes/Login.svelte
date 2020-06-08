<script>
	import { getContext } from 'svelte';
	import { user } from '../stores/auth';

	function login(bool) {
		user.set({ admin: bool });
		// redirect to home page?
		let rr = getContext('router');
		rr.route('/', true);
	}
</script>

<h1>LOGIN</h1>

<button on:click={() => login(false)}>LOGIN AS USER</button>
<button on:click={() => login(true)}>LOGIN AS ADMIN</button>
