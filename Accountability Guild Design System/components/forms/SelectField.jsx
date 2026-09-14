import React from "react";

export function SelectField({ label, optional, help, options = [], className, id, ...rest }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div className={["field", className].filter(Boolean).join(" ")}>
      {label ? (
        <label htmlFor={fieldId}>{label}{optional ? <span className="opt">Optional</span> : null}</label>
      ) : null}
      <div className="select-wrap">
        <select id={fieldId} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="select-chev" aria-hidden="true">&#9662;</span>
      </div>
      {help ? <div className="field-help">{help}</div> : null}
    </div>
  );
}
