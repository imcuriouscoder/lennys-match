// Lenny Match — Quote Card (front, before reaction)

const CardA = () => (
  <Phone label="A · Vertical stack, buttons below">
    <ProgressBar pct={20} label="Quote 3 of 15" />
    <div className="wf-card" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
      <Tag kind="hot">🔥 Hot Take · spice 4/5</Tag>
      <div className="wf-quote" style={{ marginTop: 4 }}>
        "Most product roadmaps are organized cowardice. You're scheduling the obvious."
      </div>
      <div style={{ flex: 1 }}></div>
      <hr className="wf-line-dashed" />
      <div className="wf-small wf-center">15-yr CPO at consumer marketplace</div>
      <div className="wf-tiny wf-center">identity revealed after you react</div>
    </div>
    <div className="wf-row" style={{ justifyContent: "space-between" }}>
      <div className="wf-col" style={{ alignItems: "center", gap: 4 }}>
        <Btn className="wf-btn-circle">🔪</Btn>
        <span className="wf-tiny">Reject</span>
      </div>
      <div className="wf-col" style={{ alignItems: "center", gap: 4 }}>
        <Btn className="wf-btn-circle">🤝</Btn>
        <span className="wf-tiny">Reasonable</span>
      </div>
      <div className="wf-col" style={{ alignItems: "center", gap: 4 }}>
        <Btn className="wf-btn-circle">❤️</Btn>
        <span className="wf-tiny">Love</span>
      </div>
    </div>
    <Note style={{ top: 90, right: 0, transform: "rotate(2deg)" }}>archetype tag = color anchor</Note>
  </Phone>
);

const CardB = () => (
  <Phone label="B · Tinder-style, swipe gestures">
    <ProgressBar pct={26} label="03 / 15" />

    <div className="wf-flip-stack" style={{ flex: 1 }}>
      <div className="wf-flip-card wf-flip-back" style={{ width: "86%" }}>
        <div className="wf-tiny">next up...</div>
      </div>
      <div className="wf-flip-card wf-flip-front" style={{ width: "92%", padding: 16 }}>
        <Tag kind="frame">🧠 Framework</Tag>
        <div className="wf-quote" style={{ marginTop: 8 }}>
          "Find the wedge before you build the platform. Wedges find users; platforms wait for them."
        </div>
        <hr className="wf-line-dashed" style={{ marginTop: 14 }}/>
        <div className="wf-small">Ex-VP Product, 2x founder, B2B fintech</div>
      </div>
      <Arrow style={{ left: -4, top: "45%" }}>← reject</Arrow>
      <Arrow style={{ right: -4, top: "45%" }}>love →</Arrow>
      <Arrow style={{ bottom: -2, left: "40%" }}>↓ reasonable</Arrow>
    </div>

    <div className="wf-spread">
      <Btn className="wf-btn-circle">🔪</Btn>
      <Btn className="wf-btn-circle" style={{ width: 64, height: 64, fontSize: 24 }}>🤝</Btn>
      <Btn className="wf-btn-circle">❤️</Btn>
    </div>
    <div className="wf-meta wf-center">tap or swipe</div>
    <Note style={{ top: 50, right: 0 }}>card back hint = "more coming"</Note>
  </Phone>
);

const CardC = () => (
  <Phone label="C · Color-strip + chips, dense">
    <div className="wf-spread">
      <span className="wf-meta">QUOTE 3/15</span>
      <span className="wf-meta">⏸ pause</span>
    </div>
    <div className="wf-grid-6" style={{ gap: 4 }}>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
        <div key={i} style={{
          height: 6,
          border: "1.2px solid var(--line)",
          borderRadius: 2,
          background: i < 2 ? "var(--line)" : "transparent"
        }}></div>
      ))}
    </div>

    <div className="wf-card" style={{ flex: 1, padding: 0, overflow: "hidden", display: "flex" }}>
      <div style={{ width: 8, background: "var(--anti)", flexShrink: 0 }}></div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div className="wf-row" style={{ flexWrap: "wrap", gap: 6 }}>
          <Tag kind="anti">⚠️ Anti-Tactic</Tag>
          <Tag>🌶 spice 3</Tag>
        </div>
        <div className="wf-quote-sm">
          "We A/B tested onboarding for 6 months. We should have killed it in 2 weeks and rebuilt it."
        </div>
        <div style={{ flex: 1 }}></div>
        <hr className="wf-line-dashed" />
        <div className="wf-meta">▌ Operator turned investor · seed-stage SaaS</div>
      </div>
    </div>

    <div className="wf-row" style={{ gap: 6 }}>
      <Btn block style={{ borderColor: "var(--reject)" }}>🔪 Reject</Btn>
      <Btn block>🤝 Meh</Btn>
      <Btn block style={{ borderColor: "var(--love)", color: "var(--love)" }}>❤️ Love</Btn>
    </div>
    <Note style={{ top: 110, left: 0, transform: "rotate(-3deg)" }}>archetype = strip color</Note>
  </Phone>
);

Object.assign(window, { CardA, CardB, CardC });
