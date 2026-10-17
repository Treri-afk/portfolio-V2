import type { ReactNode } from 'react';
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router';
import { themeInit } from '../theme/themeInit.ts';

/** HTML document shared by every page and by the error boundary. */
export function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>{themeInit}</script>
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
