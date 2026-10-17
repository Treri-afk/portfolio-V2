import { contact, site } from '../../shared/content/index.ts';
import { Heading, LinkList, Stack } from '../../shared/ui/index.ts';
import styles from './ContactPanel.module.css';

export function DirectLinks() {
  return (
    <Stack as="section" gap="md" className={styles.direct}>
      <Heading level={2} size="heading-m">{contact.directTitle}</Heading>
      <LinkList items={site.directLinks} direction="column" />
    </Stack>
  );
}
