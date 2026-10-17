import { z } from 'zod';

export const projectMetricSchema = z
  .object({
    label: z.string().min(1),
    value: z.string().min(1),
    unit: z.string().min(1).optional(),
    source: z.string().min(1),
  })
  .strict();

export type ProjectMetric = z.infer<typeof projectMetricSchema>;
