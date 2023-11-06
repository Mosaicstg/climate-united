import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import tailwindStylesheet from '~/tailwind.css';

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'Climate United',
    viewport: 'width=device-width,initial-scale=1',
  },
  { rel: 'stylesheet', href: tailwindStylesheet },
];

export default function App() {
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
