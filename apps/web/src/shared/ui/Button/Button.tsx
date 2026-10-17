import clsx from 'clsx';
import type { MouseEvent } from 'react';
import styles from '../action/action.module.css';
import type { ButtonProps } from './Button.types.ts';

/** Native button. While pending it stays focusable (aria-disabled) and ignores clicks, so focus is never lost. */
export function Button({ variant = 'primary', type = 'button', isPending = false, onPress, className, children, ...aria }: ButtonProps) {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isPending) event.preventDefault();
    else onPress?.();
  };
  return (
    <button type={type} className={clsx(styles.action, className)} data-variant={variant} aria-disabled={isPending || undefined} aria-busy={isPending || undefined} onClick={onClick} {...aria}>
      {children}
    </button>
  );
}
