import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { createUniformContext } from './services/uniformContext';
import { parse } from 'cookie';
import { RemixUniformContextProvider } from '@uniformdev/context-remix';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const serverContext = createUniformContext(request);

  const markup = renderToString(
    <RemixUniformContextProvider value={serverContext}>
      <RemixServer context={remixContext} url={request.url} />
    </RemixUniformContextProvider>
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
