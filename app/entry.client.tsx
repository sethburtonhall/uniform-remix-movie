import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import { parse } from 'cookie';

import { RemixUniformContextProvider } from '@uniformdev/context-remix';

import { createUniformContext } from './services/uniformContext';

const clientContext = createUniformContext();

clientContext.update({
  url: new URL(window.location.href),
  cookies: parse(document.cookie ?? ''),
});

hydrate(
  <RemixUniformContextProvider value={clientContext}>
    <RemixBrowser />
  </RemixUniformContextProvider>,
  document
);
