import React from "react";

export function Chip({ children, onRemove, className }) {
  return (
    <span className={["chip", className].filter(Boolean).join(" ")}>
      {children}
      {onRemove ? <button type="button" onClick={onRemove} aria-label="Remove">&times;</button> : null}
    </span>
  );
}

export function ChipAdd({ children = "Add", onClick, className }) {
  return (
    <button type="button" className={["chip", "chip-add", className].filter(Boolean).join(" ")} onClick={onClick}>
      + {children}
    </button>
  );
}
