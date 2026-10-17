import type { ContactResult } from '../../features/contact-form/index.ts';
import { ContactPanel } from '../../widgets/contact-panel/index.ts';

export function ContactPage({ result }: { result?: ContactResult | undefined }) {
  return <ContactPanel result={result} />;
}
