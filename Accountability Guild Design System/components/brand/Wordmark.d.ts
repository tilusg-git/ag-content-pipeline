export interface WordmarkProps {
  /** "inline" (A · the logo), "stacked" (masthead), "flag" (mono column header). @default "inline" */
  variant?: "inline" | "stacked" | "flag";
  /** Small mono label — cycle number, edition, etc. */
  kicker?: string;
  /** Font-size multiplier in rem. @default 1 */
  scale?: number;
  className?: string;
  "aria-label"?: string;
}
