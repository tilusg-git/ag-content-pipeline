export interface DropdownMenuItem {
  label?: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  /** Mono keyboard-shortcut hint, right-aligned. */
  kbd?: string;
  /** Renders a hairline divider instead of an item. */
  separator?: boolean;
}
export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
}
