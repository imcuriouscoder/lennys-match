# Handoff: Lenny Match

A 60-second podcast-quote-tasting game. The user swipes on 15 anonymized quotes pulled from the Lenny Rachitsky podcast (Love · Reasonable · Reject), the system computes their thinking style, and the result is a collectible character card (My Hero Academia / fighting-game card aesthetic). The card is shareable as a PNG.

---

## About the design files

The files in `wireframes/` are **lo-fi wireframes** built in HTML+React. They are design references, not production code. The visual language is intentionally sketchy — hand-drawn type (`Architects Daughter`, `Caveat`, `Special Elite`), wobbly borders, paper-warm palette — purely so we can iterate on layout and information architecture without committing to a final visual style.

The job is to **rebuild these flows in your target codebase** (React/Next, SwiftUI, native, whatever applies) using its component library and design tokens. Don't ship the sketch styling. Treat the wireframes as a spec for: screen anatomy, what's on each screen, sizing/proportion of elements, and how screens connect.

If there is no codebase yet, recommended stack:
- **Next.js (App Router) + Tailwind + shadcn/ui** for the web app
- **html2canvas** or **satori** for the share PNG
- A static JSON file for the quote dataset to start (no backend needed for v1)

## Fidelity

**Low-fidelity wireframes.** Layout and IA are committed; type, color, and final visual style are not. The character card aesthetic should pull from the user's reference images (My Hero Academia card, Naruto/Itachi character sheet, fighting-game cards like Grave/Jaina/Rook/Valerie, board-game hero cards) — anime-inspired character art, bold framed card with name banner, power orb, stat orbs, dimension bars, lore footer.

---

## The data model (build this first)

Three layers, ordered foundation → presentation:

### 1. The 6 archetypes (foundation — drives matching)
Every quote in the dataset is classified into exactly one of:

| # | Archetype    | Meaning                                       |
|---|--------------|-----------------------------------------------|
| 1 | TACTIC       | What worked, specific actions taken           |
| 2 | ANTI-TACTIC  | What failed, what to avoid                    |
| 3 | WAR STORY    | Anecdotes, lived experience                   |
| 4 | FRAMEWORK    | Mental models, structured thinking            |
| 5 | HOT TAKE     | Contrarian or provocative opinions            |
| 6 | PREDICTION   | Future-oriented claims                        |

### 2. The 3 dimensions (the visible stats — FIFA-style)
The 6 archetypes roll up into 3 dimensions shown as the big stats on the card:

| Dimension  | = Archetypes              | Tagline               | Color family                    | Icon          |
|------------|---------------------------|------------------------|----------------------------------|---------------|
| DOER       | Tactic + Anti-Tactic      | "Gets it shipped."     | earthy — terracotta, brown      | hammer        |
| THINKER    | Framework + Prediction    | "Sees the system."     | cool — deep blue, indigo, purple| chess piece   |
| DISRUPTOR  | Hot Take + War Story      | "Breaks the rules."    | hot — red, orange, magenta      | lightning bolt|

Each dimension scored 0–100.

### 3. The 7 character types (the persona / card identity)
Dominant + secondary dimension produces the card type. Code is a 3-letter abbreviation used as the card's footer stamp.

| Code | Name         | Dom        | Sec        | Flavor                     | Tagline (placeholder)                         |
|------|--------------|------------|------------|----------------------------|------------------------------------------------|
| PRG  | Pragmatist   | Doer       | Thinker    | Veteran swordsman          | "Ship first. Frame later."                     |
| VET  | Veteran      | Doer       | Disruptor  | Battle-worn ronin          | "Scars > theory."                              |
| ARC  | Architect    | Thinker    | Doer       | Sage strategist            | "Designs the system, then builds it."          |
| HRT  | Heretic      | Thinker    | Disruptor  | Rogue mage                 | "Rejects the playbook. Loves the meta."        |
| MAV  | Maverick     | Disruptor  | Doer       | Lightning brawler          | "Breaks rules. Ships anyway."                  |
| PRV  | Provocateur  | Disruptor  | Thinker    | Trickster / kitsune        | "Picks fights worth winning."                  |
| GEN  | Generalist   | balanced   | balanced   | Adaptive protagonist       | "Reads the room. Plays every role."            |

