import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import { installGlobals } from "@remix-run/node"
import tsconfigPaths from "vite-tsconfig-paths"
import { remixDevTools } from "remix-development-tools/vite"
import { netlifyPlugin } from "@netlify/remix-adapter/plugin"
import envOnly from "vite-env-only"

installGlobals()

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix(),
    tsconfigPaths(),
    netlifyPlugin(),
    envOnly(),
  ],
  server: {
    port: 4321,
  },
})