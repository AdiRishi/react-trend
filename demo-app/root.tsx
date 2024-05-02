import tailwindStyles from '@demo/global-styles/tailwind.css?url';
import { LinksFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { Layout as RootLayout } from './layouts/root-layout';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: tailwindStyles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
