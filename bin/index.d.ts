declare module 'servor' {
	export interface Options {
		root?: string;
		module?: boolean;
		fallback?: string;
		reload?: boolean;
		static?: boolean;
		inject?: string;
		port?: string | number;
		credentials?: boolean;
	}

	export interface Output {
		url: string;
		root: string;
		protocol: string;
		port: number;
		ips: string[];
	}

	export default function (options?: Options): Promise<Output>;
}

declare module 'rollup-plugin-css-only' {
	import type { Plugin, OutputBundle } from 'rollup';

	export interface Options {
		include?: string[];
		exclude?: string[];
		output?: string | false | null | (
			(css: string, styles: Record<string, string>, bundle: OutputBundle) => void
		);
	}

	export default function (options?: Options): Plugin;
}
