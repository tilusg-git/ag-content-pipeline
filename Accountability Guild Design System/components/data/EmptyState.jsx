import React from "react";

export function EmptyState({ glyph = "—", kicker, title, children, actions, className }) {
  return (
    <div className={["empty", className].filter(Boolean).join(" ")}>
      <div className="glyph">{glyph}</div>
      {kicker ? <div className="kicker">{kicker}</div> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
      {actions ? <div className="actions">{actions}</div> : null}
    </div>
  );
}
