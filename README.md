# habbo-pixi

A one-to-one TypeScript conversion of the Habbo AIR client (the deobfuscated AS3 in
`win63-pre-rename`). All the client logic is kept as it is. Only the runtime underneath changes:
Flash display/rendering is replaced with PIXI v8.

## Layout

A monorepo (npm workspaces, tasks run by [moon](https://moonrepo.dev)):

- `packages/runtime` (`@habbo-pixi/runtime`): the platform the client runs on, written by hand.
  The display list and filters on PIXI, text laid out and rasterised as AIR did (`text/air`),
  events, `ByteArray`, `Socket` (→ WebSocket), files and shared objects on web APIs, and the AS3
  language helpers the converted code uses. Modules are imported as
  `@habbo-pixi/runtime/<folder>/<Module>`.
- `packages/client` (`@habbo-pixi/client`): the Habbo client and the Vite app that runs it.
  `src/` is generated from the AS3 client (mirroring the AS3 package tree, plus `_assets/` and a
  `*.group.ts` index per import loop), except `src/main.ts`; `app-files/` holds the application's own files (`.hab`
  libraries), `tools/` the headless smoke tests.
- `packages/client-next` and `packages/client-WIN63-*`: the same client for later Habbo releases (16 Sep, 9 Sep,
  13 Oct and 15 Oct 2026), each with its own Vite app. `?server=dev` connects to your own server.
- `packages/editor` and `packages/ui-editor`: the asset editor and the UI layout editor. Their edits to the
  client's asset pack are kept in `packages/asset-overlay`.
- `packages/room-copier` (`@habbo-pixi/room-copier`): copies the room the client is in on Habbo for the Habbo
  server's room import (`:copy`, `:copy wired`), as the G-Earth copier does but from inside the client. It reads the
  room as the client's own parsers read it, through the game connection's packet taps
  (`@habbo-pixi/runtime/net/packetTaps`), and the relay saves the
  copies. A client loads it with `?copier=<relay port>`.

## Tasks

- `npm install`: install and link the workspaces
- `npm run typecheck` (`moon run :typecheck`): type-check every package
- `npm run dev` (`moon run client:dev`): Vite dev server
- `npm run build` (`moon run client:build`): type-check and bundle the client
- `npm run preview` (`moon run client:preview`): serve the last build on the network (port 4173)
- `npm run serve` (`moon run client:serve`): build, then serve it
- `npm run debug` (`moon run client:debug`): build with source maps and serve it; then start the
  WebStorm run configuration "Debug client" (Chrome) to set breakpoints in the TypeScript
