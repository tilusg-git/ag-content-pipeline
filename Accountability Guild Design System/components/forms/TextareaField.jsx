import React from "react";

export function TextareaField({ label, optional, help, error, counter, maxLength, className, id, ...rest }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className={["field", error && "is-error", className].filter(Boolean).join(" ")}>
      {label ? (
        <label htmlFor={fieldId}>{label}{optional ? <span className="opt">Optional</span> : null}</label>
      ) : null}
      <textarea id={fieldId} maxLength={maxLength} {...rest} />
      <div className="field-meta">
        {error ? (
          <div className="field-error"><span className="dot" aria-hidden="true" />{error}</div>
        ) : help ? (
          <div className="field-help">{help}</div>
        ) : <span />}
        {counter ? <span className="counter">{counter}</span> : null}
      </div>
    </div>
  );
}
