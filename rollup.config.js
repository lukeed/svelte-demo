import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const isProd = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
		name: 'app',
		format: 'esm',
		sourcemap: true,
		dir: 'public',
	},
	preserveEntrySignatures: false,
	plugins: [
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

		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify(
				isProd ? 'production' : 'development'
			)
		}),

		// minify if `npm run build`
		isProd && terser()
	],

	watch: {
		clearScreen: false
	}
};
