// Lenny Match — Reveal (after react, identity unlocked)

const RevealA = () => (
  <Phone label="A · Card flips in place">
    <ProgressBar pct={26} label="Quote 3 of 15" />

    <div className="wf-card" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
      <div className="wf-stamp">REVEALED</div>
      <Tag kind="hot">🔥 Hot Take</Tag>
      <div className="wf-quote-sm" style={{ color: "var(--ink-soft)" }}>
        "Most product roadmaps are organized cowardice."
      </div>
      <hr className="wf-line" />

      <div className="wf-meta">— GUEST —</div>
      <div className="wf-h2" style={{ marginTop: -2 }}>Jane Doe</div>
      <div className="wf-small">15-yr CPO · consumer marketplace</div>

      <hr className="wf-line-dashed" />
      <div className="wf-meta">— EPISODE —</div>
      <div className="wf-h3">Roadmaps & courage · Ep. 142</div>

      <div style={{ flex: 1 }}></div>
      <Btn block style={{ background: "var(--paper-warm)" }}>🎧 Listen on Spotify →</Btn>
      <div className="wf-meta wf-center">advancing in 1.5s · tap to skip</div>
    </div>
    <Note style={{ top: 70, right: 0, transform: "rotate(3deg)" }}>flip animation = key delight</Note>
    <Arrow style={{ top: 72, left: -16 }}>↻ flips</Arrow>
  </Phone>
);

const RevealB = () => (
  <Phone label="B · Bottom-sheet rises over card">
    <ProgressBar pct={26} label="Quote 3 of 15" />
    <div className="wf-card" style={{ flex: 1, opacity: .55, display: "flex", flexDirection: "column", gap: 8 }}>
      <Tag kind="hot">🔥 Hot Take</Tag>
      <div className="wf-quote-sm">
        "Most product roadmaps are organized cowardice."
      </div>
      <div className="wf-small">15-yr CPO · consumer marketplace</div>
    </div>

    <div className="wf-box-rough" style={{
      background: "var(--paper-warm)",
      padding: 14,
      marginTop: -80,
      boxShadow: "3px -3px 0 0 var(--line)",
      borderRadius: "18px 18px 0 0",
      position: "relative",
      zIndex: 2
    }}>
      <div style={{
        width: 36, height: 4, background: "var(--ink)",
        borderRadius: 2, margin: "0 auto 8px"
      }}></div>
      <div className="wf-meta">YOU REACTED ❤️</div>
      <div className="wf-h3" style={{ marginTop: 4 }}>Jane Doe</div>
      <div className="wf-small">on "Roadmaps & courage" · Ep. 142</div>
      <div className="wf-row" style={{ marginTop: 10, gap: 6 }}>
        <Btn block>🎧 Spotify</Btn>
        <Btn block>🔗 Copy link</Btn>
      </div>
      <div className="wf-meta wf-center" style={{ marginTop: 6 }}>swipe up · next quote</div>
    </div>
    <Note style={{ top: 110, left: 0 }}>card stays, sheet rises</Note>
  </Phone>
);

const RevealC = () => (
  <Phone label="C · Side-flip, both halves visible">
    <ProgressBar pct={26} label="Quote 3 of 15" />
    <div className="wf-row" style={{ flex: 1, gap: 4, alignItems: "stretch" }}>
      <div className="wf-card" style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <Tag kind="hot">🔥</Tag>
        <div className="wf-quote-sm" style={{ fontSize: 16 }}>
          "Roadmaps are organized cowardice."
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="wf-meta">QUOTE</div>
      </div>
      <div className="wf-card" style={{
        flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6,
        background: "var(--paper-warm)"
      }}>
        <div className="wf-meta">GUEST</div>
        <div className="wf-h3">Jane Doe</div>
        <div className="wf-small">15-yr CPO marketplace</div>
        <hr className="wf-line-dashed" />
        <div className="wf-meta">EPISODE</div>
        <div className="wf-small">Roadmaps & courage · #142</div>
        <div style={{ flex: 1 }}></div>
        <Btn block style={{ fontSize: 12, padding: "6px 8px" }}>🎧 Listen</Btn>
      </div>
    </div>
    <div className="wf-spread">
      <span className="wf-meta">YOU: ❤️ Love</span>
      <span className="wf-meta">next in 1.5s →</span>
    </div>
    <Note style={{ top: 60, right: 0, transform: "rotate(-3deg)" }}>compare-mode reveal</Note>
    <Arrow style={{ top: 110, left: "47%" }}>↔</Arrow>
  </Phone>
);

Object.assign(window, { RevealA, RevealB, RevealC });
