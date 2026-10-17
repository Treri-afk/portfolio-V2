import { z } from 'zod';
import { projectPhases } from './constants.ts';

export const projectPhaseSchema = z.enum(projectPhases);

/** One stage of a project, from market research to operations, with what was delivered. */
export const lifecycleStepSchema = z
  .object({
    phase: projectPhaseSchema,
    summary: z.string().min(1),
  })
  .strict();

export type ProjectPhase = z.infer<typeof projectPhaseSchema>;
export type LifecycleStep = z.infer<typeof lifecycleStepSchema>;
