import { describe, expect, it } from 'vitest';
import { formatDate } from './index.ts';

describe('formatDate', () => {
  it('formats an ISO date in French, independent of the local timezone', () => {
    expect(formatDate('2026-10-17')).toBe('17 octobre 2026');
  });
});
