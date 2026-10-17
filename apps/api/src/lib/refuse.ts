import type { ContactError } from '@portfolio/contracts/constants';
import type { Context } from 'hono';
import { httpStatus } from './httpStatus.ts';

const STATUS = {
  invalid: httpStatus.badRequest,
  forbidden: httpStatus.forbidden,
  unsupported_media_type: httpStatus.unsupportedMediaType,
  rate_limited: httpStatus.tooManyRequests,
  unavailable: httpStatus.unavailable,
} as const satisfies Record<ContactError, number>;

/** Error response of the shared contract: `{ error: <code> }` with its status. */
export const refuse = (c: Context, error: ContactError) => c.json({ error }, STATUS[error]);
