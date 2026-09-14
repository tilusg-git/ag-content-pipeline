import React from "react";

export function Toggle({ label, help, checked, onChange, disabled, className, ...rest }) {
  return (
    <label className={["toggle", className].filter(Boolean).join(" ")}>
      <span className="t-label">
        <strong>{label}</strong>
        {help ? <em>{help}</em> : null}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} {...rest} />
      <span className="t-track"><span className="t-knob" /></span>
    </label>
  );
}
