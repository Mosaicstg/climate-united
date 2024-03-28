import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import envOnly from "vite-env-only"
import { netlifyPlugin } from "@netlify/remix-adapter/plugin"
import { remixDevTools } from "remix-development-tools"

installGlobals()

export default defineConfig({
  server: {
    warmup: {
      // Force Vite to build these files on server start
      clientFiles: ["./app/entry.client.tsx", "./app/root.tsx"],
    },
  },
  optimizeDeps: {
    // Force Vite to include these files in the client bundle
    include: ["./app/entry.client.tsx", "./app/root.tsx"],
  },
  plugins: [
    envOnly(),
    remixDevTools(),
    remix(),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
})
