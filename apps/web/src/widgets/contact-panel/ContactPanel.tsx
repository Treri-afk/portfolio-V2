import { ContactForm, type ContactResult } from '../../features/contact-form/index.ts';
import { contact } from '../../shared/content/index.ts';
import { Container, Eyebrow, Heading, Slice, Stack, Text } from '../../shared/ui/index.ts';
import styles from './ContactPanel.module.css';
import { DirectLinks } from './DirectLinks.tsx';

/** Short intro beside the form: the first field is visible without scrolling, on mobile too. */
export function ContactPanel({ result }: { result?: ContactResult | undefined }) {
  return (
    <Slice as="section" angleBottom="rise-base" labelledBy="contact-title">
      <Container size="wide" className={styles.grid}>
        <Stack gap="md" className={styles.intro}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading level={1} size="display-m" id="contact-title">{contact.title}</Heading>
          <Text tone="secondary">{contact.lead}</Text>
        </Stack>
        <div className={styles.form}>
          <ContactForm result={result} />
        </div>
        <DirectLinks />
      </Container>
    </Slice>
  );
}
