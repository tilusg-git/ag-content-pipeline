import React, { useState } from "react";

function scoreStrength(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

export function PasswordField({ label = "Password", help, minLength = 8, value, onChange, className, id, ...rest }) {
  const [show, setShow] = useState(false);
  const [internal, setInternal] = useState("");
  const current = value ?? internal;
  const score = scoreStrength(current);
  const met = current.length >= minLength;
  const fieldId = id || "password";

  function handleChange(e) {
    setInternal(e.target.value);
    onChange && onChange(e);
  }

  return (
    <div className={["field", className].filter(Boolean).join(" ")}>
      <label htmlFor={fieldId}>{label}</label>
      <div className="field-input-wrap">
        <input id={fieldId} type={show ? "text" : "password"} value={value !== undefined ? value : internal} onChange={handleChange} {...rest} />
        <button type="button" className="show-btn" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"}</button>
      </div>
      <div className="pw-meter" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={["seg", i < score && "is-on"].filter(Boolean).join(" ")} />
        ))}
      </div>
      <div className={["pw-meter-label", met && "is-met"].filter(Boolean).join(" ")}>
        {help ? <div className="field-help">{help}</div> : <span />}
        <span className="count">{current.length} / {minLength} min</span>
      </div>
    </div>
  );
}
