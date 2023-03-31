# MERN

## Building -> Bundling Minifiying beryln

### added berylngit2
## Building -> Bundling Minifiying firdaus -harold xfdxczxsasdasdsdsdasdasd
npm run build -> dist (vite), build (CRA)

- dist folder has compressed stuff which include:
  - CSS and images due to rollup
- dist folder is also gitignored (auto)
- dist folder only changes after `npm run build`

## Changes from Notes

Use `vite` rather than `CRA`

Change from `build` to `dist` folder
Remove `favicon`
use `node --watch server.js` to run Express
change `package.json` to `"type": "commonjs"`

In the future all Express routes should start with `/api`

## Dev

You need 2 running servers:

- Express -> `node --watch server.js`
- React -> `npm run dev`

## Proxy

Vite proxy info at <https://vitejs.dev/config/server-options.html#server-proxy>

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

jeremy
