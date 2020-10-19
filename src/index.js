import Navaid from 'navaid';
import GAnalytics from 'ganalytics';
import App from './components/App.svelte';

var app, Route, params
var pathname = location.pathname;
function update(props) {
	if (app) {
		app.$set(props);
	} else {
		// init
		app = new App({
			hydrate: true,
			target: document.body,
			props,
		});
	}
}

function run(thunk, obj) {
	const target = pathname;

	thunk.then(m => {
		if (target !== pathname) return;

		params = obj || {};

		if (m.preload) {
			m.preload({ params }).then(() => {
				if (target !== pathname) return;
				Route = m.default;
				update({ Route, params });
				// window.scrollTo(0, 0);
			});
		} else {
			Route = m.default;
			update({ Route, params });
			// window.scrollTo(0, 0);
		}
	});
}

function track(obj) {
	pathname = location.pathname;
	var dp = obj.state || obj.uri || pathname;
	if (window.ga) ga.send('pageview', { dp });
	if (app) update({ pathname });
}

addEventListener('replacestate', track);
addEventListener('pushstate', track);
addEventListener('popstate', track);


	// let Route, params={}, active;
	// let uri = location.pathname;
	// $: active = uri.split('/')[1] || 'home';

// Init
Navaid('/')
	.on('/', () => run(import('./routes/Home.svelte')))
	.on('/about', () => run(import('./routes/About.svelte')))
	.on('/blog', () => run(import('./routes/Blog.svelte')))
	.on('/blog/:postid', obj => run(import('./routes/Article.svelte'), obj))
	.listen(pathname);


if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');
}
