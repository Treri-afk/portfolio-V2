import { z } from 'zod';

/** A self-hosted image under /media/<project>/, with its intrinsic size and a mandatory alt text. */
export const imageSourceSchema = z.object({
  src: z.string().regex(/^\/media\/[a-z0-9-]+\/[a-z0-9-]+\.(jpg|png|webp|avif)$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});
