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
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/favicons/apple-icon-57x57.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/favicons/apple-icon-60x60.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/favicons/apple-icon-72x72.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/favicons/apple-icon-76x76.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/favicons/apple-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/favicons/apple-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/favicons/apple-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/favicons/apple-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicons/android-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicons/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/favicons/manifest.json",
  },
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
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
