import { contact } from '../../../shared/content/index.ts';
import { Notice } from '../../../shared/ui/index.ts';
import type { ContactResult } from '../model/types.ts';

const MESSAGES = {
  success: { tone: 'success', text: contact.form.success },
  invalid: { tone: 'danger', text: contact.form.invalid },
  unavailable: { tone: 'danger', text: contact.form.unavailable },
} as const;

/** The live region is always rendered, so screen readers announce the message when it appears. */
export function ContactNotice({ result }: { result?: ContactResult | undefined }) {
  const message = result ? MESSAGES[result.status] : null;
  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      {message ? <Notice tone={message.tone}>{message.text}</Notice> : null}
    </div>
  );
}
