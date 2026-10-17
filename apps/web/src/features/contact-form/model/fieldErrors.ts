import type { z } from 'zod';
import { contact } from '../../../shared/content/index.ts';

/** Zod issues → one French message per field, taken from the site content. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const messages: Record<string, string> = contact.form.errors;
  const entries = error.issues.map((issue) => {
    const field = String(issue.path[0] ?? '');
    return [field, messages[field] ?? contact.form.invalid] as const;
  });
  return Object.fromEntries(entries);
}
