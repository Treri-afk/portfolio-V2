import { contactCta, site } from '../../shared/content/index.ts';
import { Container, Eyebrow, Heading, Icon, Link, LinkList, Slice, Stack, Text } from '../../shared/ui/index.ts';
import styles from './ContactCta.module.css';

const TITLE_ID = 'contact-cta';

export function ContactCta() {
  return (
    <Slice angleTop="fall-steep" angleBottom="rise-base" labelledBy={TITLE_ID}>
      <Container size="wide">
        <Stack gap="lg" className={styles.copy}>
          <Eyebrow>{contactCta.eyebrow}</Eyebrow>
          <Heading level={2} size="display-l" id={TITLE_ID}>{contactCta.title}</Heading>
          <Text variant="lead" tone="secondary">{contactCta.text}</Text>
          <Stack direction="row" gap="md" align="center" wrap>
            <Link to="/contact" variant="primary">{contactCta.action}<Icon name="arrow-right" /></Link>
            <LinkList items={[site.emailLink]} />
          </Stack>
        </Stack>
      </Container>
    </Slice>
  );
}
