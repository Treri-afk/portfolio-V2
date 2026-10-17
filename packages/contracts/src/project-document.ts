import { z } from 'zod';
import { imageSourceSchema } from './image-source.ts';
import { projectPhaseSchema } from './lifecycle-step.ts';

/** A deliverable beyond code (market study, brand guidelines…), shown as a capture. */
export const projectDocumentSchema = imageSourceSchema
  .extend({
    title: z.string().min(1),
    summary: z.string().min(1),
    phase: projectPhaseSchema,
  })
  .strict();

export type ProjectDocument = z.infer<typeof projectDocumentSchema>;
