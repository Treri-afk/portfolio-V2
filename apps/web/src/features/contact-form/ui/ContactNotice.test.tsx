// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { contact } from '../../../shared/content/index.ts';
import { ContactNotice } from './ContactNotice.tsx';

afterEach(cleanup);

describe('ContactNotice', () => {
  it('renders the live region before any message, so the result is announced', () => {
    render(<ContactNotice />);
    expect(screen.getByRole('status').textContent).toBe('');
  });

  it('shows the success message inside the live region', () => {
    render(<ContactNotice result={{ status: 'success' }} />);
    expect(screen.getByRole('status').textContent).toBe(contact.form.success);
  });
});
