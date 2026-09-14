import React from "react";

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  loading = false,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const classes = [
    "btn",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    variant === "ghost" && "btn-ghost",
    variant === "destructive" && "btn-destructive",
    size === "sm" && "btn-sm",
    size === "lg" && "btn-lg",
    size === "block" && "btn-block",
    loading && "is-loading",
    className,
  ].filter(Boolean).join(" ");

  return (
    <button type="button" className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <span className="spinner" aria-hidden="true" /> : null}
      {children}
      {arrow && !loading ? <span className="arrow" aria-hidden="true">&rarr;</span> : null}
    </button>
  );
}
