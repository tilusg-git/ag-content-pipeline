export interface ToastProps {
  tone?: "info" | "success" | "warning" | "error";
  kicker?: string;
  children: React.ReactNode;
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
}
export interface ToastStackProps {
  children: React.ReactNode;
}
