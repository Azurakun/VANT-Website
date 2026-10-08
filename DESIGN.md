---
name: VANT Project
description: VANT presented as a translated film; a near-black stage lit by slow, chapter-graded light leaks, where every line arrives as a subtitle under a Japanese source line and the work is shown in black screenshot frames.
colors:
  subtitle-white: "#f2f1ee"
  stage-black: "#0b0b0c"
  stage-raised: "#131316"
  stage-high: "#1b1b1f"
  letterbox-black: "#000000"
  caption-grey: "#b4b6bc"
  timecode-grey: "#84878e"
  hairline: "#2a2b30"
  hairline-strong: "#44464d"
  accent-lilac: "#c4b2ff"
  accent-periwinkle: "#a9c2ff"
  accent-blush: "#ffb3d6"
  accent-mint: "#a8e6b8"
  accent-straw: "#f2d27a"
  accent-apricot: "#ffc9a0"
  ambient-violet: "#6b4fd8"
  ambient-cornflower: "#4f7fd6"
  ambient-orchid: "#d0569c"
typography:
  title-card:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(3.5rem, 12vw, 9rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.04em"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 4.6vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 112"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 125"
  subtitle:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.7rem, 4.2vw, 3.4rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  subtitle-jp:
    fontFamily: "Noto Sans JP, Hiragino Sans, Yu Gothic, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.03em"
  lead:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    lineHeight: 1.4
  timecode:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    letterSpacing: "0"
    fontFeature: "'tnum' 1"
rounded:
  badge: "3px"
  shot: "4px"
  dialog: "6px"
  thumb: "8px"
  row: "10px"
  frame: "14px"
  panel: "16px"
  end-card: "18px"
  pill: "999px"
  portrait: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  bar: "64px"
  bar-compact: "56px"
  container: "1280px"
components:
  top-bar:
    backgroundColor: "rgba(11, 11, 12, .62)"
    textColor: "{colors.subtitle-white}"
    height: "{spacing.bar}"
  button-solid:
    backgroundColor: "{colors.subtitle-white}"
    textColor: "{colors.stage-black}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.accent-lilac}"
    textColor: "{colors.stage-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.subtitle-white}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.accent-lilac}"
    textColor: "{colors.stage-black}"
  button-large:
    padding: "0 28px"
    height: "56px"
  chapter-link:
    textColor: "{colors.caption-grey}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
  chapter-link-hover:
    backgroundColor: "{colors.stage-high}"
    textColor: "{colors.subtitle-white}"
  chapter-link-active:
    backgroundColor: "{colors.accent-lilac}"
    textColor: "{colors.stage-black}"
  cc-option:
    textColor: "{colors.caption-grey}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  cc-option-active:
    backgroundColor: "{colors.subtitle-white}"
    textColor: "{colors.stage-black}"
  status-pill:
    textColor: "{colors.subtitle-white}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  status-pill-live:
    backgroundColor: "{colors.accent-lilac}"
    textColor: "{colors.stage-black}"
  project-index:
    backgroundColor: "rgba(19, 19, 22, .55)"
    rounded: "{rounded.panel}"
    padding: "22px 8px 8px"
  project-index-row:
    textColor: "{colors.subtitle-white}"
    rounded: "{rounded.row}"
    padding: "16px"
  project-index-row-hover:
    backgroundColor: "rgba(242, 241, 238, .06)"
  work-frame:
    backgroundColor: "{colors.letterbox-black}"
    rounded: "{rounded.frame}"
  work-open-chip:
    backgroundColor: "rgba(11, 11, 12, .82)"
    textColor: "{colors.subtitle-white}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  work-open-chip-hover:
    backgroundColor: "{colors.accent-lilac}"
    textColor: "{colors.stage-black}"
  work-thumb:
    backgroundColor: "{colors.letterbox-black}"
    rounded: "{rounded.thumb}"
  work-next:
    backgroundColor: "rgba(19, 19, 22, .55)"
    rounded: "{rounded.end-card}"
  viewer-dialog:
    backgroundColor: "{colors.stage-raised}"
    textColor: "{colors.subtitle-white}"
    rounded: "{rounded.dialog}"
---

# Design System: VANT Project

## Overview

**Creative North Star: "The Subtitle Track"** *(provisional: taken from the direction contract's FORM name; not yet confirmed by the user)*

The site is a translated film. Everything VANT says arrives as a subtitle: a small Japanese line tinted in the scene's accent above, a large off-white line below that fades up into English or Indonesian as it enters. The opening is text-led: a two-column first viewport with the Japanese caption, a semi-expanded headline, a lead and body paragraph and two actions on the left, and a translucent "What we've made" project index on the right that maps the works and previews each project's colour mood on hover. Chrome is cinema chrome: a thin, translucent top bar with numbered chapters and a CC language switch. Sections run straight into one another with no rules between them; the cut is carried by the light.

Colour is graded like a film, per scene. Behind everything, three large radial light leaks drift slowly across the stage and blend onto the black, under a fine animated film grain. Each chapter has a mood: three ambient hues and one light accent. As the reader scrolls into a new chapter the ambient light cross-fades to that mood over 1.6s and the accent follows over 0.8s; in the works the mood follows the project being read and holds through the gap until the next one. The interface surfaces themselves stay black, greys and one warm off-white; hue lives in the light behind them, in the accent, and in the screenshots. Density is low and paced: mission lines pin to the viewport and advance one at a time, two shots converge, the works read as a vertical sequence of large black screenshot frames alternating sides, credits roll centered, and the closing scene asks one question. Screenshots appear only in the works. The direction explicitly refuses the neon AI-startup hero and the grid-of-cards portfolio.

Motion is the grammar, not decoration: cross-fades between moods, an opening that settles in line by line once the intro clears, lines that blur up into place, two shots that slide together from the edges, screenshot frames that open like a shutter. Every motion path has a static fallback; phones and reduced-motion readers get the same content unpinned and fully revealed, with the light leaks and grain held still.

**Key Characteristics:**
- Dark-only stage; colour arrives as graded ambient light and one accent per mood.
- Subtitle pairs (accent-tinted Japanese over white translation) are the voice of the page.
- A text-led opening beside a translucent project index; imagery lives only in the works.
- Screenshots in pure black, softly rounded frames sitting on a slightly lifted near-black stage.
- Expanded-width Archivo for names and title cards; semi-expanded for headings; normal width for reading.
- Numbered chapters as the navigation device; no section rules, no timeline.
- Active state is a light fill with Stage Black text: the mood accent for chapters, buttons, Live and the screenshot chip, Subtitle White for the pressed CC option.

## Colors

A cool-neutral black-to-off-white ladder for every surface and text role, lit from behind by a chapter-graded ambient layer and pointed by a single light accent per mood. All mood colours are registered `@property <color>` custom properties (`--amb-a`, `--amb-b`, `--amb-c`, `--accent`) so they interpolate when `app.js` `setMood()` swaps them.

### Primary
- **Subtitle White** (`subtitle-white`): the voice colour. Subtitle translations, headings, the opening headline and lead, project names, the solid button resting fill, the pressed CC option, focus outline. Slightly warm so it reads as projected light rather than UI white. At low alpha it draws the translucent hairlines of the project index (8 to 10%), the end card's dashed border (18%), the frame and thumbnail edge rings (8 to 10%) and the index row hover wash (6%).

### Secondary (the mood accent)
- **Mood Accent** (`--accent`; default `accent-lilac`): one light, high-value tint per mood, always used either as a text colour on the stage or as a fill under Stage Black text. Applied to: the active chapter pill, the solid and ghost button hover wipe (and ghost hover border), text-link underline and hover text, the Japanese subtitle and opening caption lines, project index status text and hovered arrow, the Live status pill, the screenshot chip on frame hover, the thumbnail hover ring, the scroll-cue dot, the converge ×, active pin progress ticks, the values bullet dot, credit roles, and text selection. Per-mood values: `accent-lilac` (stage, antima), `accent-periwinkle` (mission), `accent-blush` (members, next, contact), `accent-mint` (teaflow), `accent-straw` (gaia), `accent-apricot` (credits).

### Tertiary (the ambient light)
- **Ambient Light** (`--amb-a`, `--amb-b`, `--amb-c`; defaults `ambient-violet`, `ambient-cornflower`, `ambient-orchid`): three saturated mid-value hues, never used on text or controls. Each fills one 70vmax radial gradient (colour at 0%, transparent by 66%) at 62% opacity (the third at 50%) with `mix-blend-mode: screen`, fixed behind the page. The full mood table, from `app.js` `MOODS` (`[amb-a, amb-b, amb-c, accent]`):

| Mood | amb-a | amb-b | amb-c | accent |
|---|---|---|---|---|
| stage | `#6b4fd8` | `#4f7fd6` | `#d0569c` | `#c4b2ff` |
| mission | `#3d4fd6` | `#2a8bd6` | `#7a4fd8` | `#a9c2ff` |
| members | `#1f9fd6` | `#d0569c` | `#6b4fd8` | `#ffb3d6` |
| antima | `#7a4fd8` | `#d0569c` | `#4f7fd6` | `#c4b2ff` |
| teaflow | `#2f9e62` | `#7bbf3a` | `#1f7f8c` | `#a8e6b8` |
| gaia | `#d4a72c` | `#8a5cd0` | `#b5532a` | `#f2d27a` |
| next | `#d0569c` | `#6b4fd8` | `#e07a3a` | `#ffb3d6` |
| credits | `#d27a2c` | `#c24f6e` | `#6b4fd8` | `#ffc9a0` |
| contact | `#6b4fd8` | `#d0569c` | `#1f9fd6` | `#ffb3d6` |

### Neutral
- **Stage Black** (`stage-black`): page background; at 62% alpha (with blur) the top bar; at 82% alpha the scrim under the "View screenshots" chip on each work frame.
- **Stage Raised** (`stage-raised`): the screenshot viewer dialog; at 55% alpha the translucent project index panel and the dashed end card, so the ambient light reads through them.
- **Stage High** (`stage-high`): hover fill on chapter links.
- **Letterbox Black** (`letterbox-black`): pure black inside every image well (work frames, thumbnails, converge shots, viewer image well) and the intro's closing bars. It is darker than the stage on purpose; the step from `stage-black` to `letterbox-black` is how a frame reads as a screen, and frames block the ambient light.
- **Caption Grey** (`caption-grey`): secondary text: the opening body paragraph, descriptions, bios, index row descriptions, idle nav links, CC options, stack lines.
- **Timecode Grey** (`timecode-grey`): tertiary text: chapter numerals, the intro timecode, credit-roll terms, the "Built with" prefix, idle index arrows, footer.
- **Hairline** (`hairline`): scrolled-bar border, viewer bar rule, footer rule, logo frame border.
- **Hairline Strong** (`hairline-strong`): control outlines (ghost button, CC group, status pill, intro skip, scroll cue, viewer controls), idle pin progress ticks, scrollbar thumb.

### Named Rules
**The Graded Light Rule.** Hue enters the interface only as light: the three ambient leaks behind the stage and the one mood accent. Surfaces, frames and body text stay on the neutral ladder. Mood changes are cross-fades (ambient 1.6s, accent 0.8s, `ease-io`), never cuts. A chapter owns one mood, with two deliberate exceptions: inside the works the mood follows the project being read (the last project whose top has passed the viewport middle), holding through the gaps between projects; and hovering a project index row previews that project's mood until the pointer leaves. Some imagery holds its own colour back: the converge shots and the developer portrait sit in grayscale (`grayscale(1) contrast(1.05)`) until the two shots meet or the portrait is hovered.

**The Light-Fill Active Rule.** "On" is always a light fill with Stage Black text. Chapter, Live status, button hover and the hovered screenshot chip use the mood accent; the pressed CC option and the resting solid button use Subtitle White. No other active treatment exists.

## Typography

**Display Font:** Archivo (variable, width 62 to 125, weight 300 to 900), with system-ui fallback
**Body Font:** Archivo at normal width
**Japanese Font:** Noto Sans JP (400/500/700), with Hiragino Sans, Yu Gothic fallback
**Label/Mono Font:** JetBrains Mono (400/500), tabular numerals

**Character:** One grotesque used at three widths does the whole job: expanded (`wdth` 125, weight 800) for title cards and proper names, semi-expanded (112) for headlines, section headings and credit names, normal (100) for subtitles and reading. Noto Sans JP carries only Japanese, and mono carries only numerals.

### Hierarchy
- **Title Card** (800, `clamp(3.5rem, 12vw, 9rem)`, 0.9, width 125): the intro's "VANT" only; it arrives blurred with 0.5em tracking and settles to 0.04em.
- **Display** (700, `clamp(2.4rem, 4.6vw, 4.1rem)`, 1.04, width 112, -0.025em, balanced wrap, max 17ch): the opening H1.
- **Headline** (700, `clamp(2rem, 4vw, 3.2rem)`, 1, width 112, -0.02em): section headings; the works heading runs `clamp(2.2rem, 4.6vw, 3.8rem)` and the converge title `clamp(2rem, 5vw, 4rem)`/1.05.
- **Title** (800, `clamp(2.4rem, 4.4vw, 3.6rem)`, 1, width 125, 0.02em): project names in the works. The same expanded voice at smaller sizes names projects in the index (1.35rem/1.15), Vibra/AnTiMa (`clamp(1.6rem, 2.6vw, 2.2rem)`) and the Credits heading. The index's open "Your project here" row drops to normal width, 600, 1.1rem, Caption Grey: an invitation, not a name.
- **Subtitle** (500, `clamp(1.7rem, 4.2vw, 3.4rem)`, 1.18, -0.01em, balanced wrap): pinned mission lines. The works end card runs 700, `clamp(1.8rem, 3.4vw, 3rem)`/1.1; the closing question 700, `clamp(2.2rem, 6vw, 5rem)`/1.05.
- **Subtitle JP** (Noto Sans JP 400, 0.95rem, 1.5, 0.03em, mood accent): the source line above every translation. The opening caption runs 500, 1rem/1.4.
- **Lead** (400, `clamp(1.1rem, 1.5vw, 1.3rem)`, 1.55, Subtitle White, max 46ch): the opening's first paragraph only.
- **Body** (400, 1.0625rem, 1.65): descriptions and bios, capped at 46 to 60ch.
- **Label** (500 to 600, 0.74 to 0.98rem): nav links, buttons, CC options, status pills, index status, screenshot chip.
- **Timecode** (JetBrains Mono 500, 0.72 to 0.8rem, tabular): chapter numerals, the intro timecode, the viewer caption.

### Named Rules
**The Subtitle Pair Rule.** A statement that matters is a pair: Japanese small and accent-tinted on top, the translation large and white beneath; centered everywhere except the opening, where the caption sits left-aligned over the headline. The translation appears in full at once and fades up 6px over 420ms; the Japanese never animates on its own. No letter-by-letter or glyph scramble effects: the user found them slow and confusing.

**The Mono Means Numerals Rule.** JetBrains Mono appears only for the intro timecode, counters and chapter numerals. Never for prose, labels or buttons.

**The Width Ladder Rule.** Expanded width (125) is for names and title cards; 112 for the opening headline, section and credit headings; 100 for anything read as a sentence.

## Layout

A single centered column of full-viewport scenes under one fixed top bar: 64px (56px under 900px), translucent so the ambient light reads through it. Horizontal gutter is `clamp(16px, 4vw, 56px)`; reading containers cap at 1280px plus gutters. Sections abut with no border rules; spacing and the mood change mark the cut.

- **Stage (opening):** a full-height (100svh) two-column grid, `1.25fr / 1fr` with a `clamp(32px, 6vw, 96px)` gap, vertically centered. Left: caption, headline, lead, body and actions stacked with 22px gaps. Right: the project index. A pill-shaped scroll cue sits centered 22px from the bottom.
- **Pinned chapters:** a sticky full-height stage inside a tall runway. The mission runway is 340svh with three lines switching at 30% and 62% progress; the converge runway is 260svh and completes its slide-in in the first 55%.
- **Works:** a normal vertical sequence. Each project is a two-column row, media `1.35fr` and info `1fr`, gap `clamp(28px, 5vw, 72px)`, `clamp(80px, 12vw, 160px)` apart; every other row flips media to the right. The section closes with a centered dashed end card.
- **Credits and Contact:** centered stacks with large vertical breathing room (`clamp(96px, 14vw, 180px)` and `clamp(80px, 12vw, 140px)`).
- **Static mode (under 900px or reduced motion):** pins release and all subtitle lines show stacked with 56px gaps; the opening and every work row stack to one column (media first), the scroll cue hides, chapter links collapse into a single "now playing" label, and opening and work actions stack full width.
- At 1080px chapter numerals hide; at 420px the CC badge hides.

### Named Rules
**The Black Frame Rule.** Imagery always sits in a Letterbox Black well at 16:10, filled by `object-fit: cover` and biased toward the top. Work frames and thumbnails carry soft corners (14px, 8px); converge shots stay near-square (4px). Screenshots belong to the works; the opening carries no imagery.

**The Fixed Layers Rule.** Only three things are fixed: the ambient light and grain behind the page (z-index -1, pointer-events none) and the top bar above it. Everything else scrolls or pins inside the flow.

## Elevation & Depth

Mostly flat surfaces in a lit room. Depth comes from the ambient light glowing behind the stage, from layered blacks (Stage Black page, Letterbox Black image wells, Stage Raised dialog), from translucent Stage Raised panels (the project index and end card at 55%) that let the light read through, and from translucent Stage Black scrims under floating chips. The top bar is the one glass surface: Stage Black at 62% with `backdrop-filter: blur(16px) saturate(1.2)`, so labels stay legible over moving colour. A film grain (SVG fractal noise at 7% opacity, stepping every 0.25s) sits over the ambient layer. The viewer's backdrop is black at 86%.

### Shadow Vocabulary
- **Frame drop** (`box-shadow: 0 30px 80px -30px rgba(0, 0, 0, .8), 0 0 0 1px rgba(242, 241, 238, .08)`): resting shadow under each work screenshot frame, plus a faint white edge ring so the black frame separates from the black stage.
- **Thumb ring** (`box-shadow: 0 0 0 1px rgba(242, 241, 238, .1)`, hover `0 0 0 2px var(--accent)`): edge ring on thumbnails; turns into the accent ring on hover.
- **Subtitle halo** (`text-shadow: 0 2px 14px rgba(0,0,0,.7)`): the legibility halo real subtitles carry, on subtitle translations.

### Named Rules
**The Resting Shadow Rule.** Only the work screenshot frames cast a shadow, and it is constant: it never grows, darkens or lifts on hover. Interaction shows by accent wipes, underline draws, image push-ins, colour return and the accent chip; the only movement off the surface is a 3px rise on a hovered thumbnail and a 4px nudge on index arrows.

## Shapes

Two families do almost everything. Every interactive control is a full pill (999px): buttons, chapter links, CC group and options, status pills, the screenshot chip, the scroll cue, intro skip. Every content container is softly rounded and grows with its size: thumbnails 8px, index rows 10px, work frames 14px, the index panel 16px, the end card 18px. Exceptions are deliberate and few: converge shots keep a near-square 4px, the developer portrait is a circle, the viewer dialog is 6px, the CC badge is a 3px outlined rectangle (the broadcast CC mark), viewer controls are circles, progress marks are 2px hairline bars, and the ambient leaks are soft-edged circles. The end card is the only dashed border, marking an open slot.

## Components

### Buttons
Confident pills that flood with the mood accent.
- **Shape:** full pill (999px), 48px tall, 22px side padding; large variant 56px / 28px. Leading or trailing 1.1em icon, 10px gap.
- **Solid:** Subtitle White fill, Stage Black text, Subtitle White 1px border. Primary action ("Watch the works", "Email VANT").
- **Ghost:** transparent, Subtitle White text, Hairline Strong border.
- **Hover:** an accent fill wipes across from the left (`scaleX` 0 to 1, 0.5s, ease-out-expo) under Stage Black text; the ghost border turns accent; icons nudge 3px right. **Active:** scale 0.97. **Focus:** 2px Subtitle White outline, 4px offset.

### Text Links
- Medium weight with optional leading icon; a 2px accent underline draws in left to right on hover (0.45s) and the text takes the accent. Used for repo, Discord and social links.

### Navigation
- **Top bar:** Stage Black at 62% with 16px backdrop blur and 1.2 saturation; wordmark "VANT" left in expanded 800; a Hairline bottom border appears once scrolled past 8px.
- **Chapters:** pills with a mono numeral and label in Caption Grey; hover fills Stage High; the current chapter (tracked at 50% viewport height) fills with the mood accent under Stage Black text. Under 900px the list hides and a single current-chapter label shows instead.
- **CC switch:** outlined pill group with a 3px-cornered "CC" badge and EN/ID options; the pressed option fills Subtitle White. Switching language re-runs the subtitle fade-up on visible lines.

### Ambient Light (signature)
- Fixed full-viewport layer of three 70vmax radial leaks reading `--amb-a/b/c`, screen-blended at 62/62/50% opacity, each floating on its own alternate ease-in-out loop (26s, 32s, 38s; translate up to ±22vw/26vh with scale 0.9 to 1.2). A grain layer (inset -50%, 7% opacity, `steps(4)` over 1s) jitters above it. The mood is set from the section crossing the viewport middle (`data-mood`); inside the works the last project to pass the middle wins; a hovered index row overrides both. Reduced motion stops both loops; the colour remains.

### Subtitle Line (signature)
- Pair per the Subtitle Pair Rule. Translation reveal: the full line fades up 6px over 420ms on the entrance ease; never a character-by-character scramble. In pinned chapters, lines enter by fading up 18px from 8px blur and leave upward the same way; a three-tick progress row (Hairline Strong idle, accent when reached) marks position.

### Stage Opening
- Left column: accent Japanese caption, Display headline, Lead paragraph in Subtitle White, Caption Grey body, then solid and ghost buttons (12px gap). Once the intro clears (`.is-ready`), each line settles in from 18px below (opacity 0.9s, transform 1s, entrance ease) on a stagger of 0, 80, 160, 220, 280ms, and the project index follows at 340ms. The scroll cue is a 26 × 42px outlined pill (Hairline Strong) whose 3 × 8px accent dot drops 12px and fades on a 2s loop; it hides under 900px.

### Project Index (signature)
- The opening's map of the works: a translucent panel (Stage Raised at 55%, 1px Subtitle White at 10% border, 16px corners, `22px 8px 8px` padding) titled "What we've made" in Caption Grey 600. Rows are links (16px padding, 10px corners) separated by 8% white hairlines: expanded project name top-left, accent status top-right, one-line Caption Grey description below, a Timecode Grey arrow bottom-right. **Hover / Focus:** a 6% white wash fills the row, neighbouring hairlines hide, the arrow nudges 4px and turns accent, and the ambient light previews that project's mood. The last row, "Your project here", is set at normal width in Caption Grey and has no status.

### Work Row (signature)
- **Frame:** a button (zoom-in cursor) opening the viewer; Letterbox Black, 16:10, 14px corners, Frame drop shadow. The image starts at 1.06 scale and settles to 1 over 1.2s when revealed, pushing to 1.03 on hover. A "View screenshots · N" chip (Stage Black 82%, pill, 8px 14px) sits 12px from the bottom-right and fills with the accent on frame hover.
- **Thumbnails:** a row of up to 140px-wide 16:10 buttons (8px corners, 10px gap) at 70% opacity; hover brings them to full opacity, raises them 3px and draws a 2px accent ring.
- **Info:** status pill and kind label (Caption Grey 0.9rem), expanded Title name, Caption Grey description (52ch), "Built with" stack line (Timecode Grey prefix), then links and buttons (12px × 24px gaps).
- **Reveal:** the media column opens like a shutter: `clip-path: inset(12% 6% 12% 6% round 14px)` to `inset(0 round 0)` over 1.2s on the entrance ease; the info column uses the standard 22px fade-up reveal. Reduced motion drops the clip.
- Each row declares its own mood; `.work--flip` puts media on the right; under 900px rows stack media-first.

### End Card
- Closes the works: a centered "Your project here" Subtitle pair (700, `clamp(1.8rem, 3.4vw, 3rem)`), a Caption Grey line (46ch) and a ghost button, on Stage Raised at 55% with an 18px-cornered 1px dashed border (Subtitle White at 18%). Declares the `next` mood.

### Status Pill
- Small pill (0.74rem, 600) with a 6px dot. **Live:** accent fill, Stage Black text. **In progress:** outlined with a hollow ring dot. **Open source:** outlined with a solid dot.

### Viewer
- Native dialog, Stage Raised, Hairline Strong border, 6px corners, opens with a 14px rise from 0.98 scale (0.45s). Image sits on Letterbox Black; bottom bar holds a mono caption and three 42px circular controls that invert to Subtitle White on hover. Arrow keys page screenshots.

### Intro Title Card
- Runs once per session (skipped under reduced motion): a running 24fps timecode, "VANT" resolving from blur and wide tracking, the JP/EN subtitle under it, then two black bars split vertically off screen (0.7s) at 1.65s. Any key, wheel, click or the outlined "Skip intro" pill ends it and releases the stage opening.

## Do's and Don'ts

### Do:
- **Do** bring colour in as graded light: set a chapter's mood (three ambient hues plus one light accent) and let it cross-fade (The Graded Light Rule).
- **Do** keep surfaces, frames and body text on the neutral ladder; use the accent only from the list in Colors.
- **Do** state anything important as a Subtitle pair: accent Japanese line in Noto Sans JP over a white translation that fades in.
- **Do** show "on" as a light fill with Stage Black text (accent, or Subtitle White for the CC option).
- **Do** put screenshots in a Letterbox Black 16:10 frame (14px corners in the works, 8px for thumbnails) and keep them in the works.
- **Do** make controls full pills and give them the accent wipe or underline-draw hover.
- **Do** use `cubic-bezier(.16, 1, .3, 1)` for entrances and state changes, and `cubic-bezier(.65, 0, .35, 1)` for cuts, cross-fades and mood changes.
- **Do** give every pinned or scroll-driven sequence a static fallback for widths under 900px and for reduced motion.

### Don't:
- **Don't** put ambient hues on text, controls or surfaces, or use the accent as a dark fill or body text colour.
- **Don't** cut between moods; let the 1.6s / 0.8s cross-fade carry the change, and only let the works and the index hover change mood inside a chapter.
- **Don't** add a light theme, neon glow on type, or a neon AI-startup hero; don't build a grid of cards; works read as alternating frame-and-text rows.
- **Don't** separate sections with hairline rules or reintroduce a scrub timeline or per-chapter timecodes.
- **Don't** use JetBrains Mono for anything but numerals, counters and the intro timecode.
- **Don't** add shadows beyond the resting frame drop, or grow shadows and lift cards on hover (The Resting Shadow Rule).
- **Don't** animate the Japanese source line on its own; only the translation fades in.
