import { site, ui } from '../../shared/content/index.ts';
import { Container, LinkList, Slice, Text } from '../../shared/ui/index.ts';
import { LegalNav } from './LegalNav.tsx';
import styles from './SiteFooter.module.css';

/** Every page ends on a "rise-base" edge so the footer nests under it. */
export function SiteFooter() {
  return (
    <Slice as="footer" tone="inverse" angleTop="rise-base">
      <Container size="wide" className={styles.inner}>
        <LinkList items={[...site.directLinks, site.sourceLink]} />
        <LegalNav />
        <Text variant="mono" tone="muted">{`© ${String(site.copyrightYear)} · ${ui.footer.note}`}</Text>
      </Container>
    </Slice>
  );
}
