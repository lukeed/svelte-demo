/// <reference types="." />
import GAnalytics from 'ganalytics';
import App from './components/App.svelte';

new App({
	target: document.body
});

if (process.env.NODE_ENV === 'production') {
	window.ga = GAnalytics('UA-XXXXXXXX-X');
}
