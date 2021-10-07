// @ts-check
import * as path from 'path';
import { promises as fs } from 'fs';
import { existsSync, statSync } from 'fs';
import { totalist } from 'totalist';

/**
 * @param {string[]} inputs
 * @returns {import('rollup').Plugin}
 */
export function copy(inputs) {
	let root = path.resolve('.');
	let srcdir, files=[];

	inputs = inputs.map(str => {
		return path.join(root, str);
	}).filter(existsSync);

	return {
		name: 'copy',
		async buildStart(options) {
			srcdir = srcdir || path.dirname(options.input[0]);

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
