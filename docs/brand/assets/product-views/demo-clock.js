/* Accountability Guild: demo clock.
 *
 * One place that turns "relative" sample dates into real ones, so product
 * images and the homepage mockup always show the current week instead of a
 * date someone typed months ago. Works in Node (render.js) and in the browser
 * (homepage HTML, as window.AGDemoClock). No dependencies.
 *
 * Every date is an offset in days from "today" (0 = today, -2 = two days ago).
 *
 *   const clock = createClock({ today: "2026-11-03" });   // omit today = the real date
 *   clock.fmt(-8)                 // "Oct 26"
 *   clock.fmt(0, "DOWMD")         // "TUE, NOV 3"
 *   clock.range(-4, 2)            // "Oct 30–Nov 5"
 *   clock.expand(spec)            // fills {{tokens}} and $days blocks anywhere in an object
 *
 * Tokens (inside any string):
 *   {{d:OFFSET}}  or  {{d:OFFSET|FORMAT}}   a date, e.g. {{d:-8}} → "Oct 26"
 *   {{d:NAME|FORMAT}}                        a named date from the cycle (see below)
 *   {{range:FROM:TO}}                        "Oct 30–Nov 5", "Nov 2–8"
 *   {{n:NAME}}                               a number or word from the cycle
 *
 * Formats: md "Oct 26" (default) · dowmd "Mon, Oct 26" · DOWMD "MON, OCT 26"
 *   dow "Mon" · DOW "MON" · dow2 "Mo" · day "Monday" · dom "26" · month "October"
 *   mdy "Oct 26, 2026" · iso "2026-10-26"
 *
 * $days block: { "$days": { "from": -4, "count": 7 } } becomes the week-board
 * day list: [{ dow: "Th", dom: 29 }, ..., { dow: "Mo", dom: 2, today: true }, ...].
 * The scene's cell patterns are positional, so "today" always sits in the same
 * column whatever weekday it is.
 *
 * Cycle (optional), two rules:
 *   { meets: "Thu", weeks: 4, minDaysLeft: 5 }  every 4 weeks; the closing
 *     meeting is always at least 5 days out, so the cycle looks well underway.
 *   { meets: "Thu", rule: "first" }  first Thursday of every month (the real
 *     calendar, so it can close tomorrow; use {{n:closesIn}} for the wording).
 * Gives you:
 *   dates  start (meeting that opened it), end (day before the close), close
 *          (the closing meeting), next, nextEnd (the cycle after), weekStart
 *   values daysLeft, closesIn, day, length (days), week, weeks, month (the
 *          month the cycle started in: "the October cycle")
 *
 * Time zone: the default "today" is the local date where the code runs (the
 * visitor's date in a browser). Pass { tz: "America/Chicago" } to pin a zone,
 * or { today: "YYYY-MM-DD" } to reproduce an image exactly.
 */
