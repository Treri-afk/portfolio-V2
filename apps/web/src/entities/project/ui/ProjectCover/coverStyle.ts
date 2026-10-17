import type { CSSProperties } from 'react';

export const coverStyle = (transitionName?: string): CSSProperties => ({
  '--cover-transition-name': transitionName ?? 'none',
});
