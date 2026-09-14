export interface MoneyInputProps {
  value?: string;
  defaultValue?: string;
  currency?: string;
  /** Quick-pick chip amounts, e.g. [10, 20, 50]. */
  presets?: number[];
  className?: string;
  onChange?: (value: string) => void;
}
