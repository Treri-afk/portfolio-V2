import { z } from 'zod';

const https = z.url({ protocol: /^https$/ });

/**
 * Public build-time variables, validated with Zod when Vite starts (vite.config.ts): an invalid value fails
 * the build. Production only accepts https. Without VITE_API_URL the contact form reports itself unavailable.
 */
export const envSchema = (isDev: boolean) =>
  z.object({
    VITE_API_URL: (isDev ? z.url() : https).optional(),
    VITE_SITE_URL: https.optional(),
  });
