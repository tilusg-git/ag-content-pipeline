/* Accountability Guild — product-view scenes.
 *
 * Each scene turns a plain data object into markup that uses the app's real
 * class names, so the app's own stylesheet (repo/src/styles/components.css)
 * styles it. Markup mirrors the JSX in repo/src/components/dashboard-today-marks.tsx;
 * if that component changes, update the matching scene here.
 *
 * A scene exports:
 *   render(data)   -> HTML string for the product panel
 *   defaults       -> frame defaults (scale, device padding) for this scene
 */

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pillarLabel(value) {
  return String(value).replaceAll("_", " ").toUpperCase();
}

// ── Mark sheet: the check-in dialog a member sees when marking a day ──────
// dashboard-today-marks.tsx MarkSheet (lines ~340-430).
const MARK_OUTCOMES = [
  { value: "done", label: "Kept", glyph: "✓" },
  { value: "missed", label: "Missed", glyph: "-" },
  { value: "skip", label: "Skipped", glyph: "s" },
];

const markSheet = {
  defaults: { device: false, scale: 2 },
  render(d) {
    const outcomes = MARK_OUTCOMES.map(
      (o) =>
        `<button type="button" class="${d.outcome === o.value ? "is-selected" : ""}"><span>${o.glyph}</span>${o.label}</button>`,
    ).join("");
    const note = d.note ?? "";
    const hasPhoto = Boolean(d.photoDataUrl);
    const photoInner = hasPhoto
      ? `<img src="${d.photoDataUrl}" alt="">`
      : `<span>▧</span>`;
    const caret = d.caret ? `<i class="pv-caret"></i>` : "";
    return `
<div class="dash-mark-sheet-stage pv-static-stage">
  <div class="dash-mark-sheet-panel">
    <div class="dash-mark-sheet-head">
      <div>
        <p>${esc(pillarLabel(d.pillar))} · ${esc(String(d.cadence).toUpperCase())}</p>
        <h2>${esc(d.title)}</h2>
        <span>${esc(d.date)} · ${d.backfill ? "BACKFILL" : "THIS DAY"}</span>
      </div>
      <button type="button">×</button>
    </div>
    <div class="dash-mark-this-day">
      <span>THIS DAY</span>
      <div class="dash-mark-outcomes">${outcomes}</div>
    </div>
    <label class="dash-mark-note">
      <span><strong>NOTE</strong><em>${note.length} / 240</em></span>
      <div class="pv-textarea">${note ? esc(note) + caret : `<span class="pv-placeholder">${caret}What happened? A line for your future self...</span>`}</div>
    </label>
    <div class="dash-mark-photo-field">
      <p>PHOTO</p>
      <div class="dash-mark-photo-preview${hasPhoto ? " has-photo" : ""}">
        <label class="dash-mark-photo-slot${hasPhoto ? " has-photo" : ""}">
          ${photoInner}
          <span class="dash-mark-photo-copy">
            <strong>${esc(hasPhoto ? d.photoName || "photo.jpg" : "Drop a photo, or click to add")}</strong>
            <em>${hasPhoto ? "Tap image to replace" : "Image under 5 MB"}</em>
          </span>
        </label>
        ${hasPhoto ? `<button type="button" class="dash-mark-photo-remove">Remove photo</button>` : ""}
      </div>
    </div>
    <div class="dash-mark-sheet-foot">
      <button type="button" class="dash-mark-submit"${d.outcome ? "" : " disabled"}>${d.saving ? "Saving" : "Done"}</button>
    </div>
  </div>
</div>`;
  },
};

// ── Week board: goals × days matrix, the everyday marking surface ────────
// dashboard-today-marks.tsx WeekBoard (lines ~906-1083).
// Cell tokens: done | missed | skip | today | open | future | outside,
// optionally suffixed "+note", "+photo" (e.g. "done+note+photo").
const CELL_GLYPH = { done: "✓", missed: "—", skip: "s" };

