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

import { UniformTracker } from '@uniformdev/optimize-tracker-react';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import intentManifest from './lib/intentManifest.json';

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

const localTracker = createDefaultTracker({
  intentManifest,
});

export default function App({ scoring }: { scoring: any }) {
  return (
    <UniformTracker
      trackerInstance={localTracker}
      initialIntentScores={scoring}
    >
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === 'development' && <LiveReload />}
        </body>
      </html>
    </UniformTracker>
  );
}
