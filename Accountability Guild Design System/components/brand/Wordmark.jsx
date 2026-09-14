import React from "react";

function content(variant, kicker) {
  if (variant === "flag") {
    return (
      <>
        <span className="ag-wordmark-rule" aria-hidden="true" />
        <span className="ag-wordmark-flag-copy">
          <span className="ag-wordmark-mono">{kicker ?? "Cycle Report"}</span>
          <span className="ag-wordmark-serif">Accountability Guild</span>
        </span>
      </>
    );
  }
  if (variant === "stacked") {
    return (
      <>
        <span className="ag-wordmark-serif">Accountability</span>
        <span className="ag-wordmark-rule" aria-hidden="true" />
        <span className="ag-wordmark-mono">Guild{kicker ? ` · ${kicker}` : ""}</span>
      </>
    );
  }
  return (
    <>
      <span className="ag-wordmark-serif">Accountability</span>
      <span className="ag-wordmark-mono">Guild</span>
    </>
  );
}

export function Wordmark({ variant = "inline", kicker, scale = 1, className, "aria-label": ariaLabel = "Accountability Guild" }) {
  const classes = ["ag-wordmark", `ag-wordmark-${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} style={{ fontSize: `${scale}rem` }} aria-label={ariaLabel}>
      {content(variant, kicker)}
    </span>
  );
}
