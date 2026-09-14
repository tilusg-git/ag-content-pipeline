import React from "react";

export function FormSummary({ kicker = "Fix the following", children, className }) {
  return (
    <div className={["form-summary", className].filter(Boolean).join(" ")}>
      <span className="kicker">{kicker}</span>
      <p>{children}</p>
    </div>
  );
}
