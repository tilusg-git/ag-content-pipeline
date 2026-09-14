export interface ButtonProps {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  /** Size. @default "md" */
  size?: "sm" | "md" | "lg" | "block";
  /** Show the italic-serif arrow affordance after the label. @default false */
  arrow?: boolean;
  /** Show the spinner and disable interaction. @default false */
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
