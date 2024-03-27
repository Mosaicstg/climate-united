import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import envOnly from "vite-env-only"
import { netlifyPlugin } from "@netlify/remix-adapter/plugin"

installGlobals()

export default defineConfig({
  plugins: [envOnly(), remix(), netlifyPlugin(), tsconfigPaths()],
})
