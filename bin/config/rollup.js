import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import { copy } from './copy.js';

/**
 * @param {boolean} isProd
 * @returns {import('rollup').RollupOptions}
 */
export default function (isProd) {
	let plugins = [
		svelte({
			compilerOptions: {
				dev: !isProd,
			}
		}),

		css({
			output: 'bundle.css',
		}),

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
		input: 'src/index.js',
		output: {
			name: 'app',
			format: 'esm',
			sourcemap: !isProd,
			chunkFileNames: isProd ? '[name].[hash].js' : '[name].js',
			entryFileNames: '[name].js',
			dir: 'public',
		},
		preserveEntrySignatures: false,
		plugins: plugins,
		watch: {
			clearScreen: false
		}
	};
}
