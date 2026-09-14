export interface EmptyStateProps {
  /** Large italic-serif glyph, e.g. a single character or short mark. @default "—" */
  glyph?: string;
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Usually one or two <Button>s. */
  actions?: React.ReactNode;
  className?: string;
}
