import {
  type LinksFunction,
  type MetaFunction,
  type HeadersFunction,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react"
import { getSocialMediaLinks } from "~/models/social-media-links.server"
import tailwindStyles from "~/tailwind.css?url"
import { getDomainUrl } from "./utils/get-route-url.server"
import Footer from "~/ui/components/Footer"
import { GeneralErrorBoundary } from "./routes/$"
import { Show404 } from "./ui/templates/404"
import { Show500 } from "./ui/templates/500"
import { honeypot } from "./utils/honeypot.server"
import { HoneypotProvider } from "remix-utils/honeypot/react"
import { NewsletterSignUp } from "./ui/components/NewsletterSignUp"
import { getNavMenus } from "~/models/nav-menu.server"
import { getFooterContent } from "~/models/footer.server"
import { getNewsletterContent } from "~/models/newsletter.server"
import { type ReactNode } from "react"

export const links: LinksFunction = () => [
  // preload tailwind so the first paint is the right font
  { rel: "preload", href: "https://use.typekit.net/wlp1ond.css", as: "style" },
  { rel: "preload", href: tailwindStyles, as: "style" },
  { rel: "stylesheet", href: tailwindStyles },
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/assets/favicons/apple-icon-57x57.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/assets/favicons/apple-icon-60x60.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/assets/favicons/apple-icon-72x72.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/assets/favicons/apple-icon-76x76.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/assets/favicons/apple-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/assets/favicons/apple-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/assets/favicons/apple-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/assets/favicons/apple-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/assets/favicons/apple-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/assets/favicons/android-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/assets/favicons/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/assets/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/assets/favicons/favicon-96x96.png",
  },
  {
    rel: "manifest",
    href: "/assets/favicons/manifest.json",
  },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const mainMenu = await getNavMenus("Main Menu")
  const footerMenu = await getNavMenus("Footer Menu")
  const socialMedialLinks = await getSocialMediaLinks()
  const footerContent = await getFooterContent()
  const newsletterContent = await getNewsletterContent()

  return json(
    {
      mainMenu,
      footerMenu,
      socialMedialLinks,
      footerContent,
      newsletterContent,
      domainURL: getDomainUrl(request),
      honeypotInputProps: honeypot.getInputProps(),
    },
    {},
  )
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    // TODO: find a better way to handle caching invalidation
    //
    // Tell the browser to always check the freshness of the cache
    // "Cache-Control": "public, max-age=600, must-revalidate",
    // "Netlify-CDN-Cache-Control":
    //   "public, s-maxage=1800, stale-while-revalidate=604800",
    ...loaderHeaders,
  }
}

export type RootLoader = typeof loader

export const meta: MetaFunction = () => [
  {
    title: "Climate United",
  },
]

export function Layout({ children }: { children: ReactNode }) {
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

        {/*Accessibe*/}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s = document.createElement('script'); var h = document.querySelector('head') || document.body; s.src = 'https://acsbapp.com/apps/app/dist/js/app.js'; s.async = true; s.onload = function(){acsbJS.init({statementLink : '', footerHtml : '', hideMobile : false, hideTrigger : false, disableBgProcess : false, language : 'en', position : 'right', leadColor : '#146FF8', triggerColor : '#146FF8', triggerRadius : '50%', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerIcon : 'people', triggerSize : 'bottom', triggerOffsetX : 20, triggerOffsetY : 20, mobile : {triggerSize : 'small', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerOffsetX : 10, triggerOffsetY : 10, triggerRadius : '20'}});}; h.appendChild(s);})();`,
          }}
        ></script>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { honeypotInputProps } = useLoaderData<RootLoader>()

  return (
    <HoneypotProvider {...honeypotInputProps}>
      <Outlet />
      <NewsletterSignUp />
      <Footer />
    </HoneypotProvider>
  )
}

export function ErrorBoundary() {
  return (
    <>
      <GeneralErrorBoundary
        statusHandlers={{
          404: () => <Show404 />,
          500: () => <Show500 />,
        }}
      />
      <Footer />
    </>
  )
}
