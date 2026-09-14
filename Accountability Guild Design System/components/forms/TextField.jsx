import React from "react";

export function TextField({
  label,
  optional,
  help,
  error,
  success,
  type = "text",
  className,
  id,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className={["field", error && "is-error", success && "is-success", className].filter(Boolean).join(" ")}>
      {label ? (
        <label htmlFor={fieldId}>
          {label}
          {optional ? <span className="opt">Optional</span> : null}
        </label>
      ) : null}
      <input id={fieldId} type={type} {...rest} />
      {error ? (
        <div className="field-error"><span className="dot" aria-hidden="true" />{error}</div>
      ) : success ? (
        <div className="field-success"><span className="check">&#10003;</span>{success}</div>
      ) : help ? (
        <div className="field-help">{help}</div>
      ) : null}
    </div>
  );
}
