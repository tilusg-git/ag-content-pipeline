export interface AvatarProps {
  /** Single-character initial, set in italic Newsreader. */
  initial: string;
  /** Any stable per-user string — deterministically picks one of five ground colors. */
  userId?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}
export interface AvatarStackProps {
  children: React.ReactNode;
  /** Shows a "+N" overflow avatar at the end. */
  more?: number;
  className?: string;
}