function weekCell(token, isToday) {
  const [state, ...flags] = String(token || "open").split("+");
  const hasNote = flags.includes("note");
  const hasPhoto = flags.includes("photo");
  const interactive = state !== "future" && state !== "outside";
  const cls = `dash-week-cell is-${state}${isToday ? " is-date-today" : ""}${hasNote ? " has-note" : ""}${hasPhoto ? " has-photo" : ""}`;
  return `<button type="button" class="${cls}"${interactive ? "" : " disabled"}><span>${CELL_GLYPH[state] ?? ""}</span>${interactive ? `<span class="dash-week-dogear"></span>` : ""}${hasPhoto ? `<span class="dash-week-photo-dot"></span>` : ""}</button>`;
}

const weekBoard = {
  defaults: { device: true, scale: 1.6 },
  render(d) {
    const todayIdx = d.days.findIndex((day) => day.today);
    const head = d.days
      .map(
        (day, i) =>
          `<span class="dash-week-head-day${day.today ? " is-today" : ""}${todayIdx >= 0 && i < todayIdx ? " is-past" : ""}"><em>${esc(day.dow.toUpperCase())}</em><strong>${esc(day.dom)}</strong></span>`,
      )
      .join("");
    const rows = d.goals
      .map((g) => {
        let control;
        if (g.mode === "count") {
          const target = g.target ?? 0;
          const met = target > 0 && g.value >= target;
          const pips = Array.from({ length: Math.max(target, 1) }, (_, i) =>
            `<span class="${i < g.value ? (met ? "is-filled is-met" : "is-filled") : ""}"></span>`,
          ).join("");
          control = `<div class="dash-week-row-control dash-week-tally"><span class="dash-week-tally-value"><strong class="${met ? "is-met" : ""}">${g.value}</strong><em>/${target || "—"}</em></span><span class="dash-week-tally-pips">${pips}</span><button type="button" class="dash-week-tally-add">Mark</button></div>`;
        } else if (g.mode === "report") {
          control = `<div class="dash-week-row-control dash-week-atreport"><span>Tracked at the cycle report — no daily grid.</span></div>`;
        } else {
          control = `<div class="dash-week-row-cells">${g.cells.map((c, i) => weekCell(c, i === todayIdx)).join("")}</div>`;
        }
        return `<div class="dash-week-row"><div class="dash-week-row-label"><span>${esc(pillarLabel(g.pillar))}</span><strong>${esc(g.title)}</strong></div>${control}</div>`;
      })
      .join("");
    return `
<div class="dash-week-board">
  <div class="dash-week-pager">
    <button type="button" class="dash-week-pager-arrow"${d.weekIndex <= 1 ? " disabled" : ""}>‹</button>
    <div class="dash-week-pager-label">
      <p>WEEK ${d.weekIndex} OF ${d.weekCount}${d.thisWeek ? " · THIS WEEK" : ""}</p>
      <strong>${esc(d.weekLabel)}</strong>
    </div>
    <button type="button" class="dash-week-pager-arrow"${d.weekIndex >= d.weekCount ? " disabled" : ""}>›</button>
  </div>
  <div class="dash-week-grid">
    <div class="dash-week-head"><div class="dash-week-head-spacer"></div><div class="dash-week-head-days">${head}</div></div>
    ${rows}
  </div>
  ${d.legend === false ? "" : `<p class="dash-week-legend"><span class="dash-week-legend-swatch"></span>EMBER CORNER = NOTE · EMBER DOT = PHOTO · TAP A CELL TO ADD DETAILS</p>`}
</div>`;
  },
};

// ── Goal detail: one goal's cycle history (streak, hits, day grid) ───────
// dashboard-today-marks.tsx GoalDetail (lines ~444-517).
// Day tokens: done | miss | sick | today | future | outside | empty.
const DETAIL_GLYPH = { done: "✓", miss: "—", sick: "s", today: "·" };

