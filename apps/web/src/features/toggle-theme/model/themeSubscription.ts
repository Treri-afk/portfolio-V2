import { THEME_EVENT } from './themeSource.ts';

/** Notifies on toggles made on this page (useSyncExternalStore). */
export function subscribe(onChange: () => void): () => void {
  addEventListener(THEME_EVENT, onChange);
  return () => {
    removeEventListener(THEME_EVENT, onChange);
  };
}
