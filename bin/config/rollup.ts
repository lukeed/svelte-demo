import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import { typescript } from 'svelte-preprocess-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { esbuild } from './esbuild';
import { copy } from './copy';

import type { RollupOptions, OutputOptions } from 'rollup';

export type Options = RollupOptions & {
	output: OutputOptions;
}

export default function (isProd: boolean): Options {
	let plugins = [
		svelte({
			compilerOptions: {
				dev: !isProd,
			},
			preprocess: [
				typescript()
			]
		}),

		css({
			output: 'bundle.css',
		}),

		esbuild(),

		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

		commonjs(),

		copy([
			'src/index.html',
			'src/assets',
		]),

		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify(
				isProd ? 'production' : 'development'
			)
		}),
	];

	// minify if `npm run build`
	if (isProd) plugins.push(
		terser({
			mangle: true,
			compress: true,
			output: {
				comments: false
			}
		})
	);

	return {
		input: 'src/index.ts',
		output: {
			name: 'app',
			format: 'esm',
			sourcemap: !isProd,
			chunkFileNames: isProd ? '[name].[hash].js' : '[name].js',
			entryFileNames: '[name].js', //=> index.js
			dir: 'public',
		},
		preserveEntrySignatures: false,
		plugins: plugins,
		watch: {
			clearScreen: false
		}
	};
}
