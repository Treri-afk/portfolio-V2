import type { CSSProperties } from 'react';

const CENTER = 50;

/** Data-driven custom properties for a media frame: focal point and shared-element transition name. */
export function mediaStyle(focalX = CENTER, focalY = CENTER, transitionName?: string): CSSProperties {
  return {
    '--media-focal-x': focalX,
    '--media-focal-y': focalY,
    '--media-transition-name': transitionName ?? 'none',
  };
}
