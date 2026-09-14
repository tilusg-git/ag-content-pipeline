import React, { useState } from "react";

export function Toast({ tone = "info", kicker, children, action, onAction, onClose, className }) {
  const [leaving, setLeaving] = useState(false);
  function close() {
    setLeaving(true);
    setTimeout(() => onClose && onClose(), 180);
  }
  return (
    <div className={["toast", `toast-${tone}`, leaving && "is-leaving", className].filter(Boolean).join(" ")}>
      <div className="t-rule" />
      <div className="t-content">
        {kicker ? <span className="t-kicker">{kicker}</span> : null}
        <p className="t-body">{children}</p>
        {action ? <button type="button" className="t-action" onClick={onAction}>{action}</button> : null}
      </div>
      <button type="button" className="t-close" onClick={close} aria-label="Dismiss">&times;</button>
    </div>
  );
}

export function ToastStack({ children }) {
  return <div className="toast-stack">{children}</div>;
}
