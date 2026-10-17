import styles from './Metric.module.css';
import type { MetricProps } from './Metric.types.ts';

export function Metric({ value, unit, label, source, size = 'md' }: MetricProps) {
  return (
    <div className={styles.metric} data-size={size}>
      <p className={styles.value}>
        {value}
        {unit ? <span className={styles.unit}>{unit}</span> : null}
      </p>
      <p className={styles.label}>{label}</p>
      {source ? <p className={styles.source}>{source}</p> : null}
    </div>
  );
}
