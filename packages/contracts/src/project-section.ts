import { z } from 'zod';
import { sectionKinds } from './constants.ts';

export const sectionKindSchema = z.enum(sectionKinds);

export const projectSectionSchema = z
  .object({
    kind: sectionKindSchema,
    bodyMd: z.string().min(1),
  })
  .strict();

export type SectionKind = z.infer<typeof sectionKindSchema>;
export type ProjectSection = z.infer<typeof projectSectionSchema>;