const goalDetail = {
  defaults: { device: true, scale: 2 },
  render(d) {
    const weeks = d.weeks
      .map(
        (days, i) =>
          `<div class="dash-goal-detail-week"><span>0${i + 1}</span><div>${days
            .map((s) => `<span class="dash-goal-detail-day is-${s}">${DETAIL_GLYPH[s] ?? ""}</span>`)
            .join("")}</div></div>`,
      )
      .join("");
    return `
<section class="dash-goal-detail">
  <div class="dash-goal-detail-nav">
    <button type="button">Goals</button>
    <div><h2>${esc(d.title)}</h2><p>${esc(pillarLabel(d.pillar))} · ${esc(String(d.cadence).toUpperCase())}</p></div>
    <button type="button">Edit</button>
  </div>
  <div class="dash-goal-detail-stats">
    <span><strong>${esc(d.streak)}</strong> · STREAK</span>
    <span><strong>${esc(d.hit)}</strong> · HIT</span>
    <span>${esc(d.position)}</span>
  </div>
  <div class="dash-goal-detail-weekdays">${["M", "T", "W", "T", "F", "S", "S"].map((x) => `<span>${x}</span>`).join("")}</div>
  <div class="dash-goal-detail-grid">${weeks}</div>
  <p class="dash-goal-detail-notes">NOTES &amp; PROOF · ${esc(d.notesCount ?? 0)}</p>
  <div class="dash-goal-detail-footer">
    <p>${d.todayMarked ? "Today is marked." : "Today is unmarked."}</p>
    <button type="button">Mark today</button>
  </div>
</section>`;
  },
};

// ── Cycle-close report ───────────────────────────────────────────────────
// dashboard-reporting-flow.tsx: report-compose-mast (~1898), report-goal-row
// (~2262), report-bucket-picker (~2552), report-writeup (~2647), submit panel
// (~2795), sidebar tally + forfeit note (~2850). Money figures are passed in
// as display strings; the scene doesn't compute forfeits.
//
// Goal score `pct`: null = unmarked, 0 = missed, 100 = kept, else partial.
function goalTone(pct) {
  if (pct === null || pct === undefined) return { tone: "none", label: "Unmarked", value: "—" };
  if (pct >= 100) return { tone: "kept", label: "Kept", value: `${pct}%` };
  if (pct <= 0) return { tone: "missed", label: "Missed", value: `${pct}%` };
  return { tone: "partial", label: "Partial", value: `${pct}%` };
}

const TRACKING_LABEL = { daily: "Daily marks", count: "Count", percentage: "Percentage" };

function reportGoalHead(g) {
  const t = goalTone(g.pct);
  const target =
    g.tracking && g.tracking !== "percentage" && g.target !== undefined
      ? `<p>${g.tracking === "count" ? "Target count" : "Weekly target count"}: ${esc(g.target)}</p>`
      : "";
  return `
  <div class="report-goal-row-head">
    <p>${esc(g.pillar)}</p>
    <div class="report-goal-status" data-tone="${t.tone}"><span>${t.label}</span><strong>${t.value}</strong></div>
  </div>
  <div class="report-goal-title-row">
    <div>
      <h3>${esc(g.title)}</h3>
      ${g.cadence ? `<p>${esc(g.cadence)} · ${esc(TRACKING_LABEL[g.tracking] ?? g.tracking)}</p>` : ""}
      ${target}
    </div>
  </div>`;
}

const BUCKETS = [0, 25, 50, 75, 100];

function bucketPicker(g) {
  const buttons = BUCKETS.map((b) => {
    const active = g.pct !== null && g.pct !== undefined && g.pct === b;
    const bucket = b <= 0 ? "missed" : b >= 100 ? "kept" : "partial";
    return `<button type="button" class="${active ? "is-active" : ""}" data-bucket="${bucket}">${b}%</button>`;
  }).join("");
  return `
  <div class="report-bucket-picker">
    <div><span>Completion</span><small>${BUCKETS.map((b) => `${b}%`).join(" · ")}</small></div>
    <div>${buttons}</div>
    <p class="pv-help">Final score for this goal. Marks above are evidence only and do not set this value.</p>
  </div>`;
}

function evidence(marks) {
  if (!marks) return "";
  const LABEL = { done: "Done", skip: "Skipped", missed: "Missed" };
  const items = marks
    .map(
      (m) => `
      <div class="goal-mark-evidence-item">
        <div class="goal-mark-evidence-meta"><span>${esc(m.date)}</span><strong data-status="${m.status}">${LABEL[m.status] ?? esc(m.status)}</strong></div>
        ${m.note ? `<p class="goal-mark-evidence-note">${esc(m.note)}</p>` : `<p class="goal-mark-evidence-note is-empty">No note attached.</p>`}
      </div>`,
    )
    .join("");
  return `
  <div class="goal-mark-evidence">
    <div class="goal-mark-evidence-head">
      <div><p>Evidence from marks</p><h4>Recorded during this cycle</h4></div>
      <span>${marks.length} mark${marks.length === 1 ? "" : "s"}</span>
    </div>
    <p class="goal-mark-evidence-copy">Read-only context for the write-up. Your report score stays separate from these marks.</p>
    <div class="goal-mark-evidence-list">${items}</div>
  </div>`;
}

