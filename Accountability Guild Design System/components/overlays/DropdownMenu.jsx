import React, { useState, useRef, useEffect } from "react";

export function DropdownMenu({ trigger, items = [], align = "left", className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className={["dd-wrap", align === "right" && "right", className].filter(Boolean).join(" ")} ref={ref}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      <div className="dd" hidden={!open}>
        {items.map((item, i) =>
          item.separator ? (
            <div className="dd-sep" key={i} />
          ) : (
            <button
              key={i}
              type="button"
              className={["dd-item", item.destructive && "is-destructive"].filter(Boolean).join(" ")}
              onClick={() => { item.onClick && item.onClick(); setOpen(false); }}
            >
              {item.label}
              {item.kbd ? <span className="kbd">{item.kbd}</span> : null}
            </button>
          )
        )}
      </div>
    </div>
  );
}
