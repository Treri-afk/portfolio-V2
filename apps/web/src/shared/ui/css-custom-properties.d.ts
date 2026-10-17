import 'react';

declare module 'react' {
  /** Only CSS custom properties may be set inline (values computed from data, never design values). */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
