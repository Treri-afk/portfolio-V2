import { useSyncExternalStore } from 'react';
import { getServerTheme, getTheme, setTheme, subscribe } from './themeStore.ts';

/** Current theme (chosen, else light) and a toggle that persists the choice. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return { theme, toggle };
}
