import { z } from 'zod';

const filled = z.object({ website: z.string().min(1) });

/** True when the hidden `website` field was filled: only bots do that. */
export const isBot = (body: unknown): boolean => filled.safeParse(body).success;