Each card type ships with: anime-style character illustration, signature color, 3-letter code, tagline, 2-sentence lore description.

### Scoring math

Per swipe:
- **Love** = +2 to that quote's archetype
- **Reasonable** = +1
- **Reject** = −1

After 15 swipes:
1. Sum scores per archetype (6 totals)
2. Aggregate to dimensions: `DOER = (Tactic + Anti-Tactic)`, etc., normalized to 0–100
3. Find dominant + secondary dimension → look up character type from table above
4. **Power Level (50–99)** — measures *decisiveness*: more Loves and Rejects = higher Power; lots of Reasonable = lower Power. Rough formula: `power = 50 + round(((loves + rejects) / 15) * 49)` (tune as needed)

---

## Screens

Five screens. Wireframes show 3 directions per screen — pick one or remix per the table below. The full canvas is at `wireframes/Lenny Match Wireframes.html`.

### 1. Intro / Landing — `wf-screens-intro.jsx`
- **Purpose:** Cold-open. Tell the user what this is, get them to tap Start.
- **Recommended direction:** **C — Pick-your-mode entry.** Clear menu, lowest friction; lets us add modes later (Quick 15 / Deep 30 / by-guest).
- **Anatomy:** Title + subtitle, mode picker (3 large tappable rows), "How it works" expander, Start CTA.

### 2. Quote Card (front) — `wf-screens-card.jsx`
- **Purpose:** The swipe loop. User reacts to one quote at a time.
- **Recommended direction:** **B — Tinder-style swipe** with **C's color-strip** for archetype subtle hint at top.
- **Anatomy:**
  - Top: progress dots (15), counter ("3/15"), close button
  - Middle: card with the quote in big handwritten-feeling type, plus a tiny anonymized lens ("a 2x founder · B2B")
  - Behind: ghost of next card peeking
  - Bottom: 3 buttons — ❤️ Love · 🤝 Reasonable · 🔪 Reject
- **Interactions:**
  - Drag right → Love, drag left → Reject, tap middle button → Reasonable
  - Card animates off-screen on commit (200–300ms), next card scales in
  - Long-press shows "why?" tooltip — explains anonymization

### 3. Reveal — `wf-screens-reveal.jsx`
- **Purpose:** After each swipe, briefly reveal who the guest was + episode + Spotify deep-link.
- **Recommended direction:** **B — Bottom-sheet rises.** Non-blocking, easy to dismiss to keep swiping.
- **Anatomy:**
  - Bottom sheet with: guest avatar/name, episode title, "Heard on Lenny's Podcast — ep #142", Spotify play button, "next quote →"
  - Only shown for ~2s or until user taps "next"; keep it lightweight

### 4. Results — `wf-screens-results.jsx`
- **Purpose:** The reveal moment. The user IS a card.
- **Recommended direction:** **A — Hero card portrait** (full character card). B (card + 7-roster) is a solid alternative if the social/collect-them-all angle is important.
- **Anatomy (A):** see "Card anatomy" below.
- **CTAs:** ↻ Again · 📤 Share PNG

### 5. Shareable PNG — `wf-screens-share.jsx`
- **Purpose:** The viral mechanic. Generated client-side.
- **Recommended direction:** **A — Portrait card** for IG stories / Twitter; offer **B** (square) and **C** (receipt) as alt aspect ratios.
- **Generation:** render the card at fixed pixel size (A: 1080×1350, B: 1080×1080, C: 720×1440), use html2canvas or satori to rasterize, trigger download + Web Share API on mobile.

---

## Card anatomy (the most important screen — Results A / Share A)

