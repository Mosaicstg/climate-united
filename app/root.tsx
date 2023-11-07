import { type LinksFunction, type MetaFunction, json } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getSocialMediaLinks } from "~/models/social-media-links.server";

import { withDevTools } from "remix-development-tools";
import rdtStylesheet from "remix-development-tools/index.css";
import tailwindStylesheet from "/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheet },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@600&display=swap",
  },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ...(process.env.NODE_ENV === "development"
    ? [{ rel: "stylesheet", href: rdtStylesheet }]
    : []),
];

export const loader = async () => {
  const socialMedialLinks = await getSocialMediaLinks();

  return json({ socialMedialLinks });
};

export const meta: MetaFunction = () => [
  {
    title: "Climate United",
  },
];

let AppExport = App;

if (process.env.NODE_ENV === "development") {
  AppExport = withDevTools(App);
}

export default AppExport;

function App() {
  const { socialMedialLinks } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <footer>
          <ul className="flex">
            {socialMedialLinks?.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.url}>{link.platform}</a>
                </li>
              );
            })}
          </ul>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
