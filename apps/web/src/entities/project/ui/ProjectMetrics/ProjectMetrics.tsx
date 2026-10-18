import { Metric } from '../../../../shared/ui/index.ts';
import styles from './ProjectMetrics.module.css';
import type { ProjectMetricsProps } from './ProjectMetrics.types.ts';

export function ProjectMetrics({ metrics, size = 'md', withSource = false }: ProjectMetricsProps) {
  return (
    <ul className={styles.list} data-size={size}>
      {metrics.map((metric) => (
        <li key={metric.label}>
          <Metric value={metric.value} unit={metric.unit} label={metric.label} source={withSource ? metric.source : undefined} size={size} />
        </li>
      ))}
    </ul>
  );
}
