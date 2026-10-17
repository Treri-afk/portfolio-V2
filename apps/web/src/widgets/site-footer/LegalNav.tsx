import { legalLabels, legalLinks } from '../../shared/content/index.ts';
import { Link, Stack, Text } from '../../shared/ui/index.ts';

export function LegalNav() {
  return (
    <nav aria-label={legalLabels.navLabel}>
      <Stack as="ul" direction="row" gap="lg" wrap>
        {legalLinks.map((link) => (
          <li key={link.to}>
            <Text as="span" variant="small" tone="secondary"><Link to={link.to}>{link.label}</Link></Text>
          </li>
        ))}
      </Stack>
    </nav>
  );
}
