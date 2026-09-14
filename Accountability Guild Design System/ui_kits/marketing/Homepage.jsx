import React, { useState } from "react";

const cycleStats = [["3d 14h", "time remaining"], ["11 / 14", "reports submitted"], ["$320", "in the group kitty"], ["82%", "follow-through rate"]];
const commitments = [
  { who: "Brandon W.", goal: "Lift three times", status: "3 of 3", state: "done" },
  { who: "Lee L.", goal: "Write daily, 500 words", status: "5 of 7", state: "mid" },
  { who: "Mara K.", goal: "45 sales calls", status: "38 of 45", state: "mid" },
  { who: "Eitan R.", goal: "No alcohol", status: "forfeit · $20", state: "forfeit" },
];
const acts = [
  { number: "01", title: "Set the standard", sub: "Once, at the start", body: "An owner names the group's cycle, the cadence, the consequence. Members put a card on file and write their own commitments, measurable and in their own voice.", sample: "Cadence · Weekly. Forfeit · $20 per missed report. Hall-pass · 1 per cycle." },
  { number: "02", title: "Run the cycle", sub: "Every day, briefly", body: "Members log against their goals as they go. A note. A photograph. A tally. The group sees activity, not pressure: small signals that the work is happening.", sample: "Brandon · 45 of 45 calls · attached: spreadsheet.png · 14 minutes ago" },
  { number: "03", title: "Close with receipts", sub: "At cycle close", body: "Each member writes a short report against their own commitments. Misses are tallied. Forfeits are charged automatically and pooled into the group kitty.", sample: "$60 forfeited · 11 of 14 met fully · cycle closed 9:00 PM CT." },
  { number: "04", title: "Pool the forfeits", sub: "Disburse when ready", body: "Each cycle's forfeits roll into a running group kitty. Most groups let it accrue and settle a few times a year, according to the policy agreed to at the start.", sample: "Cycle 18 · +$60 to kitty · running balance $440 · next disbursement: Q2." },
];
const mechanics = [
  ["Structured proof entries", "Each goal carries its own cadence. Daily, weekly, or by the end of the cycle. The app collects without nagging."],
  ["Forfeits stay in the group", "Members put a card on file. Misses charge automatically at close, and the money goes into a group kitty, not to us."],
  ["Recovery prompts", "If someone's slipping mid-cycle, the group sees it gently: not a shame screen, a small signal that wakes a thread."],
  ["Receipts, not promises", "A cycle closes with a written report and proof of work. The next cycle starts from receipts, not retold intentions."],
  ["Hall-pass, optional", "Real life happens. Toggle one or two skip-sick days per cycle. The group decides whether it's forgiving or strict."],
  ["Group visibility", "A shared feed of activity replaces the back-channel how-is-everyone-doing thread that no one wants to write."],
];
const kittyOptions = [
  ["01", "Redistribute", "Some competitive groups choose to pay out their top performers when the kitty disburses. Owners set the rule; the group agrees to it on the way in.", "Top 2 finishers · paid at Q2 close"],
  ["02", "Reinvest", "Reimburse a member for the yearly retreat, the offsite dinner, the shared subscription. The kitty pays for the room.", "Annual retreat · Mara · $480"],
  ["03", "Donate", "Pick a charity together at the start. Misses fund it automatically. Failure becomes someone else's good week.", "Modest Needs · Q2 · $1,180"],
];

