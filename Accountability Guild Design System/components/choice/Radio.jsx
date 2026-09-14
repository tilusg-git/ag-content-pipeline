import React from "react";

export function Radio({ label, help, name, disabled, className, ...rest }) {
  return (
    <label className={["radio", disabled && "is-disabled", className].filter(Boolean).join(" ")}>
      <input type="radio" name={name} disabled={disabled} {...rest} />
      <span>
        {label}
        {help ? <em>{help}</em> : null}
      </span>
    </label>
  );
}
