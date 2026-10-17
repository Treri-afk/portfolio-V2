export interface TextFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email';
  multiline?: boolean | undefined;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  description?: string | undefined;
}
