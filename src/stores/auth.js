import { writable, derived } from 'svelte/store';

export const user = writable(false);
export const isUser = derived(user, x => !!x);
export const isAdmin = derived(user, x => !!x && !!(x.admin));