```
┌─────────────────────────────────┐
│  ▌ name banner — THE HERETIC ▐ │  ← bold, framed, "{tagline}" line under
├──┬───────────────────────┬──────┤
│64│                       │ ⭐ 82│  ← left rail: 3 dim orbs (numbers)
│DR│                       │POWER │     top-right: power orb (highlighted)
│──│   character art       │      │
│88│       (anime)         │      │
│TH│                       │      │
│──│                       │      │
│79│                       │      │
│DS│                       │      │
├──┴───────────────────────┴──────┤
│ DOER       ████░░░░░░░░░░  64   │  ← 3 dimension bars
│ THINKER    █████████████░  88   │
│ DISRUPTOR  ███████████░░░  79   │
├─ 6 archetypes ──────────────────┤
│ 🎯 Tac  70  │ 🧠 Frm  92  │ 🔥 Hot 86 │  ← 6 archetype sub-scores
│ ⚠️ Anti 58  │ 🔮 Prd  84  │ 📖 War 72 │
├─────────────────────────────────┤
│ Mental models over recipes.     │  ← lore — 2 sentences
│ You'd rather be wrong in an     │
│ interesting way than right…     │
├─────────────────────────────────┤
│ HRT · No.0142    lenny-match.app│  ← code stamp + URL footer
└─────────────────────────────────┘
```

**Key design rules:**
- Dominant dimension's stat orb / box is highlighted (yellow / signature color)
- Power orb sits **outside** the card edge, top-right, slightly rotated — playful sticker feel
- Border has card-game framing (double border, slight wobble or hard edge depending on chosen visual style — ref the inspiration images)
- Character art slot is the visual hero — placeholder for now; later: generated or curated anime portraits per type
- Code (HRT/PRG/etc.) lives in the footer like a card-game set code

---

## Interactions & state

### Routing / flow
```
/             → Intro
/play         → Card (15 swipes; route param ?i=0..14 for resume)
                  └─ on each swipe → Reveal sheet, then auto-advance
/result/:code → Results (e.g. /result/HRT?p=82&d=64,88,79&a=70,58,92,84,86,72)
/share/:code  → Share PNG renderer (same params)
```

URL-encode the result so a shared link opens the recipient's own copy of the card without re-running the game.

### State (Zustand or simple useReducer)
```ts
type Swipe = "love" | "reasonable" | "reject";
type GameState = {
  quotes: Quote[];        // 15 picked at session start, deterministic from a seed
  index: number;          // 0..14
  swipes: Swipe[];        // length === index
  scores: { [archetype]: number };  // running totals
  result?: { code: CharCode; power: number; dims: [number,number,number]; archs: number[] };
};
```

Persist to `localStorage` so refresh during a session doesn't reset.

### Animations
- Card swipe: spring transform (Framer Motion `useDragControls` is ideal). On commit, card flies off (300ms cubic-out), next card scales 0.95 → 1
- Reveal sheet: slide up 280ms ease-out, slide down 200ms ease-in
- Results card entry: stagger from blank → name banner → art → orbs → bars → lore (each 100ms)
- Power number: count-up animation 800ms

### Empty / error / loading states
- Quotes failing to load → "Lenny's catalog is napping. Try again." with retry
- Result page hit directly without state → recompute from URL params; if invalid, redirect to `/`
- Share PNG generation failing → fall back to copyable text card

---

## Design tokens (placeholder values — replace with your codebase's real tokens)

Wireframes use sketch-style tokens defined in `wireframes/wireframe-styles.css`. **Don't ship these.** For real implementation, define a fresh palette tuned to anime card art. Suggested starting tokens:

