import {
  type DataFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  type HeadersFunction,
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
  useLoaderData,
} from "@remix-run/react"
import { getSocialMediaLinks } from "~/models/social-media-links.server"
import { withDevTools } from "remix-development-tools"
import rdtStylesheet from "remix-development-tools/index.css"
import tailwindStylesheet from "~/tailwind.css"
import { getDomainUrl } from "./utils/get-route-url.server"
import Footer from "~/ui/components/Footer"
import { GeneralErrorBoundary } from "./routes/$"
import { Show404 } from "./ui/templates/404"
import { Show500 } from "./ui/templates/500"
import { honeypot } from "./utils/honeypot.server"
import { HoneypotProvider } from "remix-utils/honeypot/react"
import { NewsletterSignUp } from "./ui/components/NewsletterSignUp"

export const links: LinksFunction = () => [
  // preload tailwind so the first paint is the right font
  { rel: "preload", href: tailwindStylesheet, as: "style" },
  { rel: "preload", href: "https://use.typekit.net/wlp1ond.css", as: "style" },
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

  return json(
    {
      socialMedialLinks,
      domainURL: getDomainUrl(request),
      honeypotInputProps: honeypot.getInputProps(),
    },
    {},
  )
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control":
      "public, max-age=600, must-revalidate, s-maxage=600, stale-while-revalidate=3600",
    ...loaderHeaders,
  }
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
  const { honeypotInputProps } = useLoaderData<RootLoader>()

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

        {/*Google tag (gtag.js)*/}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JR8YJYTRJK"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JR8YJYTRJK');`,
          }}
        ></script>
      </head>
      <body>
        <HoneypotProvider {...honeypotInputProps}>
          <Outlet />
          <Footer />
        </HoneypotProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/*<script*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: `window.onUsersnapLoad = function(api) {*/}
        {/*  api.init();*/}
        {/*}*/}
        {/*  var script = document.createElement('script');*/}
        {/*  script.defer = 1;*/}
        {/*  script.src = 'https://widget.usersnap.com/global/load/f13d0b58-e511-42a7-bc56-1fa9bb5c91b2?onload=onUsersnapLoad';*/}
        {/*  document.getElementsByTagName('head')[0].appendChild(script);`,*/}
        {/*  }}*/}
        {/*></script>*/}
      </body>
    </html>
  )
}

export function ErrorBoundary() {
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

        {/*Google tag (gtag.js)*/}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JR8YJYTRJK"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JR8YJYTRJK');`,
          }}
        ></script>
      </head>
      <body>
        <GeneralErrorBoundary
          statusHandlers={{
            404: () => <Show404 />,
            500: () => <Show500 />,
          }}
        />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/*<script*/}
        {/*  dangerouslySetInnerHTML={{*/}
        {/*    __html: `window.onUsersnapLoad = function(api) {*/}
        {/*  api.init();*/}
        {/*}*/}
        {/*  var script = document.createElement('script');*/}
        {/*  script.defer = 1;*/}
        {/*  script.src = 'https://widget.usersnap.com/global/load/f13d0b58-e511-42a7-bc56-1fa9bb5c91b2?onload=onUsersnapLoad';*/}
        {/*  document.getElementsByTagName('head')[0].appendChild(script);`,*/}
        {/*  }}*/}
        {/*></script>*/}
      </body>
    </html>
  )
}
