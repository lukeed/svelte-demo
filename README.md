# Svelte Demo

> Multi-page Svelte 3.x application, built with Rollup and code-splitting enabled.

***Includes:***

* Rollup
* Svelte 3.x
* Live-reload dev server
* [Navaid](https://github.com/lukeed/navaid) for client-side routing
* Familiar module-context `preload()` helper

> **Note:** You may also be interested in the official [sveltejs/template](https://github.com/sveltejs/template)~!


## Setup

```sh
$ npm install
# or
$ pnpm install
# or
$ yarn install
```


## Development

Spawns a `localhost` devserver, which automatically reloads whenever contents within the `public` directory change.

> **Note:** Listens on `localhost:8080` by default; use `PORT` to modify the port.

```sh
$ npm run dev
# or
$ pnpm dev
# or
$ yarn dev

# Modify the port
$ PORT=5000 yarn dev
```


## Build

Builds the project for production.

All output assets are available in the `public` directory.


## License

MIT &copy; [Luke Edwards](https://lukeed.com)
