import { z } from 'zod';
import { decisionLimits } from './constants.ts';
import { httpsUrlSchema } from './https-url.ts';

/** The hard part of a project and the key technical answer, optionally linked to the exact file. */
export const projectDecisionSchema = z
  .object({
    challenge: z.string().min(1).max(decisionLimits.challenge),
    decision: z.string().min(1).max(decisionLimits.decision),
    codeUrl: httpsUrlSchema.optional(),
    codeLabel: z.string().min(1).optional(),
  })
  .strict();

export type ProjectDecision = z.infer<typeof projectDecisionSchema>;
