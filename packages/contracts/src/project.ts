import { z } from 'zod';
import { httpsUrlSchema } from './https-url.ts';
import { lifecycleStepSchema } from './lifecycle-step.ts';
import { projectDecisionSchema } from './project-decision.ts';
import { projectDocumentSchema } from './project-document.ts';
import { projectMediaSchema } from './project-media.ts';
import { projectMetricSchema } from './project-metric.ts';
import { projectSectionSchema } from './project-section.ts';

export const projectStatusSchema = z.enum(['draft', 'published']);
export const projectOriginSchema = z.enum(['personal', 'client', 'employer']);

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    tagline: z.string().min(1).max(140),
    summary: z.string().min(1),
    role: z.string().min(1),
    year: z.number().int().min(2015).max(2100),
    duration: z.string().min(1).optional(),
    status: projectStatusSchema,
    featured: z.boolean(),
    sortOrder: z.number().int(),
    origin: projectOriginSchema,
    liveUrl: httpsUrlSchema.optional(),
    repoUrl: httpsUrlSchema.optional(),
    technologies: z.array(z.string()).min(1),
    keyDecision: projectDecisionSchema.optional(),
    lifecycle: z.array(lifecycleStepSchema).default([]),
    documents: z.array(projectDocumentSchema).default([]),
    metrics: z.array(projectMetricSchema).default([]),
    media: z.array(projectMediaSchema).default([]),
    sections: z.array(projectSectionSchema).min(1),
  })
  .strict();

export type ProjectOrigin = z.infer<typeof projectOriginSchema>;
export type Project = z.infer<typeof projectSchema>;
