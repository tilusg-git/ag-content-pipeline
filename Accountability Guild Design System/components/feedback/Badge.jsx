import React from "react";

export function Badge({ tone, ink, outline, dot, children, className }) {
  return (
    <span className={[
      "badge",
      tone && `badge-${tone}`,
      ink && "badge-ink",
      outline && "badge-outline",
      className,
    ].filter(Boolean).join(" ")}>
      {dot ? <span className="dot" /> : null}
      {children}
    </span>
  );
}
