import { contact } from '../../../shared/content/index.ts';
import { Link, Text } from '../../../shared/ui/index.ts';

const { privacy, privacyLink } = contact.form;

/** Information notice next to the form (GDPR art. 13): purpose, and where the full policy is. */
export function PrivacyNote() {
  return (
    <Text variant="small" tone="muted">
      {privacy} <Link to={privacyLink.to}>{privacyLink.label}</Link>
    </Text>
  );
}
