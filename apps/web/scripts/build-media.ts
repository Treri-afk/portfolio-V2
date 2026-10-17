// Generates AVIF and WebP variants of every original image in public/media, at the token widths.
// Incremental: a variant is rebuilt only when missing or older than its original. Outputs are git-ignored.
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { variantWidths } from '../src/shared/lib/media/index.ts';

const ROOT = fileURLToPath(new URL('../public/media/', import.meta.url));
const ORIGINAL = /^[a-z0-9-]+\.(jpg|png)$/;
const VARIANT = /-\d+\.(avif|webp)$/;
const FORMATS = { avif: { quality: 55, effort: 4 }, webp: { quality: 74 } } as const;

const isStale = async (source: string, target: string): Promise<boolean> => {
  const [from, to] = await Promise.all([stat(source), stat(target).catch(() => null)]);
  return to === null || to.mtimeMs < from.mtimeMs;
};

const originals = (await readdir(ROOT, { recursive: true }))
  .filter((file) => !VARIANT.test(file) && ORIGINAL.test(file.split('/').pop() ?? ''));

let built = 0;
for (const file of originals) {
  const source = join(ROOT, file);
  const { width = 0 } = await sharp(source).metadata();
  for (const target of variantWidths(width)) {
    for (const format of ['avif', 'webp'] as const) {
      const output = source.replace(/\.(jpg|png)$/, `-${String(target)}.${format}`);
      if (!(await isStale(source, output))) continue;
      await sharp(source).resize({ width: target }).toFormat(format, FORMATS[format]).toFile(output);
      built += 1;
    }
  }
}
console.log(`media: ${String(originals.length)} originals, ${String(built)} variants built`);
