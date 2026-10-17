const formatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' });

/** "2026-10-17" → "17 octobre 2026", identical at build time and in every visitor's timezone. */
export function formatDate(isoDate: string): string {
  return formatter.format(new Date(isoDate));
}
