import { describe, expect, it } from 'vitest';
import { sliceAttributes } from './sliceAttributes.ts';

describe('sliceAttributes', () => {
  it('defaults to the base tone and leaves flags out', () => {
    expect(sliceAttributes({ children: null })).toEqual({
      'data-tone': 'base',
      'data-angle-top': undefined,
      'data-angle-bottom': undefined,
      'data-compact-top': undefined,
      'data-elevated': undefined,
    });
  });

  it('renders true flags as empty attributes, false ones as absent', () => {
    const attributes = sliceAttributes({ children: null, tone: 'sunken', angleTop: 'rise-base', compactTop: true, elevated: false });
    expect(attributes).toMatchObject({ 'data-tone': 'sunken', 'data-angle-top': 'rise-base', 'data-compact-top': '' });
    expect(attributes['data-elevated']).toBeUndefined();
  });
});
