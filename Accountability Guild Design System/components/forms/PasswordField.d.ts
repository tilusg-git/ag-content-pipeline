export interface PasswordFieldProps {
  label?: string;
  help?: string;
  /** Minimum length shown by the strength meter. @default 8 */
  minLength?: number;
  value?: string;
  id?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
