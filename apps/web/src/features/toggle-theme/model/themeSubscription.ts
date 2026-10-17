import { DARK_QUERY, THEME_EVENT } from './themeSource.ts';

/** Notifies on system theme changes and on toggles made on this page (useSyncExternalStore). */
export function subscribe(onChange: () => void): () => void {
  const media = matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  addEventListener(THEME_EVENT, onChange);
  return () => {
    media.removeEventListener('change', onChange);
    removeEventListener(THEME_EVENT, onChange);
  };
}
