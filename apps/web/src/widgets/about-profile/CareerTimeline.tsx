import { about, career } from '../../shared/content/index.ts';
import { Heading, Stack, Text } from '../../shared/ui/index.ts';
import styles from './CareerTimeline.module.css';

export function CareerTimeline() {
  return (
    <Stack gap="lg">
      <Heading level={2} size="heading-l">{about.careerTitle}</Heading>
      <ol className={styles.list}>
        {career.map((entry) => (
          <li key={`${entry.period}-${entry.place}`} className={styles.entry}>
            <Text variant="mono" tone="muted">{entry.period}</Text>
            <Stack gap="xs">
              <Heading level={3} size="heading-m">{entry.title}</Heading>
              <Text variant="small" tone="accent">{entry.place}</Text>
              <Text tone="secondary">{entry.text}</Text>
            </Stack>
          </li>
        ))}
      </ol>
    </Stack>
  );
}
