import clsx from 'clsx';
import styles from './Container.module.css';
import type { ContainerProps } from './Container.types.ts';

export function Container({ size = 'content', className, children }: ContainerProps) {
  return (
    <div className={clsx(styles.container, className)} data-size={size}>
      {children}
    </div>
  );
}
