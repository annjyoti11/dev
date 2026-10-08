# Zenith Client App — Interactive Design Preview

Standalone mobile-first HTML/CSS/JavaScript design prototype, contained in `zenith-app-preview/`.

## Purpose
Build and review the client experience screen by screen, before implementing the agreed design in Flutter. The approved Home visual direction and the Earlier Today activity model are the starting points. Screens 03 (Training Overview), 04 (Complete Workout Plan), 05 (Individual Workout Day), 06 (Nutrition Overview), and 07 (Complete Nutrition Plan) have now been redesigned for mobile review.

## Routes
- `index.html` — Home; focus card, daily metrics and contextual post-meal action.
- `earlier-today.html` — recorded versus unrecorded tasks; Today / Week tabs.
- `training.html` — Screen 03 Training Overview: today’s recovery state, weekly momentum, next session preview, interactive seven-day selection, and sample coaching focus.
- `workout-plan.html` — Screen 04 Complete Workout Plan: four-week selector, week-accurate dated schedule, expandable exercise previews, and concise coaching rationale.
- `workout-day.html?week=1&day=4` — Screen 05 Individual Workout Day: **one exercise / one set at a time** during the active session, weight + reps entry, completion confirmation, rest timer and next-set transition.
- `nutrition.html` — Screen 06 Nutrition Overview: premium energy ring, macro progress, clear dinner action, expandable sample meal timeline, and ledger-based demo totals.
- `nutrition-plan.html` — Screen 07 Complete Nutrition Plan: seven-day sample selector, planned energy allocation, practical portions, optional food guidance and a connected Thursday dinner detail.
- `meal.html` — sample planned dinner and a functional demo log action.
- `progress.html`, `profile.html` — exploratory first-pass supporting pages; **not final approved designs**.

Training Overview uses a fixed illustrative week (Monday 5–Sunday 11 October 2026). Thursday is recovery; Friday is Upper Body; Saturday is Lower Body. The three recorded sessions, progress indicator, dates, movements and coach focus are fictional. Previewing the next session expands an inline exercise list; tapping another day updates the day details without navigation. The complete plan is implemented as Screen 04, and Screen 05 illustrates exercise prescriptions and set completion in browser-only demo state. Real workout execution, exercise videos, device integration and coaching backend are not implemented.

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
- Review and approve Screen 04 as a visual concept before porting it to Flutter. Screen 05 now provides a fictional Friday session with start, per-set logging, undo, finish, reset and reopen behavior.

## Complete Workout Plan (Screen 04)
- Four-week fixed sample dates: 28 Sep–4 Oct, 5–11 Oct, 12–18 Oct, 19–25 Oct 2026.
- Current sample week is Week 2. Choosing another week changes only the viewed plan structure; it does not advance program state or invent new completion records.
- Mon/Tue/Wed in Week 2 are sample recorded sessions; Thursday and Sunday are recovery; Friday and Saturday are scheduled.
- Tap a day to expand example movements or recovery guidance. Only one day expands at a time. Week changes close expanded day details.
- Coaching guidance is compact and disclosure-based; no internal prompts, review notes or publication-state data are exposed.
- Training links to this page and the back arrow returns to Training. No workout session start or logging is implied.
- The CSS, HTML and JS are mobile responsive, but a real-device visual check is still required before design sign-off.

