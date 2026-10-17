import { z } from 'zod';
import { contactLimits } from './constants.ts';

export const contactInputSchema = z
  .object({
    name: z.string().trim().min(1).max(contactLimits.name.max),
    email: z.email().max(contactLimits.email.max),
    message: z.string().trim().min(contactLimits.message.min).max(contactLimits.message.max),
    website: z.string().max(0),
  })
  .strict();

export type ContactInput = z.infer<typeof contactInputSchema>;
