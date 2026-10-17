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

interface Task {
  source: string;
  output: string;
  width: number;
  format: keyof typeof FORMATS;
}

const isStale = async ({ source, output }: Task): Promise<boolean> => {
  const [from, to] = await Promise.all([stat(source), stat(output).catch(() => null)]);
  return to === null || to.mtimeMs < from.mtimeMs;
};

const tasksFor = async (source: string): Promise<Task[]> => {
  const { width } = await sharp(source).metadata();
  return variantWidths(width).flatMap((target) =>
    (['avif', 'webp'] as const).map((format) => ({ source, width: target, format, output: source.replace(/\.(jpg|png)$/, `-${String(target)}.${format}`) })),
  );
};

const originals = (await readdir(ROOT, { recursive: true }))
  .filter((file) => !VARIANT.test(file) && ORIGINAL.test(file.split('/').pop() ?? ''))
  .map((file) => join(ROOT, file));
const tasks = (await Promise.all(originals.map(tasksFor))).flat();

let built = 0;
for (const task of tasks) {
  if (!(await isStale(task))) continue;
  await sharp(task.source).resize({ width: task.width }).toFormat(task.format, FORMATS[task.format]).toFile(task.output);
  built += 1;
}
console.log(`media: ${String(originals.length)} originals, ${String(built)} variants built`);
