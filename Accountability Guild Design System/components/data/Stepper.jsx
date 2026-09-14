import React, { useState } from "react";

export function Stepper({ value, defaultValue = 0, min = 0, max = 99, onChange, className }) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  function set(next) {
    const clamped = Math.max(min, Math.min(max, next));
    setInternal(clamped);
    onChange && onChange(clamped);
  }
  return (
    <div className={["stepper", className].filter(Boolean).join(" ")}>
      <button type="button" onClick={() => set(current - 1)} disabled={current <= min}>&minus;</button>
      <input value={current} readOnly />
      <button type="button" onClick={() => set(current + 1)} disabled={current >= max}>+</button>
    </div>
  );
}
