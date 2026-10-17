import clsx from 'clsx';
import { Form } from 'react-aria-components';
import { contact } from '../../../shared/content/index.ts';
import { Button } from '../../../shared/ui/index.ts';
import type { ContactResult } from '../model/types.ts';
import { useContactForm } from '../model/useContactForm.ts';
import { ContactFields } from './ContactFields.tsx';
import styles from './ContactForm.module.css';
import { ContactNotice } from './ContactNotice.tsx';
import { Honeypot } from './Honeypot.tsx';
import { PrivacyNote } from './PrivacyNote.tsx';

const { form } = contact;

export function ContactForm({ result }: { result?: ContactResult | undefined }) {
  const { onSubmit, isPending } = useContactForm();
  const errors = result?.status === 'invalid' ? result.errors : {};
  return (
    <Form aria-label={form.label} onSubmit={onSubmit} validationErrors={errors} className={clsx(styles.form)}>
      <ContactFields />
      <Honeypot label={form.honeypot} />
      <ContactNotice result={result} />
      <Button type="submit" isPending={isPending}>{isPending ? form.pending : form.submit}</Button>
      <PrivacyNote />
    </Form>
  );
}
