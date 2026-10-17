import { z } from 'zod';

type MediaExtension = 'jpg' | 'png' | 'webp' | 'avif' | 'mp4';

/** A file under /media/<project>/ with one of the given extensions. */
export const mediaPath = (...extensions: readonly MediaExtension[]) =>
  z.string().regex(new RegExp(`^/media/[a-z0-9-]+/[a-z0-9-]+\\.(${extensions.join('|')})$`));

/** A self-hosted image under /media/<project>/, with its intrinsic size and a mandatory alt text. */
export const imageSourceSchema = z.object({
  src: mediaPath('jpg', 'png', 'webp', 'avif'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});
