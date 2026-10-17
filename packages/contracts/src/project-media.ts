import { z } from 'zod';
import { focalPoint } from './constants.ts';
import { imageSourceSchema, mediaPath } from './image-source.ts';

const percentSchema = z.number().int().min(focalPoint.min).max(focalPoint.max);

export const projectMediaSchema = imageSourceSchema
  .extend({
    kind: z.literal('image'),
    isCover: z.boolean().default(false),
    /** Short silent MP4 played once (WCAG 2.2.2); `src` is its last frame (Open Graph, still). */
    animation: mediaPath('mp4').optional(),
    focalX: percentSchema.default(focalPoint.center),
    focalY: percentSchema.default(focalPoint.center),
  })
  .strict();

export type ProjectMedia = z.infer<typeof projectMediaSchema>;
