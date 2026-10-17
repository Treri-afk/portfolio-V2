const DEV_API_URL = 'http://localhost:3000';

/**
 * Public configuration. Values are validated with Zod when the build starts (apps/web/env.schema.ts),
 * so no validation library ships to the browser. The localhost fallback exists only on the dev server
 * (import.meta.hot), the same condition env.schema.ts uses (command === 'serve'): never in a build.
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? (import.meta.hot ? DEV_API_URL : undefined),
  siteUrl: import.meta.env.VITE_SITE_URL,
} as const;
