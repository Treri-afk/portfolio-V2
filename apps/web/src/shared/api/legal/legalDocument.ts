import { z } from 'zod';

export const legalDocumentSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    description: z.string().min(1),
    updated: z.iso.date(),
    bodyMd: z.string().min(1),
  })
  .strict();

export type LegalDocument = z.infer<typeof legalDocumentSchema>;
