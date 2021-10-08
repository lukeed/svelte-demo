import { transform } from 'esbuild';

import type { TransformOptions } from 'esbuild';
import type { Plugin } from 'rollup';

export function esbuild(options?: TransformOptions): Plugin {
	return {
		name: 'esbuild',
		async transform(code, file) {
			let result = await transform(code, {
				sourcemap: 'external',
				logLevel: 'warning',
				...options,
				sourcefile: file,
				format: 'esm',
			});

			return {
				code: result.code,
				map: result.map,
			};
		}
	};
}