function writeup(g, caret) {
  const words = g.note ? g.note.trim().split(/\s+/).length : 0;
  return `
  <label class="field report-writeup pv-writeup">
    <span class="report-writeup-label"><span>What happened <strong>· Required</strong></span><small class="report-writeup-count">${words ? `${words} words` : "—"}</small></span>
    <div class="pv-field-textarea">${g.note ? esc(g.note) : `<span class="pv-placeholder">One or two sentences. What went right or wrong with this goal this month?</span>`}${caret ? `<i class="pv-caret"></i>` : ""}</div>
  </label>`;
}

// One goal being scored: status, evidence from marks, completion picker, write-up.
const reportGoal = {
  defaults: { device: true, scale: 2 },
  render(d) {
    return `
<article class="report-goal-row pv-report-goal">
  ${reportGoalHead(d)}
  ${evidence(d.marks)}
  ${bucketPicker(d)}
  ${writeup(d, d.caret)}
</article>`;
  },
};

// The whole close: masthead + tally, goal list with scores, live sidebar, submit panel.
const reportClose = {
  defaults: { device: false, scale: 1 },
  render(d) {
    const rows = d.goals.map((g) => `<article class="report-goal-row">${reportGoalHead(g)}</article>`).join("");
    const ready = d.ready !== false;
    return `
<div class="pv-report">
  <section class="report-compose-mast">
    <div>
      <p class="hk">${esc(d.cycleTitle)} · Closed · ${esc(d.dates)} · ${esc(d.stake)} stake</p>
      <h2>Write the <em>report</em>.</h2>
      ${d.lede === false ? "" : `<p>Score each goal and write what happened. This is the formal cycle-close declaration, separate from mid-cycle marks.</p>`}
    </div>
    ${d.mastTally === false ? "" : `<dl class="report-compose-tally">
      <div><dt>Kept</dt><dd>${esc(d.kept)}/${esc(d.goals.length)}</dd></div>
      <div><dt>Forfeit</dt><dd>${esc(d.forfeit)}</dd></div>
      <div><dt>No report</dt><dd>${esc(d.noReport ?? 0)}</dd></div>
    </dl>`}
  </section>
  <section class="report-compose-body">
    <div class="report-compose-grid">
      <div class="report-compose-main">
        <div class="pv-rows">${rows}</div>
        <div class="report-submit-panel">
          <div>
            <p class="hk">${ready ? "Ready to file" : "Not ready to file"}</p>
            <p class="report-submit-panel-title">${esc(d.kept)} of ${d.goals.length} kept · ${ready ? "forfeit" : "projected forfeit"} of <em>${esc(d.forfeit)}</em></p>
            <p>${ready ? `${d.goals.length}/${d.goals.length} rows ready. Filed reports cannot be edited here. The forfeited amount pools into the group kitty under the current cycle rules.` : `${esc(d.rowsReady ?? 0)}/${d.goals.length} rows ready. Complete the required fields before filing this report.`}</p>
          </div>
          <div class="report-submit-panel-actions"><button type="button" class="btn btn-primary"${ready ? "" : " disabled"}>${ready ? "Submit report" : "Review required fields"}</button></div>
        </div>
      </div>
      <aside class="report-compose-sidebar">
        <div class="report-compose-sidebar-inner">
          <div class="report-section-head"><p>Tally · live</p><h3>As you mark</h3></div>
          <dl class="report-compose-sidebar-stats">
            <div><dt>Kept</dt><dd>${esc(d.kept)}/${d.goals.length}</dd></div>
            <div><dt>Forfeit</dt><dd>${esc(d.forfeit)}</dd></div>
            <div><dt>Returned</dt><dd>${esc(d.returned)}</dd></div>
          </dl>
          <div class="report-forfeit-note"><p>The forfeit</p><span>${esc(d.stake)} staked · ${esc(d.forfeit)} forfeit · ${esc(d.returned)} kept.</span></div>
        </div>
      </aside>
    </div>
  </section>
</div>`;
  },
};

