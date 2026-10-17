/**
 * Runs before first paint to apply the theme chosen with the toggle (stored by features/toggle-theme).
 * Written without quotes, < or & so React can render it as plain script text: no escaping, no
 * dangerouslySetInnerHTML, and a single fixed string for the CSP hash.
 */
export const themeInit = 'try{var t=localStorage.theme;if(t)document.documentElement.dataset.theme=t}catch(e){}';
