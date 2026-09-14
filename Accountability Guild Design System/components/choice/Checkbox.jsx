import React from "react";

export function Checkbox({ label, help, error, disabled, className, ...rest }) {
  return (
    <label className={["check", disabled && "is-disabled", error && "is-error", className].filter(Boolean).join(" ")}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span>
        {label}
        {help ? <em>{help}</em> : null}
      </span>
    </label>
  );
}
