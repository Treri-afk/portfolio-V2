import { useSearchParams } from 'react-router';

const PARAM = 'tech';

/** Filter state lives in the URL (?tech=react,postgresql): shareable, bookmarkable, back-button friendly. */
export function useTechFilter() {
  const [params, setParams] = useSearchParams();
  const selected = (params.get(PARAM) ?? '').split(',').filter(Boolean);
  const setSelected = (next: readonly string[]) => {
    setParams(next.length > 0 ? { [PARAM]: next.join(',') } : {}, { replace: true, preventScrollReset: true });
  };
  return { selected, setSelected };
}
