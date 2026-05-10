// Lenny Match — Results screen (3 variations)
// You ARE the card. The result is a single character card — no playlists,
// no episode lists, no match grids. Just identity + Power + 3 dim stats +
// short lore. Three directions on how to present it.

// 3 dimensions (the visible stats on the card — FIFA-style)
// each dimension rolls up 2 of the 6 archetypes shown below it.
const DIMS = [
  { key: "doer",     label: "DOER",      val: 64, blurb: "Tactic + Anti-Tactic",
    subs: [{ k: "tac",   label: "🎯 Tactic",     v: 70 },
           { k: "anti",  label: "⚠️ Anti-Tactic", v: 58 }] },
  { key: "thinker",  label: "THINKER",   val: 88, blurb: "Framework + Prediction",
    subs: [{ k: "frame", label: "🧠 Framework",  v: 92 },
           { k: "pred",  label: "🔮 Prediction", v: 84 }] },
  { key: "disruptor",label: "DISRUPTOR", val: 79, blurb: "Hot Take + War Story",
    subs: [{ k: "hot",   label: "🔥 Hot Take",   v: 86 },
           { k: "war",   label: "📖 War Story",  v: 72 }] },
];

// flat 6-archetype list (for the belt under the 3 dim stats)
const ARCH6 = DIMS.flatMap(d => d.subs.map(s => ({ ...s, dim: d.label })));

// the user's character (example: Heretic = Thinker dom · Disruptor sec)
const ME = {
  name:   "THE HERETIC",
  code:   "HRT",
  tagline:"Rejects the playbook. Loves the meta.",
  power:  82,
  lore:   "Mental models over recipes. You'd rather be wrong in an interesting way than right in a boring one.",
  dom:    "THINKER",
  sec:    "DISRUPTOR",
};

// the 7-card roster (for variant B's gallery)
const ROSTER = [
  { code: "PRG", name: "Pragmatist",   dom: "DOER",      sec: "THINKER"   },
  { code: "VET", name: "Veteran",      dom: "DOER",      sec: "DISRUPTOR" },
  { code: "ARC", name: "Architect",    dom: "THINKER",   sec: "DOER"      },
  { code: "HRT", name: "Heretic",      dom: "THINKER",   sec: "DISRUPTOR", me: true },
  { code: "MAV", name: "Maverick",     dom: "DISRUPTOR", sec: "DOER"      },
  { code: "PRV", name: "Provocateur",  dom: "DISRUPTOR", sec: "THINKER"   },
  { code: "GEN", name: "Generalist",   dom: "—",         sec: "balanced"  },
];

