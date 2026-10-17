export type Theme = 'light' | 'dark';

/** Light by default, whatever the system preference: dark only when chosen with the toggle. */
export const DEFAULT_THEME: Theme = 'light';

/** Dispatched on window when the toggle changes the theme. */
export const THEME_EVENT = 'themechange';

/** Theme forced on <html> (by the inline init script or the toggle), if any. */
export function readStoredTheme(): Theme | null {
  const forced = document.documentElement.dataset.theme;
  return forced === 'light' || forced === 'dark' ? forced : null;
}
