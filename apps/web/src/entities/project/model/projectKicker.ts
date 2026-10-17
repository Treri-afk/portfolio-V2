import type { ProjectOrigin } from '@portfolio/contracts';
import { projectLabels } from '../../../shared/content/index.ts';

/** "2026 · Projet personnel": the kicker above every project title. */
export function projectKicker({ year, origin }: { year: number; origin: ProjectOrigin }): string {
  return `${String(year)} · ${projectLabels.origins[origin]}`;
}
