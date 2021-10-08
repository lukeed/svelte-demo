/// <reference types="svelte" />

interface Window {
	ga?: import('ganalytics').GAnalytics;
}

interface Post {
	id: string;
	title: string;
	body: string;
}

type Component = import('svelte').SvelteComponent;

type RouteLoader = Promise<RouteComponent>;

type RouteComponent = {
	default: Component;
	preload?(req: { params: Params }): Promise<void>;
};

// App Routes
type Params = {
	postid?: string;
}
