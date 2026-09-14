export interface AlertProps {
  tone?: "info" | "success" | "warning" | "error";
  /** Mono uppercase kicker line, e.g. "CYCLE CLOSING". */
  kicker?: string;
  children: React.ReactNode;
  /** Italic-serif action link label. */
  action?: string;
  actionHref?: string;
  className?: string;
}
