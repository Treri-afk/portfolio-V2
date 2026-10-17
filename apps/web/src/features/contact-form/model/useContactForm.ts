import type { FormEvent } from 'react';
import { useNavigation, useSubmit } from 'react-router';

/** Hands the native form to the route's clientAction and exposes the pending state. */
export function useContactForm() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit(event.currentTarget, { method: 'post' });
  };
  return { onSubmit, isPending: navigation.state === 'submitting' };
}
