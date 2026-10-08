# Zenith Client App — Interactive Design Preview

Standalone mobile-first HTML/CSS/JavaScript design prototype, contained in `zenith-app-preview/`.

## Purpose
Build and review the client experience screen by screen, before implementing the agreed design in Flutter. The approved Home visual direction and the Earlier Today activity model are the starting points. Screens 03 (Training Overview) and 04 (Complete Workout Plan) have now been redesigned for mobile review.

## Routes
- `index.html` — Home; focus card, daily metrics and contextual post-meal action.
- `earlier-today.html` — recorded versus unrecorded tasks; Today / Week tabs.
- `training.html` — Screen 03 Training Overview: today’s recovery state, weekly momentum, next session preview, interactive seven-day selection, and sample coaching focus.
- `workout-plan.html` — Screen 04 Complete Workout Plan: four-week selector, week-accurate dated schedule, expandable exercise previews, and concise coaching rationale.
- `meal.html` — sample planned dinner and a functional demo log action.
- `nutrition.html`, `progress.html`, `profile.html` — exploratory first-pass supporting pages; **not final approved designs**.

Training Overview uses a fixed illustrative week (Monday 5–Sunday 11 October 2026). Thursday is recovery; Friday is Upper Body; Saturday is Lower Body. The three recorded sessions, progress indicator, dates, movements and coach focus are fictional. Previewing the next session expands an inline exercise list; tapping another day updates the day details without navigation. The complete plan is implemented as Screen 04; individual exercise prescriptions, set tracking and workout execution remain future screens.

Bottom navigation is connected. The sample dinner can be logged from its detail page, which updates Home and Earlier Today. The demo post-meal walk and hydration controls also update sample state. Profile includes a reset control.

## Preview
GitHub Pages folder path: `/dev/zenith-app-preview/`.
Expected URL after GitHub Pages publishes the latest master commit:
https://annjyoti11.github.io/dev/zenith-app-preview/

Local preview from the repository root:
```sh
python3 -m http.server 8080
```
Open `http://localhost:8080/zenith-app-preview/`.

## Implementation safeguards
- No frameworks, no external fonts, no CDN, no build process.
- Reuses the repository's approved brand symbol from `../assets/zenith-symbol-white.svg`.
- Scoped CSS and relative paths; unrelated website and school-preview files are unchanged.
- Responsive on mobile and desktop, accessible button labels, noindex meta tag, reduced-motion support.
- No production API calls, authentication, notifications, real step sensors, tracking, or member records.
- All displayed values and member identity are **illustrative**; the demo state persists only within this browser tab session using `sessionStorage`.
- Unrecorded activities are not described as definitely incomplete. The weekly chart is explicitly illustrative.
- Do not use this static preview for real client health or membership information. Noindex is not access control.

## Roadmap
Review each deeper screen in sequence, replace exploratory layouts with approved HTML concepts, test navigation / responsive layouts / state transitions, and only then port to Flutter.

## Training design sign-off checklist
- Verify on narrow Android and iPhone widths; typography, scroll, active navigation and touch targets.
- Check preview open/close, day selection, screen revisit and empty/long-content variants.
- Sample data must never be represented as a real prescription or live coaching instruction.
- Review and approve Screen 04 as a visual concept before porting it to Flutter. Screen 05 will address the individual workout-day experience.

## Complete Workout Plan (Screen 04)
- Four-week fixed sample dates: 28 Sep–4 Oct, 5–11 Oct, 12–18 Oct, 19–25 Oct 2026.
- Current sample week is Week 2. Choosing another week changes only the viewed plan structure; it does not advance program state or invent new completion records.
- Mon/Tue/Wed in Week 2 are sample recorded sessions; Thursday and Sunday are recovery; Friday and Saturday are scheduled.
- Tap a day to expand example movements or recovery guidance. Only one day expands at a time. Week changes close expanded day details.
- Coaching guidance is compact and disclosure-based; no internal prompts, review notes or publication-state data are exposed.
- Training links to this page and the back arrow returns to Training. No workout session start or logging is implied.
- The CSS, HTML and JS are mobile responsive, but a real-device visual check is still required before design sign-off.
