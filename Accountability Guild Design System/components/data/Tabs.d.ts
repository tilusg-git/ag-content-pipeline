export interface TabItem {
  value: string;
  label: string;
  /** Optional mono count badge next to the label. */
  count?: number;
}
export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}
