import { motionOk } from '@portfolio/tokens/media';

/** Share of the clip that must be on screen before it plays. */
const VISIBLE = 0.5;

/**
 * Ref callback: plays the clip once, when it scrolls into view. With reduced motion it never plays and its
 * poster (the last frame) stays. The preference is read on mount: enough for a clip under 5 s.
 */
export function playOnceVisible(video: HTMLVideoElement | null): (() => void) | undefined {
  if (!video || !matchMedia(motionOk).matches) return undefined;
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    video.play().catch(() => undefined);
  }, { threshold: VISIBLE });
  observer.observe(video);
  return () => { observer.disconnect(); };
}
