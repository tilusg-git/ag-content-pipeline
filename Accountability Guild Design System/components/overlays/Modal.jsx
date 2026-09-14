import React from "react";

export function Modal({ open, kicker, title, children, actions, destructive, onClose, className }) {
  if (!open) return null;
  return (
    <div className={["modal-overlay", "is-open"].join(" ")} onClick={onClose}>
      <div className={["modal", destructive && "is-destructive", className].filter(Boolean).join(" ")} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          {kicker ? <div className="kicker">{kicker}</div> : null}
          <h3>{title}</h3>
        </div>
        <div className="modal-body">{children}</div>
        {actions ? <div className="modal-foot">{actions}</div> : null}
      </div>
    </div>
  );
}
