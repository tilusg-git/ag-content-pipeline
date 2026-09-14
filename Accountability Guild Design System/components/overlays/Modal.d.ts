export interface ModalProps {
  open: boolean;
  /** Mono uppercase kicker above the title. */
  kicker?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Usually a row of <Button>s. */
  actions?: React.ReactNode;
  /** Tints the kicker error-red for destructive confirmations. */
  destructive?: boolean;
  onClose?: () => void;
  className?: string;
}