// ─────────────────────────────────────────────────────────────────────
// A · Hero-card portrait (My Hero Academia layout)
//   banner name, POWER orb top-right, 3 stat orbs down left rail,
//   big art, 3 dim bars, 2-sentence lore, code footer.
// ─────────────────────────────────────────────────────────────────────
const ResultsA = () => (
  <Phone label="A · Hero card · full portrait">
    <div className="wf-spread">
      <span className="wf-meta">Lenny Match · result</span>
      <span className="wf-meta">↻</span>
    </div>

    {/* THE CARD */}
    <div className="wf-card" style={{
      padding: 0, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column",
      borderWidth: 2.5, boxShadow: "4px 4px 0 0 var(--line)"
    }}>
      {/* name banner */}
      <div style={{
        borderBottom: "1.6px solid var(--line)",
        padding: "8px 14px",
        textAlign: "center",
        background: "var(--paper-warm)",
        position: "relative"
      }}>
        <div className="wf-h2" style={{ fontSize: 22, letterSpacing: ".04em" }}>{ME.name}</div>
        <div className="wf-tiny">"{ME.tagline}"</div>
        <Note style={{ top: -22, left: 4, transform: "rotate(-3deg)" }}>name + tagline only</Note>
      </div>

      {/* art + side rail */}
      <div style={{ display: "flex", gap: 6, padding: 8, flex: 1, position: "relative" }}>
        {/* left rail: 3 dim orbs */}
        <div className="wf-col" style={{ gap: 6, width: 44 }}>
          {DIMS.map(d => (
            <div key={d.key} className="wf-col" style={{ alignItems: "center", gap: 1 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1.8px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Special Elite, monospace", fontSize: 13, fontWeight: 700,
                background: d.label === ME.dom ? "var(--highlight)" : "var(--paper)"
              }}>{d.val}</div>
              <div className="wf-tiny" style={{ fontSize: 8 }}>{d.label.slice(0,3)}</div>
            </div>
          ))}
        </div>

        {/* art slot */}
        <Img style={{ flex: 1, minHeight: 200 }}>character art · anime · {ME.code}</Img>

        {/* power badge top-right */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 56, height: 56, borderRadius: "50%",
          border: "2px solid var(--line)",
          background: "var(--highlight)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "2px 2px 0 0 var(--line)",
          transform: "translate(8px,-8px) rotate(4deg)"
        }}>
          <div style={{ fontFamily: "Special Elite, monospace", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{ME.power}</div>
          <div className="wf-tiny" style={{ fontSize: 8 }}>POWER</div>
        </div>
        <Arrow style={{ top: 30, right: -6, transform: "rotate(-25deg)" }}>↖ decisiveness</Arrow>
      </div>

      {/* 3 dim bars (the visible stats) */}
      <div className="wf-col" style={{ gap: 4, padding: "8px 14px 6px", borderTop: "1.6px dashed var(--ink-soft)" }}>
        {DIMS.map(d => (
          <div key={d.key} className="wf-spread" style={{ gap: 6 }}>
            <span className="wf-meta" style={{ width: 64 }}>{d.label}</span>
            <div className="wf-bar wf-grow"><div className="wf-bar-fill" style={{ width: `${d.val}%` }}></div></div>
            <span className="wf-meta" style={{ width: 22, textAlign: "right" }}>{d.val}</span>
          </div>
        ))}
      </div>

      {/* 6 archetype sub-scores belt (the engine under the hood) */}
      <div style={{ padding: "4px 14px 6px" }}>
        <div className="wf-meta" style={{ fontSize: 8, marginBottom: 2 }}>— 6 archetypes —</div>
        <div className="wf-grid-3" style={{ gap: 4 }}>
          {ARCH6.map(s => (
            <div key={s.k} className="wf-spread" style={{ gap: 3, fontSize: 9 }}>
              <span style={{ fontFamily: "Special Elite, monospace", fontSize: 9 }}>{s.label}</span>
              <span style={{ fontFamily: "Special Elite, monospace", fontWeight: 700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* lore */}
      <div style={{ padding: "6px 14px 6px", borderTop: "1.6px solid var(--line)", fontSize: 11, lineHeight: 1.3 }}>
        {ME.lore}
      </div>

      {/* code footer */}
      <div style={{
        padding: "4px", textAlign: "center",
        background: "var(--paper-warm)",
        borderTop: "1.6px solid var(--line)",
        fontFamily: "Special Elite, monospace", fontSize: 12, letterSpacing: ".15em"
      }}>{ME.code}</div>
    </div>

    {/* CTAs outside the card */}
    <div className="wf-row" style={{ gap: 6 }}>
      <Btn block>↻ Again</Btn>
      <Btn block style={{ background: "var(--highlight)" }}>📤 Share PNG</Btn>
    </div>
  </Phone>
);

// ─────────────────────────────────────────────────────────────────────
// B · Card + 7-roster gallery
//   Hero card top, "1 of 7" gallery below with yours highlighted.
//   Strips out lore — keeps the moment short, lets the gallery be
//   the meta-context. Tap any other to peek their card.
// ─────────────────────────────────────────────────────────────────────
const ResultsB = () => (
  <Phone label="B · Card + roster · pick-one-of-seven">
    <div className="wf-spread">
      <span className="wf-meta">your card</span>
      <span className="wf-meta">1 of 7</span>
    </div>

    {/* compact card */}
    <div className="wf-card" style={{
      padding: 10, gap: 6, display: "flex", flexDirection: "column",
      borderWidth: 2.5, boxShadow: "4px 4px 0 0 var(--line)"
    }}>
      <div className="wf-spread">
        <div>
          <div className="wf-h2" style={{ fontSize: 22, lineHeight: 1 }}>{ME.name}</div>
          <div className="wf-tiny">{ME.code} · {ME.dom.toLowerCase()} / {ME.sec.toLowerCase()}</div>
        </div>
        <div style={{
          width: 50, height: 50, borderRadius: "50%",
          border: "2px solid var(--line)", background: "var(--highlight)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "2px 2px 0 0 var(--line)"
        }}>
          <div style={{ fontFamily: "Special Elite, monospace", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{ME.power}</div>
          <div className="wf-tiny" style={{ fontSize: 7 }}>POWER</div>
        </div>
      </div>
      <Img style={{ flex: 1, minHeight: 180 }}>character art</Img>
      <div className="wf-row" style={{ gap: 4 }}>
        {DIMS.map(d => (
          <div key={d.key} style={{
            flex: 1, border: "1.4px solid var(--line)", borderRadius: 6,
            padding: "4px 6px", textAlign: "center",
            background: d.label === ME.dom ? "var(--highlight)" : "transparent"
          }}>
            <div className="wf-meta" style={{ fontSize: 9 }}>{d.label}</div>
            <div style={{ fontFamily: "Special Elite, monospace", fontSize: 16, fontWeight: 700 }}>{d.val}</div>
            <div style={{ fontFamily: "Special Elite, monospace", fontSize: 8, lineHeight: 1.2, marginTop: 2 }}>
              {d.subs.map(s => <div key={s.k}>{s.label.split(' ')[1] || s.label} · {s.v}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* the roster — yours highlighted */}
    <div>
      <div className="wf-meta" style={{ marginBottom: 4 }}>— the 7 types —</div>
      <div className="wf-grid-3" style={{ gap: 4 }}>
        {ROSTER.map(c => (
          <div key={c.code} style={{
            border: c.me ? "2px solid var(--line)" : "1.4px solid var(--ink-faint)",
            borderRadius: 6,
            padding: "5px 4px", textAlign: "center",
            background: c.me ? "var(--highlight)" : "transparent",
            opacity: c.me ? 1 : 0.55,
            position: "relative"
          }}>
            <div style={{ fontFamily: "Special Elite, monospace", fontSize: 11, fontWeight: 700 }}>{c.code}</div>
            <div className="wf-tiny" style={{ fontSize: 9, lineHeight: 1.1 }}>{c.name}</div>
            {c.me && <span style={{ position: "absolute", top: -8, right: -4 }} className="wf-sticker">YOU</span>}
          </div>
        ))}
      </div>
    </div>

    <div className="wf-row" style={{ gap: 6 }}>
      <Btn block>↻ Again</Btn>
      <Btn block style={{ background: "var(--highlight)" }}>📤 Share</Btn>
    </div>
    <Note style={{ top: 70, right: 4, transform: "rotate(3deg)" }}>roster = social hook</Note>
  </Phone>
);

// ─────────────────────────────────────────────────────────────────────
// C · Card flip — front=portrait, back=lore
//   Single card. Tap to flip. Front is pure identity (art + power).
//   Back is the explanation (3 dim bars + lore). Minimum cognitive load.
// ─────────────────────────────────────────────────────────────────────
const ResultsC = () => (
  <Phone label="C · Card flip · front + back">
    <div className="wf-spread">
      <span className="wf-meta">tap card to flip</span>
      <span className="wf-meta">↻</span>
    </div>

    <div className="wf-flip-stack" style={{ minHeight: 470 }}>
      {/* back peeks behind */}
      <div className="wf-flip-card wf-flip-back" style={{ width: "82%", height: 420 }}>
        <div className="wf-meta" style={{ marginBottom: 4 }}>— how you got here —</div>
        <div className="wf-col" style={{ gap: 4 }}>
          {DIMS.map(d => (
            <div key={d.key} className="wf-spread" style={{ gap: 6 }}>
              <span className="wf-meta" style={{ width: 60, fontSize: 9 }}>{d.label}</span>
              <div className="wf-bar wf-grow" style={{ height: 10 }}><div className="wf-bar-fill" style={{ width: `${d.val}%` }}></div></div>
              <span className="wf-meta" style={{ width: 18, textAlign: "right" }}>{d.val}</span>
            </div>
          ))}
        </div>
        <hr className="wf-line-dashed" style={{ margin: "8px 0 4px" }} />
        <div className="wf-meta" style={{ fontSize: 9, marginBottom: 3 }}>— 6 archetypes (sub-scores) —</div>
        <div className="wf-grid-2" style={{ gap: 3 }}>
          {ARCH6.map(s => (
            <div key={s.k} className="wf-spread" style={{ fontSize: 10 }}>
              <span style={{ fontFamily: "Special Elite, monospace", fontSize: 9 }}>{s.label}</span>
              <span style={{ fontFamily: "Special Elite, monospace", fontWeight: 700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* front */}
      <div className="wf-flip-card wf-flip-front" style={{ width: "82%", height: 420, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* power badge */}
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 50, height: 50, borderRadius: "50%",
          border: "2px solid var(--line)", background: "var(--highlight)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "2px 2px 0 0 var(--line)", zIndex: 3
        }}>
          <div style={{ fontFamily: "Special Elite, monospace", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{ME.power}</div>
          <div className="wf-tiny" style={{ fontSize: 7 }}>POWER</div>
        </div>

        {/* art zone */}
        <Img style={{ flex: 1, borderRadius: 0, border: 0, borderBottom: "1.6px solid var(--line)" }}>character art</Img>

        {/* name plate */}
        <div style={{ padding: "10px 12px", textAlign: "center", background: "var(--paper-warm)" }}>
          <div className="wf-h2" style={{ fontSize: 24, lineHeight: 1 }}>{ME.name}</div>
          <div className="wf-tiny" style={{ marginTop: 2 }}>{ME.code} · "{ME.tagline}"</div>
        </div>
      </div>

      <Arrow style={{ top: "50%", right: 6, transform: "translateY(-50%) rotate(0deg)" }}>↻ flip</Arrow>
      <Note style={{ bottom: -2, left: 0, transform: "rotate(-2deg)" }}>front = identity · back = math</Note>
    </div>

    <div style={{ fontSize: 11, lineHeight: 1.35, fontStyle: "italic", color: "var(--ink-soft)", textAlign: "center" }}>
      "{ME.lore}"
    </div>

    <div className="wf-row" style={{ gap: 6 }}>
      <Btn block>↻ Again</Btn>
      <Btn block style={{ background: "var(--highlight)" }}>📤 Share PNG</Btn>
    </div>
  </Phone>
);

Object.assign(window, { ResultsA, ResultsB, ResultsC });
