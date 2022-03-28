import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';

import { RemixUniformContext } from '@uniformdev/context-remix';

import styles from './styles/app.css';

export const meta: MetaFunction = () => {
  return {
    title: 'Cinematic',
    description: 'A film library for cinematic enthusiasts.',
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export default function App({ scoring }: { scoring: any }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RemixUniformContext>
          <Outlet />
        </RemixUniformContext>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
