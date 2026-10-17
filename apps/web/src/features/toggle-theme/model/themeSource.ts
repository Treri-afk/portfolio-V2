export type Theme = 'light' | 'dark';

export const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Dispatched on window when the toggle changes the theme. */
export const THEME_EVENT = 'themechange';

export const systemTheme = (): Theme => (matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

/** Theme forced on <html> (by the inline init script or the toggle), if any. */
export function readStoredTheme(): Theme | null {
  const forced = document.documentElement.dataset.theme;
  return forced === 'light' || forced === 'dark' ? forced : null;
}
