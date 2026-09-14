export interface CheckboxProps {
  label: React.ReactNode;
  /** Italic-serif helper line under the label. */
  help?: string;
  error?: boolean;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
