export interface ToggleProps {
  label: string;
  help?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
