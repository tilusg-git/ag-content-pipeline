export interface RadioProps {
  label: React.ReactNode;
  help?: string;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
