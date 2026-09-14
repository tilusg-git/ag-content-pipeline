import React from "react";

export function DateInput({ value, onChange, className, ...rest }) {
  return (
    <div className={["date-wrap", className].filter(Boolean).join(" ")}>
      <input type="date" value={value} onChange={onChange} {...rest} />
      <span className="cal" aria-hidden="true">&#128197;</span>
    </div>
  );
}
