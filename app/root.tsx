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
import tailwindStylesheet from "~/tailwind.css";

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
      <header className="flex gap-4 justify-between max-w-screen-xl mx-auto p-5 border-b-4 border-dotted border-green">
        <div>
          Logo
        </div>
        <nav>
          Nav
        </nav>
      </header>
        <Outlet />
        <footer className="bg-darkBlue text-white">
          <div className="max-w-screen-xl mx-auto py-12 px-5">
            <div className="grid grid-cols-3 gap-12">
              <div>Address</div>
              <nav className="col-span-2">Nav</nav>
              <div className="col-span-2">Logo</div>
              <ul className="flex gap-4 justify-end">
                {socialMedialLinks?.map((link, index) => {
                  return (
                    <li key={index}>
                      <a className="text-white" href={link.url}>{link.platform}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
