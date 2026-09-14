export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  className?: string;
  onChange?: (value: number) => void;
}
