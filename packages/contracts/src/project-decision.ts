import { z } from 'zod';
import { httpsUrlSchema } from './https-url.ts';

/** The hard part of a project and the key technical answer, optionally linked to the exact file. */
export const projectDecisionSchema = z
  .object({
    challenge: z.string().min(1).max(140),
    decision: z.string().min(1).max(220),
    codeUrl: httpsUrlSchema.optional(),
    codeLabel: z.string().min(1).optional(),
  })
  .strict();

export type ProjectDecision = z.infer<typeof projectDecisionSchema>;
