export interface BadgeProps {
  tone?: "info" | "success" | "warning" | "error";
  /** Solid ink fill instead of a tone. */
  ink?: boolean;
  /** Transparent background. */
  outline?: boolean;
  /** Show the small status dot. */
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}
