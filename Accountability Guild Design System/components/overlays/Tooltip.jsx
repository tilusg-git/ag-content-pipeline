import React from "react";

export function Tooltip({ label, children, className }) {
  return (
    <span className={["tip-wrap", className].filter(Boolean).join(" ")}>
      <span className="tip-trigger" tabIndex={0}>{children}</span>
      <span className="tip">{label}</span>
    </span>
  );
}

export function Popover({ heading, children, className }) {
  return (
    <div className={["popover", className].filter(Boolean).join(" ")}>
      {heading ? <div className="h">{heading}</div> : null}
      <p className="b">{children}</p>
    </div>
  );
}
