import * as path from 'path';
import { promises as fs } from 'fs';
import { existsSync, statSync } from 'fs';
import { totalist } from 'totalist';

import type { Plugin } from 'rollup';

export function copy(inputs: string[]): Plugin {
	let root = path.resolve('.');
	let srcdir: string, files: string[] = [];

	inputs = inputs.map(str => {
		return path.join(root, str);
	}).filter(existsSync);

	return {
		name: 'copy',
		async buildStart(options) {
			let entry = (options.input as string[])[0];
			srcdir = srcdir || path.dirname(entry);

			files = [];

			await Promise.all(
				inputs.map(item => {
					if (statSync(item).isFile()) {
						this.addWatchFile(item);
						files.push(item);
					} else {
						return totalist(item, (_, file) => {
							this.addWatchFile(file);
							files.push(file);
						});
					}
				})
			);
		},
		async generateBundle() {
			await Promise.all(
				files.map(file => {
					return fs.readFile(file).then(source => {
						let fileName = path.relative(srcdir, file);
						this.emitFile({ type: 'asset', fileName, source });
					});
				})
			);
		}
	};
}
