import React, { useState } from "react";

export function MoneyInput({ value, defaultValue = "", currency = "$", presets = [], onChange, className }) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  function set(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return (
    <div className={className}>
      <div className="money-wrap">
        <span className="ccy">{currency}</span>
        <input type="text" value={current} onChange={(e) => set(e.target.value)} inputMode="decimal" />
      </div>
      {presets.length ? (
        <div className="money-chips">
          {presets.map((p) => (
            <button key={p} type="button" className={["money-chip", current === String(p) && "is-on"].filter(Boolean).join(" ")} onClick={() => set(String(p))}>
              {currency}{p}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