## Screen 05 — Individual Workout Day
- Training Overview's main button opens Friday's sample session (or Saturday after Friday's sample is completed). From the Complete Plan, expand a training day to open its detailed page.
- Day/week query coordinates are zero-based: `week=1&day=4` is Friday 9 October in sample Week 2; all seven days across four weeks can be inspected. Recovery days render no workout or logging controls. Invalid day/week values show a safe empty state.
- The five Friday movements match the Complete Plan: Dumbbell Bench Press, Lat Pulldown, Seated Row, Dumbbell Shoulder Press and Triceps Pushdown. Prescriptions and movement guidance are illustrative, not live coaching advice. Abstract equipment icons are not instructional exercise demonstrations.
- Only the sample Friday of Week 2 allows simulated set logging. **Start** switches to a distraction-free single-set screen (without bottom navigation). Enter actual demo **weight (kg) and repetitions**, then press **Set completed** to save performance and open the prescribed rest timer. The countdown uses a saved timestamp, supports **Skip rest**, **+15 seconds**, and **Edit last set** to fix accidental entries. At timeout or skip, only the next set appears. After set 15 the session goes straight to completion, with no unnecessary final rest. Leaving/reopening preserves progress and rest deadlines. Completion updates Training's momentum to 4/5 and makes Saturday next; the Complete Plan labels Friday `DEMO LOGGED`. Profile reset or the session's reset button clears the demo log.
- Browser session storage key: `zenith-preview-workout-v1`, payload schema version 2. Old toggle-list prototype progress is intentionally reset because it had no weight/rep evidence. No account identity, sensors, network requests, notifications or health data synchronization. Closing the tab may clear demonstration progress depending on the browser.
- Completion is triggered only after **15 sequential, individually confirmed sample set records**, each with a validated weight and rep count. Records can be corrected during rest via Edit last set. Logged sets are not real workouts.
- Verification: script compilation, ready/focused/rest/complete rendering, validation, logging and correction of weight/reps, timer deadline persistence and expiry, all 15 sequential transitions, recovery-day boundaries, reset/reopen and cross-page Training/Plan updates. Visual behavior on real devices still requires review and sign-off.

## Screen 06 — Nutrition Overview

- The sample view is fixed at Thursday 8 October 2026, in the evening. It is **not** connected to live device time, an authenticated member, or a coaching API.
- Explicitly fictional ledger (kcal / protein g / carbs g / fat g):
  - Breakfast, already recorded: 410 / 28 / 50 / 11
  - Lunch, already recorded: 710 / 41 / 82 / 24
  - Dinner, initially planned: 620 / 42 / 78 / 16
  - Optional snack, **never logged in this prototype**: 260 / 29 / 10 / 11
  - Target, example only: 2000 kcal / 140 g protein / 220 g carbs / 62 g fat
- Before dinner: 1120 kcal and 69 g protein, 132 g carbs, 35 g fat; 2 of 3 main meals recorded.
- After dinner is confirmed in the demo: 1740 kcal and 111 g protein, 210 g carbs, 51 g fat; 3 of 3 main meals recorded. Snack remains unlogged. Planned calorie values are approximate rounded examples.
- The calorie ring uses the same computed totals as the calorie text and macro progress bars. Calories represent **logged demo entries only**, not all planned meals or inferred actual intake.
- Breakfast, Lunch, and optional Snack offer expandable read-only details; Dinner opens `meal.html?from=nutrition`. Logging from that route returns to Nutrition. Logging from Home returns Home. All states remain in browser session storage.
- The meal detail currently simulates consuming the planned portion; in production the client should confirm foods and quantities eaten, including substitutions, before recording a nutrition log. Never treat a planned meal as automatically eaten.
- No external food photos, AI, coaching decisions, database writes, calorie estimation APIs, or health-record connections.
- HTML CSS/JS uses separate `nutrition.css` and the shared `app.js`. Test on phone for readability and touch targets before transferring approved visuals to Flutter.


## Screen 07 — Complete Nutrition Plan

- Standalone page `nutrition-plan.html` with shared `app.js` and scoped `nutrition-plan.css`; the Nutrition dashboard contains a dedicated “Your complete food plan” entry.
- Sample week: Monday 5 October through Sunday 11 October 2026. Thursday is selected by default and can also be loaded using `nutrition-plan.html?day=3`. Tapping any day updates the menu, selected state, date, planned energy total and expandable portions, and updates the query string for revisits.
- Thursday planned example matches the existing Nutrition and Dinner previews: 410 kcal oats/curd/fruit breakfast; 710 kcal rice/dal/paneer lunch; 620 kcal rohu fish dinner (including 150 g fish, 200 g rice, 100 g dal, 100 g bottle gourd, 1 tsp oil); optional 260 kcal snack. Total planned allocation 2,000 kcal, with 140 g protein as an illustrative target. The optional snack contributes to the **plan**, not the logged intake unless recorded.
- Other weekdays are fictional illustrative menu variants and **read-only**. Every day has four slots and an illustrative 2,000 kcal allocation, including an optional snack. These energy values are examples, not verified calculations from a food database or advice for a real client.
- Only the Thursday dinner links to the current meal detail page using `meal.html?from=plan`. Both the back arrow and secondary Back action return to the complete plan; the simulated logging action also returns there. The existing `from=nutrition` and Home flows still work unchanged.
- On Thursday, Breakfast and Lunch show demonstration-recorded status consistent with Nutrition Overview. Dinner reflects the browser-only `state.dinner` log. Other days are deliberately shown as planned, with no invented past or future logging.
- Expandable portions, clear time slots, concise optional food guidance and the original app navigation. This is **not** a published plan, live coaching recommendation, allergy-aware diet, or system of record; a real product needs coach approval, actual food intake confirmation, individualized constraints and verified nutrition figures.
- Verification should include the day selector, back/reopen state via URL, meal expansion/collapse, Thursday dinner action, absence of invented logs on non-Thursday days, and cross-page consistency before design sign-off.

