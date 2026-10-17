import { z } from 'zod';

/** Any URL coming from content or the database must be https (blocks javascript:, data:, http:). */
export const httpsUrlSchema = z.url({ protocol: /^https$/ });
