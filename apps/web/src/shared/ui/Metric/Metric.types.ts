export interface MetricProps {
  value: string;
  unit?: string | undefined;
  label: string;
  /** How the number was measured: every figure on this site is verifiable. */
  source?: string | undefined;
  size?: 'md' | 'lg' | undefined;
}
