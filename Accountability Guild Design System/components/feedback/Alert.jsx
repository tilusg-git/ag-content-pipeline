import React from "react";

export function Alert({ tone = "info", kicker, children, action, actionHref, className }) {
  return (
    <div className={["alert", `alert-${tone}`, className].filter(Boolean).join(" ")}>
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <p className="body">{children}</p>
      {action ? <a className="alert-action" href={actionHref || "#"}>{action}</a> : null}
    </div>
  );
}
