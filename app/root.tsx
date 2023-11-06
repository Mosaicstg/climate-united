import type { MetaFunction } from '@remix-run/node';
import type { LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import { withDevTools } from 'remix-development-tools';
import rdtStylesheet from 'remix-development-tools/index.css';
import tailwindStylesheet from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStylesheet },
  ...(process.env.NODE_ENV === 'development' ? [{ rel: 'stylesheet', href: rdtStylesheet }] : []),
];

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'Climate United',
    viewport: 'width=device-width,initial-scale=1',
  },
];

let AppExport = App;

if (process.env.NODE_ENV === 'development') {
  AppExport = withDevTools(App);
}

export default AppExport;

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
