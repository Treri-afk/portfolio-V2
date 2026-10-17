import { z } from 'zod';
import { imageSourceSchema } from './image-source.ts';

const percentSchema = z.number().int().min(0).max(100);

export const projectMediaSchema = imageSourceSchema
  .extend({
    kind: z.literal('image'),
    isCover: z.boolean().default(false),
    focalX: percentSchema.default(50),
    focalY: percentSchema.default(50),
  })
  .strict();

export type ProjectMedia = z.infer<typeof projectMediaSchema>;
