import clsx from 'clsx';
import { FieldError, Input, Label, Text as AriaText, TextArea, TextField as AriaTextField } from 'react-aria-components';
import { Text } from '../Text/index.ts';
import styles from './TextField.module.css';
import type { TextFieldProps } from './TextField.types.ts';

/**
 * Labelled field with description and validation message (React Aria).
 * clsx() turns CSS-module lookups (string | undefined under noUncheckedIndexedAccess) into the string React Aria requires.
 */
export function TextField({ label, multiline = false, description, ...field }: TextFieldProps) {
  return (
    <AriaTextField {...field} className={clsx(styles.field)}>
      <Label><Text as="span" variant="eyebrow">{label}</Text></Label>
      {multiline ? <TextArea className={clsx(styles.input)} data-multiline /> : <Input className={clsx(styles.input)} />}
      {description ? <AriaText slot="description" className={styles.description}>{description}</AriaText> : null}
      <FieldError className={clsx(styles.error)} />
    </AriaTextField>
  );
}
