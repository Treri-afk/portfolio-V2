import { contactLimits as limits } from '@portfolio/contracts/constants';
import { contact } from '../../../shared/content/index.ts';
import { TextField } from '../../../shared/ui/index.ts';

const { form } = contact;

/** Name, e-mail and message, with the contract's limits as native constraints. */
export function ContactFields() {
  return (
    <>
      <TextField name="name" label={form.name} autoComplete="name" isRequired maxLength={limits.name.max} />
      <TextField name="email" type="email" label={form.email} autoComplete="email" isRequired maxLength={limits.email.max} />
      <TextField name="message" label={form.message} description={form.messageHint} multiline isRequired minLength={limits.message.min} maxLength={limits.message.max} />
    </>
  );
}
