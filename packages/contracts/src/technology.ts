import { z } from 'zod';
import { technologyCategories } from './constants.ts';

export const technologyCategorySchema = z.enum(technologyCategories);

export const technologySchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    category: technologyCategorySchema,
  })
  .strict();

export type TechnologyCategory = z.infer<typeof technologyCategorySchema>;
export type Technology = z.infer<typeof technologySchema>;
