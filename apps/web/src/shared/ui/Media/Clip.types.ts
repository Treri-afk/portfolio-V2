export interface ClipProps {
  src: string;
  /** Still last frame: shown before playback, without JavaScript and with reduced motion. */
  poster: string;
  alt: string;
  width: number;
  height: number;
  priority: boolean;
}