(function (root) {
  "use strict";
  const DAY = 86400000;
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Dates are UTC midnights, so day arithmetic never trips on DST.
  function ymd(y, m, d) { return new Date(Date.UTC(y, m - 1, d)); }

  function todayIn(tz) {
    const now = new Date();
    if (!tz) return ymd(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const parts = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
    const [y, m, d] = parts.split("-").map(Number);
    return ymd(y, m, d);
  }

  function parseToday(v, tz) {
    if (!v) return todayIn(tz);
    if (v instanceof Date) return ymd(v.getUTCFullYear(), v.getUTCMonth() + 1, v.getUTCDate());
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v));
    if (!m) throw new Error(`demo-clock: today must be YYYY-MM-DD, got "${v}"`);
    return ymd(+m[1], +m[2], +m[3]);
  }

  function format(date, fmt) {
    const mon = MONTHS[date.getUTCMonth()];
    const m3 = mon.slice(0, 3);
    const dayName = DAYS[date.getUTCDay()];
    const d3 = dayName.slice(0, 3);
    const dom = date.getUTCDate();
    switch (fmt || "md") {
      case "md": return `${m3} ${dom}`;
      case "dowmd": return `${d3}, ${m3} ${dom}`;
      case "DOWMD": return `${d3}, ${m3} ${dom}`.toUpperCase();
      case "dow": return d3;
      case "DOW": return d3.toUpperCase();
      case "dow2": return dayName.slice(0, 2);
      case "day": return dayName;
      case "dom": return String(dom);
      case "month": return mon;
      case "mdy": return `${m3} ${dom}, ${date.getUTCFullYear()}`;
      case "iso": return date.toISOString().slice(0, 10);
      default: throw new Error(`demo-clock: unknown format "${fmt}"`);
    }
  }

  const WEEKDAY = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

  // Two cycle rules:
  //   "every" (default): meets on a weekday every `weeks` weeks; picks the next
  //     meeting at least minDaysLeft away, so the cycle is always well underway.
  //   "first": meets on the first <weekday> of each month (Brandon's group). This
  //     is the real calendar, so daysLeft runs 1 to 35 (the meeting day opens the
  //     next cycle); use {{n:closesIn}} for
  //     "closes tomorrow" / "closes in 9 days".
  function firstWeekdayOf(y, m0, wd) {
    const d = new Date(Date.UTC(y, m0, 1));
    return new Date(d.getTime() + ((wd - d.getUTCDay() + 7) % 7) * DAY);
  }

  function buildCycle(today, cfg) {
    const target = WEEKDAY[String(cfg.meets || "thu").slice(0, 3).toLowerCase()];
    if (target === undefined) throw new Error(`demo-clock: cycle.meets "${cfg.meets}" is not a weekday`);
    let start, close, next;
    if (cfg.rule === "first") {
      const y = today.getUTCFullYear(), m = today.getUTCMonth();
      close = firstWeekdayOf(y, m, target);
      if (close <= today) close = firstWeekdayOf(y, m + 1, target);
      start = firstWeekdayOf(close.getUTCFullYear(), close.getUTCMonth() - 1, target);
      next = firstWeekdayOf(close.getUTCFullYear(), close.getUTCMonth() + 1, target);
    } else {
      const weeks = cfg.weeks || 4;
      const minLeft = cfg.minDaysLeft == null ? 5 : cfg.minDaysLeft;
      let left = (target - today.getUTCDay() + 7) % 7;
      while (left < minLeft) left += 7;
      close = new Date(today.getTime() + left * DAY);
      start = new Date(close.getTime() - weeks * 7 * DAY);
      next = new Date(close.getTime() + weeks * 7 * DAY);
    }
    const length = Math.round((close - start) / DAY);
    const elapsed = Math.round((today - start) / DAY);
    const daysLeft = Math.round((close - today) / DAY);
    return {
      // start = the meeting that opened this cycle; end = the day before the
      // closing meeting; close = the closing meeting; next/nextEnd = the cycle after.
      dates: { start, end: new Date(close.getTime() - DAY), close, next, nextEnd: new Date(next.getTime() - DAY), weekStart: new Date(start.getTime() + Math.floor(elapsed / 7) * 7 * DAY) },
      values: {
        daysLeft,
        closesIn: daysLeft === 0 ? "closes today" : daysLeft === 1 ? "closes tomorrow" : `closes in ${daysLeft} days`,
        day: elapsed + 1,
        length,
        week: Math.floor(elapsed / 7) + 1,
        weeks: Math.ceil(length / 7),
        // A cycle is named for the month it starts in ("the October cycle").
        month: MONTHS[start.getUTCMonth()],
      },
    };
  }

  function createClock(opts) {
    opts = opts || {};
    const today = parseToday(opts.today, opts.tz);
    const cycle = opts.cycle ? buildCycle(today, opts.cycle) : null;

    const day = (offset) => new Date(today.getTime() + offset * DAY);
    const resolve = (ref) => {
      if (/^[+-]?\d+$/.test(ref)) return day(Number(ref));
      if (ref === "today") return today;
      if (cycle && cycle.dates[ref]) return cycle.dates[ref];
      throw new Error(`demo-clock: unknown date "${ref}"${cycle ? "" : " (no cycle configured)"}`);
    };
    const fmt = (ref, f) => format(typeof ref === "number" ? day(ref) : resolve(String(ref)), f);
    const range = (from, to) => {
      const a = resolve(String(from)), b = resolve(String(to));
      const sameMonth = a.getUTCMonth() === b.getUTCMonth();
      return sameMonth ? `${format(a, "md")}–${b.getUTCDate()}` : `${format(a, "md")}–${format(b, "md")}`;
    };
    const days = ({ from, count }) => Array.from({ length: count }, (_, i) => {
      const off = from + i;
      const entry = { dow: format(day(off), "dow2"), dom: day(off).getUTCDate() };
      if (off === 0) entry.today = true;
      return entry;
    });
    const value = (name) => {
      if (!cycle || !(name in cycle.values)) throw new Error(`demo-clock: unknown value "${name}"`);
      return cycle.values[name];
    };

    const TOKEN = /\{\{\s*(d|range|n)\s*:\s*([^}|]+?)\s*(?:\|\s*([A-Za-z0-9]+)\s*)?\}\}/g;
    const expandString = (s) => s.replace(TOKEN, (_, kind, arg, f) => {
      if (kind === "d") return fmt(arg.trim(), f);
      if (kind === "range") { const [a, b] = arg.split(":"); return range(a.trim(), b.trim()); }
      return String(value(arg.trim()));
    });
    const expand = (node) => {
      if (typeof node === "string") {
        // A string that is only {{n:...}} keeps the number type.
        const only = /^\{\{\s*n\s*:\s*([A-Za-z]+)\s*\}\}$/.exec(node);
        return only && typeof value(only[1]) === "number" ? value(only[1]) : expandString(node);
      }
      if (Array.isArray(node)) return node.map(expand);
      if (node && typeof node === "object") {
        if (node.$days) return days(node.$days);
        const out = {};
        for (const [k, v] of Object.entries(node)) out[k] = expand(v);
        return out;
      }
      return node;
    };

    return { today, iso: format(today, "iso"), day, fmt, range, days, value, cycle, expand };
  }

  // For a render spec: reads its optional "clock" block ({ today, tz, cycle })
  // and fills every token. `override` (e.g. --today from the CLI) wins.
  function applyToSpec(spec, override) {
    const cfg = Object.assign({}, spec.clock || {}, override || {});
    const clock = createClock(cfg);
    const out = clock.expand(Object.fromEntries(Object.entries(spec).filter(([k]) => k !== "clock")));
    out.clock = Object.assign({}, spec.clock || {}, { resolvedToday: clock.iso });
    return out;
  }

  const api = { createClock, applyToSpec, format };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AGDemoClock = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
