import React from "react";

export function Pagination({ page, pageCount, onChange, summary, className }) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <div className={["pag", className].filter(Boolean).join(" ")}>
      <button type="button" className="pag-arrow" disabled={page <= 1} onClick={() => onChange(page - 1)}>&larr;</button>
      {pages.map((p) => (
        <button key={p} type="button" className={p === page ? "is-on" : ""} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button type="button" className="pag-arrow" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>&rarr;</button>
      {summary ? <span className="pag-summary" style={{ marginLeft: 12 }}>{summary}</span> : null}
    </div>
  );
}
