// Lenny Match — Intro / Landing wireframes (3 variations)

const IntroA = () => (
  <Phone label="A · Editorial cold-open">
    <div className="wf-spread">
      <span className="wf-meta">Lenny Match</span>
      <span className="wf-meta">v0.1</span>
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
      <span className="wf-meta">A 60-second taste game</span>
      <div className="wf-h1" style={{ fontSize: 38, lineHeight: 1 }}>
        How do you actually&nbsp;think&nbsp;about product?
      </div>
      <hr className="wf-line" />
      <div className="wf-small">15 quotes from people who build things. <br/>Love · Reasonable · Reject. <br/>Find your matches.</div>
    </div>
    <Btn big block>Start swiping →</Btn>
    <div className="wf-meta wf-center">No login. No tracking. ~60 sec.</div>
    <Note style={{ top: 60, right: 4, transform: "rotate(3deg)" }}>serif headline, lots of air</Note>
  </Phone>
);

const IntroB = () => (
  <Phone label="B · Stack-of-cards teaser">
    <div className="wf-spread">
      <span className="wf-meta">← back</span>
      <span className="wf-meta">about</span>
    </div>
    <div className="wf-center wf-h2" style={{ marginTop: 8 }}>Lenny Match</div>
    <div className="wf-center wf-small" style={{ marginTop: -6 }}>your product-thinking taste, in 15 cards</div>

    <div className="wf-flip-stack" style={{ height: 280 }}>
      <div className="wf-flip-card" style={{ transform: "rotate(-6deg) translate(-22px, 14px)", width: "70%" }}>
        <Tag kind="hot">🔥 hot take</Tag>
        <div className="wf-quote-sm" style={{ marginTop: 6 }}>"Most roadmaps are organized cowardice."</div>
      </div>
      <div className="wf-flip-card" style={{ transform: "rotate(2deg) translate(8px, -6px)", width: "72%" }}>
        <Tag kind="frame">🧠 framework</Tag>
        <div className="wf-quote-sm" style={{ marginTop: 6 }}>"Find the wedge before the platform."</div>
      </div>
      <div className="wf-flip-card wf-flip-front" style={{ transform: "rotate(-1deg)", width: "76%" }}>
        <Tag kind="tactic">🎯 tactic</Tag>
        <div className="wf-quote-sm" style={{ marginTop: 6 }}>"Ship the smallest thing that could embarrass you."</div>
        <div className="wf-tiny" style={{ marginTop: 8 }}>— anonymous, until you react</div>
      </div>
      <Arrow style={{ bottom: -4, left: 14 }}>swipe ←</Arrow>
      <Arrow style={{ bottom: -4, right: 14 }}>→ tap</Arrow>
    </div>

    <Btn big block>Tap top card to begin</Btn>
    <Note style={{ top: 200, right: 0, transform: "rotate(-3deg)" }}>preview real cards</Note>
  </Phone>
);

const IntroC = () => (
  <Phone label="C · Pick-your-mode entry">
    <div className="wf-meta wf-center">Lenny Match</div>
    <div className="wf-h1 wf-center" style={{ fontSize: 30, marginTop: 6 }}>Choose your tasting menu</div>

    <div className="wf-card" style={{ padding: 14 }}>
      <div className="wf-spread">
        <span className="wf-h3">Quickfire</span>
        <Pill>~60 sec</Pill>
      </div>
      <div className="wf-small">15 random quotes across all 6 archetypes.</div>
      <div className="wf-meta" style={{ marginTop: 6 }}>Default · best for first-time</div>
    </div>

    <div className="wf-box-rough" style={{ padding: 12 }}>
      <div className="wf-spread">
        <span className="wf-h3">Hot Takes only</span>
        <Pill>~90 sec</Pill>
      </div>
      <div className="wf-small">Bias toward spice 4-5. Find your contrarians.</div>
    </div>

    <div className="wf-box-rough-2" style={{ padding: 12 }}>
      <div className="wf-spread">
        <span className="wf-h3">Tacticians' tour</span>
        <Pill>~90 sec</Pill>
      </div>
      <div className="wf-small">Tactic + Anti-Tactic + War Story.</div>
    </div>

    <div style={{ flex: 1 }}></div>
    <Btn big block>Start Quickfire →</Btn>
    <Note style={{ top: 80, right: 6 }}>3 entry points, same engine</Note>
  </Phone>
);

Object.assign(window, { IntroA, IntroB, IntroC });
