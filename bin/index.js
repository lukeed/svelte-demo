// @ts-check
import { existsSync } from 'fs';
import { promises as fs } from 'fs';
import { relative, resolve } from 'path';

import * as rollup from 'rollup';
import Config from './config/rollup.js';

const rm = fs.rm || fs.rmdir;
const { PORT=5000 } = process.env;
const isProd = !process.argv.includes('--dev');

(async function () {
	let config = Config(isProd);
	// @ts-ignore – config|config[]
	let outdir = config.output.dir;

	let root = resolve('.');
	let dest = resolve(root, outdir);

	if (existsSync(dest)) {
		console.log('~> removing "%s" directory', outdir);
		await rm(dest, { recursive: true });
	}

	if (isProd) {
		let { output, ...rest } = config;
		let outputs = [].concat(output);

		let start = Date.now();
		let bun = await rollup.rollup(rest);
		await Promise.all(outputs.map(bun.write));
		let delta = (Date.now() - start).toFixed(3);
		return console.log('~> done in %ds', +delta/1e3);
	}

	let server, srv = await import('servor');
	let watcher = rollup.watch(config);

	watcher.on('change', file => {
		file = relative(root, file);
		console.log('~> touch ::', file);
	});

	watcher.on('event', evt => {
		if (evt.code === 'BUNDLE_END') {
			let ms = (evt.duration).toLocaleString();
			if (server) return console.log('~> built in %dms', ms);

			console.log('~> ready in %dms', ms);

			// @ts-ignore - wrong types
			server = srv.default({
				reload: true,
				root: outdir,
				port: PORT,
			});

			return console.log('~> visit http://localhost:%d', PORT);
		}

		if (evt.code === 'ERROR') {
			console.error('ERROR', evt.error);
		}
	});
})().catch(err => {
	console.error('ERROR', err.stack || err.message);
	if (isProd) process.exit(1);
});
