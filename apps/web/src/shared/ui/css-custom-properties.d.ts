import 'react';

/** Only CSS custom properties may be set inline (values computed from data, never design values). */
type CustomProperties = Record<`--${string}`, string | number | undefined>;

declare module 'react' {
  interface CSSProperties extends CustomProperties {}
}
