import type { FormProps } from 'react-aria-components';
import { useNavigation, useSubmit } from 'react-router';

/** The event type React Aria's Form passes to onSubmit. */
type FormSubmitEvent = Parameters<NonNullable<FormProps['onSubmit']>>[0];

/** Hands the native form to the route's clientAction and exposes the pending state. */
export function useContactForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const onSubmit = (event: FormSubmitEvent) => {
    event.preventDefault();
    void submit(event.currentTarget, { method: 'post' });
  };
  return { onSubmit, isPending: navigation.state === 'submitting' };
}
