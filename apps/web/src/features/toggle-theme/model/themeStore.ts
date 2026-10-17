import { THEME_EVENT, readStoredTheme, systemTheme, type Theme } from './themeSource.ts';

export type { Theme } from './themeSource.ts';

export const getTheme = (): Theme => readStoredTheme() ?? systemTheme();

export const getServerTheme = (): Theme => 'light';

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage unavailable: the choice lasts for this page only.
  }
  dispatchEvent(new Event(THEME_EVENT));
}

export { subscribe } from './themeSubscription.ts';
