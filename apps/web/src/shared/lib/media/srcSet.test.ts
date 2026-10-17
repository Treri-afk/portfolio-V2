import { describe, expect, it } from 'vitest';
import { srcSet, variantWidths } from './index.ts';

describe('variantWidths', () => {
  it('never upscales: widths above the original collapse onto it', () => {
    expect(variantWidths(1080)).toEqual([480, 960, 1080]);
    expect(variantWidths(400)).toEqual([400]);
  });
});

describe('srcSet', () => {
  it('lists one variant per width, in the requested format', () => {
    expect(srcSet('/media/demo/shot.jpg', 1080, 'avif')).toBe('/media/demo/shot-480.avif 480w, /media/demo/shot-960.avif 960w, /media/demo/shot-1080.avif 1080w');
  });
});
