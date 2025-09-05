# SKAI Agents — Identity Starter

## Color Palette (Accessible, Professional)

- Primary — Deep Blue: `#0A2A43` (WCAG-friendly on white; evokes trust/tech)
- Secondary — Electric Indigo: `#5A6FF7` (accents, CTAs; check contrast on dark)
- Accent — Teal: `#1BB5A6` (success/active states; sparing use)
- Warning — Amber: `#FFB020`
- Danger — Crimson: `#D6455D`
- Neutrals
  - Ink: `#0B1320`
  - Graphite: `#2C3440`
  - Slate: `#4B5563`
  - Ash: `#6B7280`
  - Mist: `#9CA3AF`
  - Cloud: `#E5E7EB`
  - Snow: `#F9FAFB`

Guideline: Maintain AA contrast (4.5:1 for body text). Reserve `#5A6FF7` for buttons/links with dark text on light backgrounds or white text on deep blue.

## Typography (Google Fonts Only)

- Headings: Inter (700/600) — geometric, modern, excellent on web UIs.
- Body: Inter (400/500) — high readability; consider optical size.
- Mono (code): JetBrains Mono (400/600) — for code, JSON, CLI snippets.

Fallback stack examples:

- Headings/Body: `Inter, "Helvetica Neue", Arial, sans-serif`
- Mono: `"JetBrains Mono", SFMono-Regular, Menlo, Consolas, monospace`

Type scale (starter):

- H1: 36–44px / 1.2
- H2: 28–32px / 1.25
- H3: 22–24px / 1.3
- Body: 16–18px / 1.6
- Mono: 14–16px / 1.5

## Logo Concept Directions

1. Contract Mark (JSON Bracket)

- Bracketed "S" or agent node within `{ }`, signaling schema/contracts.
- Rationale: Owns JSON-first territory visually. Works as favicon.

2. Signal Grid (Agent Network)

- Modular nodes forming a subtle "A" or "S"; conveys routing/reliability.
- Rationale: Speaks to orchestration, model choice, and fallbacks.

3. Forward Pointer (Deterministic Flow)

- Angular arrow/chevron built from right-angle segments (like brackets).
- Rationale: Progress, direction, and structure (no chaos).

Wordmark

- Use a clean, geometric sans: Inter Bold or similar.
- Kerning slightly tightened; letterforms all-caps or Title Case: "SKAI Agents".
- Keep "SKAI" weight equal or slightly heavier than "Agents".

## Visual Guidelines for Digital Use

- Layout: Generous whitespace, grid-based sections, scannable blocks.
- UI: Primary deep blue headers; indigo CTA buttons; neutral backgrounds.
- Components: Cards with 8–12px radius, 1px neutral borders, subtle shadows.
- Data: Prefer neutral backgrounds with high-contrast code blocks.
- Icons: Outline icons with 2px stroke; avoid playful/rounded cartoon styles.
- Illustration: Abstract, geometric motifs; avoid 3D mascots.
- Accessibility: Enforce AA/AAA; test link/CTA contrast; focus states visible.

## Usage Examples

- Buttons: Primary (indigo) on white with white text; hover darken by 6–8%.
- Sections: Dark hero on deep blue with white text; supporting indigo/teal accents.
- Docs: Light theme default; monospace for JSON; copy-to-clipboard visible.

## Asset Starter Checklist

- Favicon: `{}` monogram in deep blue/white.
- Social: 1200×630 banners with bracket monogram and tagline.
- Icons: 16–512px sizes, consistent stroke.
- Logo lockups: Horizontal, stacked, and monogram-only.
