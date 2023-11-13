import {
  type DataFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  json,
} from "@remix-run/node"
import { cssBundleHref } from "@remix-run/css-bundle"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { getSocialMediaLinks } from "~/models/social-media-links.server"
import { withDevTools } from "remix-development-tools"
import rdtStylesheet from "remix-development-tools/index.css"
import tailwindStylesheet from "~/tailwind.css"
import { getDomainUrl } from "./utils/get-route-url.server"
import Header from "~/ui/components/Header"
import Footer from "~/ui/components/Footer"

export const links: LinksFunction = () => [
  // preload tailwind so the first paint is the right font
  { rel: "preload", href: tailwindStylesheet, as: "style" },
  { rel: "stylesheet", href: tailwindStylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...(process.env.NODE_ENV === "development"
    ? [{ rel: "stylesheet", href: rdtStylesheet }]
    : []),
]

export const loader = async ({ request }: DataFunctionArgs) => {
  const socialMedialLinks = await getSocialMediaLinks()

  return json({ socialMedialLinks, domainURL: getDomainUrl(request) }, {})
}

export type RootLoader = typeof loader

export const meta: MetaFunction = () => [
  {
    title: "Climate United",
  },
]

let AppExport = App

if (process.env.NODE_ENV === "development") {
  AppExport = withDevTools(App)
}

export default AppExport

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
