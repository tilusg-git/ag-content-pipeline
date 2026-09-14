export interface ListRowProps {
  /** Mono row number/index, e.g. "01". */
  num?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  /** Right-aligned slot — badges, avatars, chevrons. */
  end?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export interface ListProps {
  children: React.ReactNode;
  className?: string;
}