// The full report page as one column, for mobile captures (layout: "mobile").
// Everything a member scrolls through, in app order: masthead + tally, "Set the
// frame" subject, each goal row (status, evidence, completion, write-up,
// proof), the reflection, and the file panel. Anchors (#pv-mast,
// #pv-subject, #pv-goal-0.., #pv-picker-0.., #pv-reflection, #pv-submit) are
// what a spec's `crop.anchor` points at.
const reportPage = {
  defaults: { device: false, scale: 1 },
  render(d) {
    const ready = d.ready !== false;
    const rows = d.goals
      .map(
        (g, i) => `
<article class="report-goal-row" id="pv-goal-${i}">
  ${reportGoalHead(g)}
  ${evidence(g.marks)}
  <div id="pv-picker-${i}">${bucketPicker(g)}</div>
  ${writeup(g, g.caret)}
  <div class="report-proof-field pv-mt3"><div class="report-proof-actions">
    <label class="report-proof-button"><span>+ Attach proof</span></label>
    <span>Optional · photo, link, or text witness</span>
  </div></div>
</article>`,
      )
      .join("");
    const words = d.reflection ? d.reflection.trim().split(/\s+/).length : 0;
    return `
<div class="report-compose-shell pv-stack">
  <section class="report-compose-mast" id="pv-mast">
    <div>
      <p class="hk">${esc(d.cycleTitle)} · Closed · ${esc(d.dates)} · ${esc(d.stake)} stake</p>
      <h2>Write the <em>report</em>.</h2>
      <p>Score each goal and write what happened. This is the formal cycle-close declaration, separate from mid-cycle marks.</p>
    </div>
    <dl class="report-compose-tally">
      <div><dt>Kept</dt><dd>${esc(d.kept)}/${d.goals.length}</dd></div>
      <div><dt>Forfeit</dt><dd>${esc(d.forfeit)}</dd></div>
      <div><dt>No report</dt><dd>${esc(d.noReport ?? 0)}</dd></div>
    </dl>
  </section>
  <section class="report-compose-body">
    <div class="report-compose-grid"><div class="report-compose-main">
      <section class="report-compose-section" id="pv-subject">
        <div class="report-section-head"><p>The subject</p><h3>Set the frame</h3></div>
        <p class="report-compose-help">In one sentence, what was this cycle about? This becomes the headline on your filed report.</p>
        <label class="field report-subject-field"><div class="pv-input">${d.subject ? esc(d.subject) : `<span class="pv-placeholder">One sentence. A title for the month.</span>`}</div></label>
        <p class="report-compose-hint">Keep it short. You can rewrite it before you file.</p>
      </section>
      <div class="pv-stack">${rows}</div>
      <section class="report-compose-section report-reflection-section" id="pv-reflection">
        <div class="report-section-head"><p>The reflection</p><h3>What happened</h3></div>
        <div class="pv-reflection">${d.reflection ? esc(d.reflection) : `<span class="pv-placeholder">What worked. What didn't. What you're carrying into the next cycle.</span>`}</div>
        <p class="report-compose-hint">${words ? `${words} words` : "—"}</p>
      </section>
      <div class="report-submit-panel" id="pv-submit">
        <div>
          <p class="hk">${ready ? "Ready to file" : "Not ready to file"}</p>
          <p class="report-submit-panel-title">${esc(d.kept)} of ${d.goals.length} kept · ${ready ? "forfeit" : "projected forfeit"} of <em>${esc(d.forfeit)}</em></p>
          <p>${ready ? `${d.goals.length}/${d.goals.length} rows ready. Filed reports cannot be edited here. The forfeited amount pools into the group kitty under the current cycle rules.` : `${esc(d.rowsReady ?? 0)}/${d.goals.length} rows ready. Complete the required fields before filing this report.`}</p>
        </div>
        <div class="report-submit-panel-actions"><button type="button" class="btn btn-primary"${ready ? "" : " disabled"}>${ready ? "Submit report" : "Review required fields"}</button></div>
      </div>
    </div></div>
  </section>
</div>`;
  },
};

module.exports = {
  "report-page": reportPage,
  "mark-sheet": markSheet,
  "week-board": weekBoard,
  "goal-detail": goalDetail,
  "report-goal": reportGoal,
  "report-close": reportClose,
};