export function Homepage({ ds }) {
  const { Wordmark, Button } = ds;
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="hp-shell">
      <header className="hp-nav">
        <div className="hp-masthead">
          <span>Vol. 01 · Cycle Infrastructure</span>
          <span>Established 2026 · Members only</span>
          <span>accountabilityguild.com</span>
        </div>
        <div className="hp-nav-main">
          <Wordmark scale={0.95} />
          <nav className="hp-nav-links">
            <a href="#how">How it works</a>
            <a href="#modes">For groups</a>
            <a href="#pricing">Pricing</a>
            <a href="#field">Resources</a>
          </nav>
          <div className="hp-nav-actions">
            <a href="#login">Log in</a>
            <Button size="sm" onClick={() => setShowSignup(true)}>Start a Cycle</Button>
          </div>
        </div>
      </header>

      <section className="hp-hero">
        <div className="hp-hero-copy">
          <p className="hp-eyebrow">Cycle Infrastructure, Vol. 01</p>
          <h1>Follow-through, <em>made visible</em>.</h1>
          <p>A deliberate piece of software for accountability groups that meet on a cycle. Set the standard, run the cycle, close it with receipts.</p>
          <div className="hp-hero-actions">
            <Button arrow onClick={() => setShowSignup(true)}>Start a Cycle</Button>
            <Button variant="secondary">How it works</Button>
          </div>
          <dl className="hp-hero-stats">
            {cycleStats.map(([v, l]) => (<div key={l}><dt>{l}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
        <div className="hp-live-cycle">
          <div className="hp-live-cycle-top">
            <p><span className="hp-live-dot" />Live cycle</p>
            <span>Legacy Group</span>
          </div>
          <dl className="hp-stat-grid">
            <div><dt>Days left</dt><dd>3d 14h</dd></div>
            <div><dt>Reports in</dt><dd>11/14</dd></div>
            <div><dt>Kitty</dt><dd>$320</dd></div>
            <div><dt>Follow-through</dt><dd>82%</dd></div>
          </dl>
          <div className="hp-commitments">
            <p className="hp-eyebrow">This week's commitments</p>
            {commitments.map((c) => (
              <div className="hp-commitment-row" key={c.who}>
                <span>{c.who.slice(0, 1)}</span>
                <p><strong>{c.who}</strong><em>{c.goal}</em></p>
                <b data-state={c.state}>{c.status}</b>
              </div>
            ))}
          </div>
          <p className="hp-live-caption">Updated automatically as members log against their goals.</p>
        </div>
      </section>

      <section className="hp-section" id="how">
        <div className="hp-section-head">
          <div><p className="hp-eyebrow">How it works</p><h2>Four acts, one <em>cycle</em>.</h2></div>
          <p className="hp-section-note">No streaks. No pressure screens. Just the standard, the proof, and the receipts.</p>
        </div>
        <div className="hp-acts">
          {acts.map((a) => (
            <article key={a.number}>
              <div><span>{a.number}</span><div><h3>{a.title}</h3><p>{a.sub}</p></div></div>
              <p>{a.body}</p>
              <small>{a.sample}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="hp-pullquote">
        <p className="hp-eyebrow">Why it holds</p>
        <blockquote>Structure beats motivation. The smallest cycle that <em>holds</em> beats the biggest goal that doesn't.</blockquote>
      </section>

      <section className="hp-mechanics">
        {mechanics.map(([t, b]) => (
          <article key={t}><p>MECHANIC</p><h3>{t}</h3><span>{b}</span></article>
        ))}
      </section>

      <section className="hp-modes" id="modes">
        <p className="hp-eyebrow">For groups</p>
        <h2>Two modes, one <em>infrastructure</em>.</h2>
        <div className="hp-mode-grid">
          <article>
            <p className="hp-eyebrow">Solo cycle</p>
            <h3>Run it yourself, still with receipts.</h3>
            <p>A single member on their own cycle — same standard, same proof, same close-out report. No group required to start.</p>
            <blockquote>"I needed the structure more than I needed an audience."</blockquote>
          </article>
          <article>
            <p className="hp-eyebrow">Group cycle</p>
            <h3>Everyone on the same clock.</h3>
            <p>Shared cadence, shared kitty, shared close. The group sees each other's activity feed without a back-channel thread.</p>
            <ul><li>Shared kitty</li><li>Group feed</li><li>Owner-set policy</li><li>Member reports</li></ul>
          </article>
        </div>
      </section>

      <section className="hp-kitty">
        <div className="hp-kitty-head">
          <div><p className="hp-eyebrow">The group kitty</p><h2>Where forfeits go</h2></div>
          <p>Every miss charges the card on file. The money never comes to us — it pools into the group's own account, disbursed on the group's own terms.</p>
        </div>
        <div className="hp-kitty-options">
          {kittyOptions.map(([n, t, b, s]) => (
            <article key={n}><p><span>{n}</span><em>{t}</em></p><span>{b}</span><small>{s}</small></article>
          ))}
        </div>
        <div className="hp-kitty-footer"><span>Cycle 18 · running balance $440</span><span>Next disbursement · Q2</span></div>
      </section>

      <footer className="hp-footer" style={{ padding: "48px clamp(22px,5.2vw,88px)", borderTop: "1px solid var(--line)" }}>
        <Wordmark variant="stacked" kicker="Vol. 01" />
      </footer>

      {showSignup && (
        <div className="modal-overlay is-open" onClick={() => setShowSignup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head"><div className="kicker">Get started</div><h3>Start your first <em>cycle</em>.</h3></div>
            <div className="modal-body">Create an account, name your standard, and invite your group — or run it solo.</div>
            <div className="modal-foot"><Button variant="ghost" onClick={() => setShowSignup(false)}>Not now</Button><Button>Continue</Button></div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Homepage = Homepage;
