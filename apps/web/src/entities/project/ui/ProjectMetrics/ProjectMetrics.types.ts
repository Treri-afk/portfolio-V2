import type { ProjectMetric } from '@portfolio/contracts';

export interface ProjectMetricsProps {
  metrics: readonly ProjectMetric[];
  size?: 'md' | 'lg' | undefined;
  withSource?: boolean | undefined;
}
