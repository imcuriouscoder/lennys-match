// Lenny Match — Shareable PNG card (3 variations)
// All three are character cards designed for export via html2canvas.
// They mirror the Results screen: name + power + character art + 3 dim
// stats (Doer/Thinker/Disruptor) and 6 archetype sub-scores.

const SHARE_DIMS = [
  { key: "doer",     label: "DOER",      val: 64,
    subs: [{ k: "tac",   label: "🎯 Tactic",     v: 70 },
           { k: "anti",  label: "⚠️ Anti-Tactic", v: 58 }] },
  { key: "thinker",  label: "THINKER",   val: 88,
    subs: [{ k: "frame", label: "🧠 Framework",  v: 92 },
           { k: "pred",  label: "🔮 Prediction", v: 84 }] },
  { key: "disruptor",label: "DISRUPTOR", val: 79,
    subs: [{ k: "hot",   label: "🔥 Hot Take",   v: 86 },
           { k: "war",   label: "📖 War Story",  v: 72 }] },
];
const SHARE_ME = {
  name: "THE HERETIC", code: "HRT", power: 82,
  tagline: "Rejects the playbook. Loves the meta.",
  dom: "THINKER", sec: "DISRUPTOR",
};
const SHARE_ARCH6 = SHARE_DIMS.flatMap(d => d.subs);

