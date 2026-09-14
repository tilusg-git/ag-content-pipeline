import React, { useState } from "react";

export function SegmentedControl({ options = [], value, defaultValue, onChange, className }) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? internal;
  function pick(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return (
    <div className={["seg", className].filter(Boolean).join(" ")}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={["seg-btn", current === opt.value && "is-on"].filter(Boolean).join(" ")}
          onClick={() => pick(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
