import { contactInputSchema } from '@portfolio/contracts';
import { env } from '../../../shared/config/index.ts';
import { fieldErrors } from '../model/fieldErrors.ts';
import type { ContactResult } from '../model/types.ts';

const ACCEPTED = 202;

/** Validates with the shared contract, then posts to the API. Never throws: the UI always gets a result. */
export async function submitContact(formData: FormData): Promise<ContactResult> {
  const parsed = contactInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: 'invalid', errors: fieldErrors(parsed.error) };
  if (env.apiUrl === undefined) return { status: 'unavailable' };
  try {
    const response = await fetch(new URL('/v1/contact', env.apiUrl), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    return response.status === ACCEPTED ? { status: 'success' } : { status: 'unavailable' };
  } catch {
    return { status: 'unavailable' };
  }
}
