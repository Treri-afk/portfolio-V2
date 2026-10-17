import { about } from '../../shared/content/index.ts';
import { Heading, Stack, Text } from '../../shared/ui/index.ts';
import styles from './LookingFor.module.css';

/** On wide screens the panel starts level with the career list and stays in view while it scrolls. */
export function LookingFor() {
  return (
    <div className={styles.rail}>
      <Stack gap="lg" className={styles.panel}>
        <Heading level={2} size="heading-l">{about.lookingTitle}</Heading>
        <ul className={styles.list}>
          {about.looking.map((line) => (
            <li key={line}><Text>{line}</Text></li>
          ))}
        </ul>
      </Stack>
    </div>
  );
}
