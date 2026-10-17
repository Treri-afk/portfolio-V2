// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from './Button.tsx';

afterEach(cleanup);

describe('Button', () => {
  it('calls onPress when clicked', () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Envoyer</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('stays focusable but ignores clicks while pending', () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress} isPending>Envoi…</Button>);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(false);
    fireEvent.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
