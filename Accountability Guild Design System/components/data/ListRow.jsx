import React from "react";

export function ListRow({ num, title, meta, end, onClick, className }) {
  return (
    <div className={["list-row", className].filter(Boolean).join(" ")} onClick={onClick}>
      {num !== undefined ? <span className="lr-num">{num}</span> : <span />}
      <span className="lr-main">
        <span className="lr-title">{title}</span>
        {meta ? <span className="lr-meta">{meta}</span> : null}
      </span>
      {end ? <span className="lr-end">{end}</span> : <span />}
    </div>
  );
}

export function List({ children, className }) {
  return <div className={["list", className].filter(Boolean).join(" ")}>{children}</div>;
}
