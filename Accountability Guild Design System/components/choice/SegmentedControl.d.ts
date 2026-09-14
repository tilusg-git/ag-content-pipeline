export interface SegmentedControlOption {
  value: string;
  label: string;
}
export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}
