export interface TooltipProps {
  /** Mono uppercase tooltip text shown above the trigger. */
  label: string;
  children: React.ReactNode;
  className?: string;
}
export interface PopoverProps {
  heading?: string;
  children: React.ReactNode;
  className?: string;
}
