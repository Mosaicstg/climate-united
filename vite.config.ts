import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import { installGlobals } from "@remix-run/node"
import tsconfigPaths from "vite-tsconfig-paths"
import { remixDevTools } from "remix-development-tools/vite"
// import { netlifyPlugin } from "@netlify/remix-adapter/plugin"
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin"
import envOnly from "vite-env-only"
import { visualizer } from "rollup-plugin-visualizer"

installGlobals()

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix(),
    tsconfigPaths(),
    netlifyPlugin(),
    envOnly(),
    visualizer({ emitFile: true }),
  ],
  server: {
    port: 4321,
  },
})
