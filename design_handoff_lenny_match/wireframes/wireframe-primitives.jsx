// Lenny Match — wireframe screens
// Sketchy hand-drawn vibe; multiple variations per screen.

const Note = ({ children, style }) => (
  <div className="wf-note" style={style}>{children}</div>
);

const Arrow = ({ children, style }) => (
  <div className="wf-arrow" style={style}>{children}</div>
);

const Tag = ({ children, kind, className = "" }) => (
  <span className={`wf-tag ${kind ? `archetype-${kind}` : ""} ${className}`}>{children}</span>
);

const Pill = ({ children, style }) => (
  <span className="wf-pill" style={style}>{children}</span>
);

const Btn = ({ children, big, block, style, className = "" }) => (
  <span className={`wf-btn ${big ? "wf-btn-big" : ""} ${block ? "wf-btn-block" : ""} ${className}`} style={style}>
    {children}
  </span>
);

const Img = ({ children, style }) => (
  <div className="wf-img" style={style}>{children}</div>
);

const ProgressBar = ({ pct = 20, label }) => (
  <div className="wf-col" style={{ gap: 4 }}>
    <div className="wf-spread">
      <span className="wf-meta">{label || `Quote ${Math.round(pct/100*15)} of 15`}</span>
      <span className="wf-meta">{pct}%</span>
    </div>
    <div className="wf-progress">
      <div className="wf-progress-fill" style={{ width: `${pct}%` }}></div>
    </div>
  </div>
);

const Bar = ({ pct, label, count }) => (
  <div className="wf-col" style={{ gap: 3 }}>
    <div className="wf-spread">
      <span style={{ fontSize: 12 }}>{label}</span>
      <span className="wf-tiny">{count}</span>
    </div>
    <div className="wf-bar"><div className="wf-bar-fill" style={{ width: `${pct}%` }}></div></div>
  </div>
);

const Phone = ({ children, label }) => (
  <div className="wf-col" style={{ alignItems: "center", gap: 10 }}>
    <div className="wf-phone">
      <div className="wf-phone-notch"></div>
      <div className="wf-screen">{children}</div>
    </div>
    {label ? <div className="wf-meta">{label}</div> : null}
  </div>
);

const Desktop = ({ children, label }) => (
  <div className="wf-col" style={{ alignItems: "center", gap: 10 }}>
    <div className="wf-desktop">
      <div className="wf-desktop-bar">
        <div className="wf-desktop-dot"></div>
        <div className="wf-desktop-dot"></div>
        <div className="wf-desktop-dot"></div>
        <div style={{ flex: 1 }}></div>
        <div className="wf-meta" style={{ fontSize: 9 }}>lenny-match.app</div>
        <div style={{ flex: 1 }}></div>
      </div>
      <div className="wf-desktop-body">{children}</div>
    </div>
    {label ? <div className="wf-meta">{label}</div> : null}
  </div>
);

Object.assign(window, { Note, Arrow, Tag, Pill, Btn, Img, ProgressBar, Bar, Phone, Desktop });