// ─────────────────────────────────────────────────────────────────────
// A · Portrait card — full hero card (My Hero Academia layout)
//   Same anatomy as Results A, sized for 4:5 IG portrait.
// ─────────────────────────────────────────────────────────────────────
const ShareA = () => (
  <div className="wf-col" style={{ alignItems: "center", gap: 10 }}>
    <div style={{
      width: 380, height: 500,
      border: "2.5px solid var(--line)", borderRadius: 14,
      background: "var(--paper)",
      boxShadow: "4px 4px 0 0 var(--line)",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden"
    }}>
      {/* name banner */}
      <div style={{
        borderBottom: "1.6px solid var(--line)",
        padding: "8px 14px", textAlign: "center",
        background: "var(--paper-warm)"
      }}>
        <div className="wf-h2" style={{ fontSize: 24, letterSpacing: ".04em" }}>{SHARE_ME.name}</div>
        <div className="wf-tiny">"{SHARE_ME.tagline}"</div>
      </div>

      {/* art + side rail */}
      <div style={{ display: "flex", gap: 6, padding: 8, position: "relative" }}>
        <div className="wf-col" style={{ gap: 6, width: 46 }}>
          {SHARE_DIMS.map(d => (
            <div key={d.key} className="wf-col" style={{ alignItems: "center", gap: 1 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                border: "1.8px solid var(--line)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Special Elite, monospace", fontSize: 14, fontWeight: 700,
                background: d.label === SHARE_ME.dom ? "var(--highlight)" : "var(--paper)"
              }}>{d.val}</div>
              <div className="wf-tiny" style={{ fontSize: 8 }}>{d.label.slice(0,3)}</div>
            </div>
          ))}
        </div>

        <Img style={{ flex: 1, height: 200 }}>character art · {SHARE_ME.code}</Img>

        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 56, height: 56, borderRadius: "50%",
          border: "2px solid var(--line)", background: "var(--highlight)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: "2px 2px 0 0 var(--line)",
          transform: "translate(8px,-8px) rotate(4deg)"
        }}>
          <div style={{ fontFamily: "Special Elite, monospace", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{SHARE_ME.power}</div>
          <div className="wf-tiny" style={{ fontSize: 8 }}>POWER</div>
        </div>
      </div>

      {/* 3 dim bars */}
      <div className="wf-col" style={{ gap: 4, padding: "6px 14px", borderTop: "1.6px dashed var(--ink-soft)" }}>
        {SHARE_DIMS.map(d => (
          <div key={d.key} className="wf-spread" style={{ gap: 6 }}>
            <span className="wf-meta" style={{ width: 64 }}>{d.label}</span>
            <div className="wf-bar wf-grow"><div className="wf-bar-fill" style={{ width: `${d.val}%` }}></div></div>
            <span className="wf-meta" style={{ width: 22, textAlign: "right" }}>{d.val}</span>
          </div>
        ))}
      </div>

      {/* 6 archetype belt */}
      <div style={{ padding: "4px 14px 6px" }}>
        <div className="wf-meta" style={{ fontSize: 8, marginBottom: 2 }}>— 6 archetypes —</div>
        <div className="wf-grid-3" style={{ gap: 4 }}>
          {SHARE_ARCH6.map(s => (
            <div key={s.k} className="wf-spread" style={{ gap: 3 }}>
              <span style={{ fontFamily: "Special Elite, monospace", fontSize: 9 }}>{s.label}</span>
              <span style={{ fontFamily: "Special Elite, monospace", fontWeight: 700, fontSize: 10 }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{ flex: 1 }}></div>
      <div style={{
        padding: "4px 12px", textAlign: "center",
        background: "var(--paper-warm)",
        borderTop: "1.6px solid var(--line)",
        fontFamily: "Special Elite, monospace", fontSize: 11, letterSpacing: ".1em",
        display: "flex", justifyContent: "space-between"
      }}>
        <span>{SHARE_ME.code} · No.0142</span>
        <span>lenny-match.app</span>
      </div>
    </div>
    <div className="wf-meta">A · Portrait card · 4:5 IG / Twitter</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// B · Square card — art left, stats right (IG / Twitter 1:1)
// ─────────────────────────────────────────────────────────────────────
const ShareB = () => (
  <div className="wf-col" style={{ alignItems: "center", gap: 10 }}>
    <div style={{
      width: 480, height: 480,
      border: "2.5px solid var(--line)", borderRadius: 14,
      background: "var(--paper)",
      boxShadow: "4px 4px 0 0 var(--line)",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden"
    }}>
      {/* top banner */}
      <div style={{
        padding: "8px 16px", borderBottom: "1.6px solid var(--line)",
        background: "var(--paper-warm)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span className="wf-meta">LENNY MATCH</span>
        <span className="wf-meta">{SHARE_ME.code} · No.0142</span>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* art + name on left */}
        <div style={{
          flex: "0 0 220px",
          display: "flex", flexDirection: "column",
          borderRight: "1.6px solid var(--line)"
        }}>
          <Img style={{ flex: 1, border: 0, borderRadius: 0, borderBottom: "1.6px solid var(--line)" }}>character art</Img>
          <div style={{ padding: "8px 10px", textAlign: "center", background: "var(--paper-warm)", position: "relative" }}>
            <div className="wf-h2" style={{ fontSize: 22, lineHeight: 1 }}>{SHARE_ME.name}</div>
            <div className="wf-tiny" style={{ marginTop: 2, fontStyle: "italic" }}>"{SHARE_ME.tagline}"</div>
          </div>
        </div>

        {/* stats on right */}
        <div className="wf-col" style={{ flex: 1, padding: "12px 14px", gap: 8, position: "relative" }}>
          {/* power badge */}
          <div className="wf-spread">
            <span className="wf-meta">POWER LEVEL</span>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "2px solid var(--line)", background: "var(--highlight)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "2px 2px 0 0 var(--line)",
              fontFamily: "Special Elite, monospace", fontSize: 20, fontWeight: 700
            }}>{SHARE_ME.power}</div>
          </div>

          <hr className="wf-line-dashed" style={{ margin: 0 }} />

          <div className="wf-meta">3 DIMENSIONS</div>
          <div className="wf-col" style={{ gap: 4 }}>
            {SHARE_DIMS.map(d => (
              <div key={d.key} className="wf-spread" style={{ gap: 6 }}>
                <span className="wf-meta" style={{ width: 64, fontSize: 9 }}>{d.label}</span>
                <div className="wf-bar wf-grow"><div className="wf-bar-fill" style={{ width: `${d.val}%` }}></div></div>
                <span className="wf-meta" style={{ width: 22, textAlign: "right" }}>{d.val}</span>
              </div>
            ))}
          </div>

          <hr className="wf-line-dashed" style={{ margin: 0 }} />

          <div className="wf-meta">6 ARCHETYPES</div>
          <div className="wf-grid-2" style={{ gap: 3 }}>
            {SHARE_ARCH6.map(s => (
              <div key={s.k} className="wf-spread" style={{ fontSize: 10 }}>
                <span style={{ fontFamily: "Special Elite, monospace", fontSize: 9 }}>{s.label}</span>
                <span style={{ fontFamily: "Special Elite, monospace", fontWeight: 700 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: "4px 14px", borderTop: "1.6px solid var(--line)",
        background: "var(--paper-warm)",
        display: "flex", justifyContent: "space-between",
        fontFamily: "Special Elite, monospace", fontSize: 10, letterSpacing: ".08em"
      }}>
        <span>find your card →</span>
        <span>lenny-match.app</span>
      </div>
    </div>
    <div className="wf-meta">B · Square card · art + stats split</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// C · Receipt card — collectible, typewriter aesthetic
//   Same data, different visual idiom: typed receipt printed on paper.
// ─────────────────────────────────────────────────────────────────────
const ShareC = () => (
  <div className="wf-col" style={{ alignItems: "center", gap: 10 }}>
    <div style={{
      width: 300, height: 580,
      border: "2.5px solid var(--line)", borderRadius: 4,
      background: "var(--paper)", padding: "14px 18px",
      boxShadow: "4px 4px 0 0 var(--line)",
      display: "flex", flexDirection: "column", gap: 8,
      fontFamily: "Special Elite, monospace",
      position: "relative"
    }}>
      <div className="wf-center">
        <div style={{ fontSize: 14, letterSpacing: ".1em" }}>·· LENNY MATCH ··</div>
        <div className="wf-tiny">RECEIPT · 09 MAY 2026 · No.0142</div>
      </div>

      <div style={{
        borderTop: "1.4px dashed var(--ink)", borderBottom: "1.4px dashed var(--ink)",
        padding: "8px 0", textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: ".1em" }}>YOU ARE</div>
        <div className="wf-h2" style={{ fontFamily: "Caveat", fontSize: 30, lineHeight: 1, marginTop: 2 }}>
          {SHARE_ME.name}
        </div>
        <div style={{ fontSize: 10, marginTop: 4, fontFamily: "Caveat", fontSize: 14 }}>"{SHARE_ME.tagline}"</div>
      </div>

      {/* art */}
      <Img style={{ height: 110 }}>character art · {SHARE_ME.code}</Img>

      {/* power */}
      <div className="wf-spread" style={{ fontSize: 12, paddingTop: 2 }}>
        <span>POWER LEVEL ━━━━━━━</span>
        <span style={{ fontWeight: 700, fontSize: 16 }}>{SHARE_ME.power}</span>
      </div>

      {/* 3 dim */}
      <div style={{ borderTop: "1.4px dashed var(--ink)", paddingTop: 6, fontSize: 11 }}>
        <div style={{ fontSize: 10, letterSpacing: ".1em", marginBottom: 4 }}>── 3 DIMENSIONS ──</div>
        {SHARE_DIMS.map(d => (
          <div key={d.key} className="wf-spread" style={{ fontSize: 11 }}>
            <span>{d.label}</span>
            <span>{"▓".repeat(Math.round(d.val/20)).padEnd(5,"░")} {d.val}</span>
          </div>
        ))}
      </div>

      {/* 6 archetypes */}
      <div style={{ borderTop: "1.4px dashed var(--ink)", paddingTop: 6, fontSize: 11 }}>
        <div style={{ fontSize: 10, letterSpacing: ".1em", marginBottom: 4 }}>── 6 ARCHETYPES ──</div>
        {SHARE_ARCH6.map(s => (
          <div key={s.k} className="wf-spread" style={{ fontSize: 11 }}>
            <span>{s.label}</span>
            <span>{s.v}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}></div>
      <div className="wf-center" style={{ fontSize: 10, letterSpacing: ".05em", borderTop: "1.4px dashed var(--ink)", paddingTop: 6 }}>
        ▌▌█▌▌▌█▌█▌▌▌█▌█▌▌█<br/>
        find yours · lenny-match.app
      </div>
    </div>
    <div className="wf-meta">C · Receipt — collectible / typewriter</div>
  </div>
);

Object.assign(window, { ShareA, ShareB, ShareC });
