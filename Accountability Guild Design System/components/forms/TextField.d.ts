export interface TextFieldProps {
  label?: string;
  /** Adds a muted "Optional" tag next to the label. */
  optional?: boolean;
  /** Italic-serif help text below the field. */
  help?: string;
  /** Sans error message with a dot marker; overrides help/success. */
  error?: string;
  /** Italic-serif success confirmation with a sans check mark. */
  success?: string;
  type?: "text" | "email" | "tel" | "password";
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
