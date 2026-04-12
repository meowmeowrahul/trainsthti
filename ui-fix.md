# Minimalist UI Implementation Guidelines (v2)

Scope: frontend UI only in /frontend.  
Constraint: ignore login/auth logic for this pass.  
Goal: deliver a calm, operational, minimalist dashboard with zero AI-slop signals.

## 1) Design Direction (Single Source of Truth)

### 1.1 Style definition

- Tone: utilitarian minimalism (quiet, dense, readable).
- Rule: information clarity over visual personality.
- Rule: no decorative prose, no ornamental effects, no “designy” language.

### 1.2 Hard constraints

- One background treatment for the full app.
- One card surface style across all sections.
- One elevation level for all cards.
- One accent color used only for status/action emphasis.
- Maximum two font weights per section.

### 1.3 Anti-slop checklist (must pass before merge)

- No filler copy (for example: “built for clarity”, “essential signals”, “live station view”).
- No repeated metric storytelling in multiple blocks.
- No style drift between sections.
- No component that exists only to decorate.

---

## 2) Information Architecture (What stays on screen)

### 2.1 First viewport content

- Keep only:
  - Current crowd level
  - Last sync time
  - Crowd estimate
  - Refresh action
- Remove duplicate summaries that repeat the same values.

### 2.2 Section contract

- Overview: single compact summary block.
- Live metrics: only raw metrics from backend response.
- History: only time window + sample count + average crowd.

### 2.3 Content rules

- Labels are nouns, not slogans.
- Microcopy is optional; if used, max 6 words.
- Empty states are one short sentence, action-oriented when possible.

---

## 3) Visual System Implementation

### 3.1 Token-first styling

- All colors, borders, text-muted, and elevation must come from CSS variables in tailwind.css.
- Do not introduce new hardcoded hex/rgba values inside components.
- Add only missing tokens; do not expand beyond minimal needs.

### 3.2 Spacing and rhythm

- Use one spacing scale for all cards and sections.
- Remove oversized vertical gaps that create false hierarchy.
- Keep section headers compact and visually consistent.

### 3.3 Typography

- Keep heading scale tight (avoid oversized hero treatment for dashboard UI).
- Increase muted text contrast one step where needed.
- Avoid all-caps tracking-heavy labels unless functionally necessary.

---

## 4) Interaction and State Behavior

### 4.1 Status communication

- Keep one status channel for sync/error/loading.
- Surface status near primary controls.
- Keep aria-live polite for async updates.

### 4.2 Navigation behavior

- Desktop and mobile nav must expose identical destinations.
- No hidden destinations or style-only nav items.
- Keep anchor scroll behavior predictable and fast.

### 4.3 Refresh behavior

- Refresh button must have clear busy/idle state.
- Prevent visual jump during refresh.
- Do not add animations beyond subtle state feedback.

---

## 5) Accessibility Minimum Bar

### 5.1 Contrast

- Meet WCAG AA for all text and UI controls.
- Audit all muted text on dark surfaces and raise contrast where borderline.

### 5.2 Keyboard and focus

- Every interactive element gets a visible focus state.
- Mobile menu and refresh controls are fully keyboard-operable.

### 5.3 Semantics

- Preserve heading hierarchy.
- Keep buttons for actions, links for navigation.
- Keep live region updates concise and meaningful.

---

## 6) Implementation Sequence (Minimalist-first)

1. Remove duplicated data blocks and decorative copy.
2. Normalize cards, borders, elevation, and spacing.
3. Replace component-level hardcoded colors with tokens.
4. Tighten typography and label contrast.
5. Final accessibility pass (contrast, keyboard, live regions).

---

## 7) Definition of Done

- First screen communicates state in under 3 seconds.
- No repeated values across overview/state blocks unless necessary.
- No new hardcoded visual values inside component files.
- UI passes keyboard navigation and basic screen-reader status checks.
- Build succeeds and no new lint issues are introduced.

---

## 8) Out of Scope

- Login/authentication logic and routing behavior.
- New product features, pages, or advanced analytics visuals.
- Motion-driven redesign.

This is a minimalist implementation standard for the current UI, not a brand redesign.
