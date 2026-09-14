import React, { useState } from "react";

export function Tabs({ items = [], value, defaultValue, onChange, className }) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const current = value ?? internal;
  function pick(v) {
    setInternal(v);
    onChange && onChange(v);
  }
  return (
    <div className={["tabs", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={["tab", current === item.value && "is-on"].filter(Boolean).join(" ")}
          onClick={() => pick(item.value)}
        >
          {item.label}
          {item.count !== undefined ? <span className="ct">{item.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
