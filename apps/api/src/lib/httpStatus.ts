import { contactAccepted } from '@portfolio/contracts/constants';

/** Status codes the API answers with; success comes from the shared contract. */
export const httpStatus = {
  accepted: contactAccepted,
  badRequest: 400,
  forbidden: 403,
  unsupportedMediaType: 415,
  tooManyRequests: 429,
  unavailable: 503,
} as const;
