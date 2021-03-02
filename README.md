# SIMLIN test

A simple test for running the SIMLIN-generated WASM (Web-Assembly) output in a browser using Parcel as a bundler.

## Installation

```bash
pnpm i  # npm i -g pnpm
```

## Developing

```bash
npm start
```

The simlin engine is only used in the `src/components/home-page.ts`. This current version does not run yet, as it generates an error: `Uncaught (in promise) TypeError: WebAssembly.instantiate(): Imports argument must be present and must be an object`

## Creating the WASM

Can be found in the `./src/assets/test.pb`.

```bash
node serialize.mjs "test/model.xmile" test.simlin
node sim.mjs test.simlin
```

## Comments from Bobby Powers

For the simlin bit, there are TypeScript definition files shipped with the package -- you can see them at `node_modules/@system-dynamics/engine/lib.browser/core/engine.d.ts`
(for the engine, for example).  I believe with many editors (I use IntelliJ, and I believe also Visual Studio), they should automatically pick up these definition files to help with e.g. autocomplete after you import the package.  I used "vanilla" javascript in the example, but I think those lines should work almost line-for-line as valid typescript.  As an example:
importing the package in typescript:
https://github.com/bpowers/simlin/blob/main/src/diagram/Editor.tsx#L35
instantiating the engine in typescript:
https://github.com/bpowers/simlin/blob/main/src/diagram/Editor.tsx#L1617
(does the webassembly stuff behind the hood, you shouldn't have to worry about that) simulating + getting full results in typescript:
https://github.com/bpowers/simlin/blob/main/src/diagram/Editor.tsx#L293-L302

I've also been developing the Simlin stuff as a single page app using Webpack -- it is pretty easy to transparently use the library even with webassembly. In my configs:
webpack 4 webassembly support:
https://github.com/bpowers/simlin/blob/main/src/app/config/webpack.config.js#L277-L280
webpack 5 webassembly support:
https://github.com/bpowers/simlin/blob/main/src/jupyter/webpack.config.js#L2-L4
