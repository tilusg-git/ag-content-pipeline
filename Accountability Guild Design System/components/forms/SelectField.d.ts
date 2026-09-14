export interface SelectFieldOption {
  value: string;
  label: string;
}
export interface SelectFieldProps {
  label?: string;
  optional?: boolean;
  help?: string;
  options: SelectFieldOption[];
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
