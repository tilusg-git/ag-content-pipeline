export interface TextareaFieldProps {
  label?: string;
  optional?: boolean;
  help?: string;
  error?: string;
  /** Character counter string, e.g. "120 / 280". */
  counter?: string;
  maxLength?: number;
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