```css
/* card palette — refine per art direction */
--bg:           #0e0e10;           /* deep card-game background */
--paper:        #f7f3ea;           /* card face — warm off-white */
--ink:          #131318;           /* primary text */
--accent:       #f5b400;           /* power-orb yellow */

/* dimension colors */
--doer:         #c8632a;           /* terracotta */
--thinker:      #2e4eb8;           /* deep blue */
--disruptor:    #d8294a;           /* magenta-red */

/* swipe verbs */
--love:         #e85a5a;
--reasonable:   #c9a14a;
--reject:       #2a2a2a;

/* spacing — 4pt scale */
--space-1: 4px;  --space-2: 8px;  --space-3: 12px;
--space-4: 16px; --space-6: 24px; --space-8: 32px;

/* radii */
--radius-card:   18px;   /* the character card */
--radius-button: 999px;
--radius-chip:   6px;
```

Typography:
- **Display / character names:** a strong condensed display face (e.g. *Bebas Neue*, *Druk*, *Anton*) — replace the wireframe's Caveat
- **Body:** a clean sans (Inter / Geist / your codebase's default)
- **Stat numbers / codes:** a monospace with character (JetBrains Mono, IBM Plex Mono) — keeps the fighting-game-card energy

---

## Assets to commission / source

| Asset                              | How many | Notes                                          |
|------------------------------------|----------|------------------------------------------------|
| Character illustrations (anime)    | 7        | One per character type; consistent art style. Square or 4:5. Initially: AI-generated placeholders, later: commissioned |
| Type icons (hammer/brain/lightning)| 3        | One per dimension. SVG, monochrome             |
| Archetype mini-icons               | 6        | The emoji set (🎯⚠️📖🧠🔥🔮) is fine for v1     |
| App logo / wordmark "Lenny Match"  | 1        | Wordmark with a quote-mark or hammer/lightning glyph |
| Card frame ornament                | 1–3      | Optional: decorative border treatment per dim  |

Source the **quote dataset** by transcribing real Lenny Rachitsky podcast episodes; classify each quote into one of the 6 archetypes (manual pass + LLM-assisted second pass, then human review). Keep guest name + episode + Spotify URL with each quote.

---

## Wireframe files (reference)

In this folder under `wireframes/`:

| File                          | What's in it                                              |
|-------------------------------|-----------------------------------------------------------|
| `Lenny Match Wireframes.html` | Entry point — opens the design canvas with all 5 screens × 3 directions |
| `wireframe-styles.css`        | Sketch-style CSS tokens & utilities (don't ship)          |
| `wireframe-primitives.jsx`    | `Phone`, `Desktop`, `Btn`, `Pill`, `Tag`, `Bar`, `Img`, `Note`, `Arrow`, `ProgressBar` |
| `wf-screens-intro.jsx`        | Intro A · B · C                                          |
| `wf-screens-card.jsx`         | Quote card A · B · C                                     |
| `wf-screens-reveal.jsx`       | Reveal A · B · C                                         |
| `wf-screens-results.jsx`      | Results A · B · C **+ canonical DIMS / ARCH6 / ROSTER data shapes** |
| `wf-screens-share.jsx`        | Share PNG A · B · C                                      |
| `design-canvas.jsx`           | The canvas wrapper — not part of the product             |

Open `Lenny Match Wireframes.html` in a browser to see all 15 wireframes laid out on a pannable canvas.

---

## Recommended Claude Code prompt to start

> I'm building "Lenny Match" — see `design_handoff_lenny_match/README.md` and the wireframes in `wireframes/`. Set up a Next.js + Tailwind + shadcn/ui project. Implement the data model first (6 archetypes / 3 dimensions / 7 character types) per the README. Build the 5 screens following the recommended directions (Intro C, Card B, Reveal B, Results A, Share A). Use Framer Motion for swipe + transitions. Stub the quote dataset with 15 example quotes for now. Use placeholder character art (gray boxes labeled with the type code) — I'll commission art later.

---

## Open questions for the team
- [ ] Quote dataset: who classifies, and what's the QA loop?
- [ ] Character art: AI-gen placeholders for v1, or commission upfront?
- [ ] Auth: do we need accounts to save card history, or is link-based sharing enough for v1?
- [ ] Spotify: deep links only, or full Web Playback SDK in-app preview?
- [ ] Anti-spam: rate-limit per IP for the share PNG endpoint?
