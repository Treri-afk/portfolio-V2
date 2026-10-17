import { contactLimits as limits } from '@portfolio/contracts/constants';
import clsx from 'clsx';
import { Form } from 'react-aria-components';
import { contact } from '../../../shared/content/index.ts';
import { Button, TextField } from '../../../shared/ui/index.ts';
import type { ContactResult } from '../model/types.ts';
import { useContactForm } from '../model/useContactForm.ts';
import styles from './ContactForm.module.css';
import { ContactNotice } from './ContactNotice.tsx';
import { Honeypot } from './Honeypot.tsx';

const { form } = contact;

export function ContactForm({ result }: { result?: ContactResult | undefined }) {
  const { onSubmit, isPending } = useContactForm();
  const errors = result?.status === 'invalid' ? result.errors : {};
  return (
    <Form aria-label={form.label} onSubmit={onSubmit} validationErrors={errors} className={clsx(styles.form)}>
      <TextField name="name" label={form.name} autoComplete="name" isRequired maxLength={limits.name.max} />
      <TextField name="email" type="email" label={form.email} autoComplete="email" isRequired maxLength={limits.email.max} />
      <TextField name="message" label={form.message} description={form.messageHint} multiline isRequired minLength={limits.message.min} maxLength={limits.message.max} />
      <Honeypot label={form.honeypot} />
      <ContactNotice result={result} />
      <Button type="submit" isPending={isPending}>{isPending ? form.pending : form.submit}</Button>
    </Form>
  );
}
