# Zenith Client App — Interactive Design Preview

Standalone mobile-first HTML/CSS/JavaScript design prototype, contained in `zenith-app-preview/`.

## Purpose
Build and review the client experience screen by screen, before implementing the agreed design in Flutter. The approved Home visual direction and the Earlier Today activity model are the starting points. Screens 03–10 are now available for mobile review, including Training, Complete Workout Plan, Live Workout Day, Nutrition, Complete Nutrition Plan, Individual Meal Detail, Progress Overview, and Personal Profile & Coaching Journey. Login and Profile Edit have also been added as companion screens.

## Routes
- `index.html` — Home; focus card, daily metrics and contextual post-meal action.
- `earlier-today.html` — recorded versus unrecorded tasks; Today / Week tabs.
- `training.html` — Screen 03 Training Overview: today’s recovery state, weekly momentum, next session preview, interactive seven-day selection, and sample coaching focus.
- `workout-plan.html` — Screen 04 Complete Workout Plan: four-week selector, week-accurate dated schedule, expandable exercise previews, and concise coaching rationale.
- `workout-day.html?week=1&day=4` — Screen 05 Individual Workout Day: **one exercise / one set at a time** during the active session, weight + reps entry, completion confirmation, rest timer and next-set transition.
- `nutrition.html` — Screen 06 Nutrition Overview: premium energy ring, macro progress, clear dinner action, expandable sample meal timeline, and ledger-based demo totals.
- `nutrition-plan.html` — Screen 07 Complete Nutrition Plan: seven-day sample selector, planned energy allocation, practical portions, optional food guidance and a connected Thursday dinner detail.
- `profile-20261009.html` — Screen 10 Personal Profile & Coaching Journey (updated with an Edit Profile entry, editable demo name and preferences): fictional member identity, Transformation with included membership, current training phase, coach-reviewed milestones, connected sample achievements, privacy disclosures, and confirmation-protected demo reset. `profile.html` and the earlier `profile-20261008.html` redirect here.
- `progress-20261008.html` — Screen 09 Progress Overview: weekly training evidence, dynamic sample activity and hydration, and explicitly illustrative body trends. `progress.html` redirects here.
- `meal.html` — Screen 08 Individual Meal Detail: illustrated food plate, adjustable actual portions, dynamic nutrition estimates, save/edit/remove demo meal entry.
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


## Screen 08 — Individual Meal Detail

- Standalone `meal.html`, with `meal-detail.css` and shared `app.js`. Distinct stylized vector food artwork and ingredient icons are illustrations, not actual food photos or technique instructions.
- The example planned Rohu fish dinner remains 620 kcal / 42 g protein / 78 g carbohydrate / 16 g fat. The five planned foods: fish 150 g, cooked rice 200 g, dal 100 g, bottle gourd 100 g and olive oil 1 teaspoon. Values are estimated illustrative allocations, not verified food-database figures.
- Before recording, clients can change each sample portion with +/- (25 g increments for the four solid foods and 0.5 tsp for oil); quantities can reach zero, and an entirely empty meal cannot be recorded. Energy and macro estimates recalculate from the edited amounts.
- Press “Record what I ate” to save `dinner=true` and `dinnerLog.portions` in browser session storage. This replaces the earlier yes/no-only simulated dinner logging, without affecting Flutter or production data.
- On reopening, the meal displays **recorded** values and quantities, with “Edit recorded portions” and a confirmation-protected “Remove demo entry”. Canceling edits does not change the saved entry. Removing the dinner also clears the dependent sample after-meal walk and restores the baseline Nutrition ledger.
- The Nutrition Overview calculates totals from breakfast + lunch + the *recorded* dinner portions: 1120 kcal before dinner and 1740 kcal for the unchanged planned serving. The meal row and dinner focus card show the saved dinner estimate. Altered portions change these figures; the weekly plan continues to show the original **planned** 620 kcal, plus an explicit label for the actual demo energy when recorded.
- The prior `dinner=true` flag without a `dinnerLog` payload is interpreted as the unmodified planned meal for backward compatibility. Profile Reset clears the detailed dinner log.
- Entry routes preserve origin: `meal.html?from=nutrition` returns to Nutrition, `?from=plan` returns to Thursday's complete plan, and default Home returns Home.
- This is an interactive **design preview**, not an allergy-aware food diary, nutrient database, a diagnosis, or a published prescription. Food substitutions, barcode scanning, photo recognition and coaching/backend synchronization are not implemented.
- Acceptance checks: planned meal → adjust → estimated totals → record → return → refresh/reopen → edit/cancel/save → remove/confirm → verify final Nutrition, Home and Plan states. Real-device screen appearance and touch interactions still require visual review.


## Meal preview cache isolation (8 October 2026)

- Screen 08 is also published as `meal-20261008.html`, a self-contained snapshot with inline base CSS, meal-detail CSS and application JavaScript. This avoids mixed-version asset caching in mobile browsers when reviewing the design.
- The previous `meal.html` redirects to the new preview while preserving the `?from=nutrition` / `?from=plan` origin and URL fragment. The shared app routes directly to the new path.
- Other prototype HTML pages have a refreshed version parameter on their shared app JS and base CSS. This is cache-busting, not a CDN/browser cache purge; GitHub Pages publication still needs to complete.
- The bundled Screen 08 is a review snapshot. Future changes to its source styles or script require regenerating a new uniquely versioned snapshot, rather than assuming the bundle updates automatically.

## Screen 09 — Progress Overview

- Primary review URL: `progress-20261008.html` — a self-contained HTML file bundling the current `styles.css`, `progress.css`, and shared `app.js`. Its distinct URL avoids mixed-version stylesheet/script caching. `progress.html` now redirects, preserving query and hash.
- Premium progress hierarchy: weekly interpretation → three compact headline metrics → **Training / Activity / Body** selectable views.
- Training reads `zenith-preview-workout-v1` browser session state; 3 of 5 sessions before the sample Friday workout, 4 of 5 after completion. Thursday is a scheduled recovery day, not an overdue session. The calendar distinguishes recorded, planned and recovery statuses. If any sample weight-and-rep data exists, the most recent set is shown; **one workout must not be described as a strength trend**.
- Activity shows **fixed illustrative** 6,420 of 8,000 steps, live-to-demo water value from `zenith_app_preview_demo_1` (starting 1,800 ml; buttons add 250 ml up to 2,500 ml), and the current recorded/main-meal and post-meal-walk states. These are demo records only, not real sensors.
- Body offers separate **Waist** and **Weight** trend examples with four fictional measurements and a clearly identified illustrative chart. No client body data or medical records are linked. A real product must use verified check-in metrics, contextual coach review and appropriate privacy controls.
- Interactive controls update their visible selections, and revisiting Progress reflects the latest session/hydration state. Cross-tab navigation remains available. Existing Home, Training, Nutrition, Profile and meal preview routes remain untouched apart from shared script version refresh.
- The Progress tab in newer shared `app.js` navigates to the new bundled page. Older standalone bundles still linking to `progress.html` are supported by its redirect.
- This is **not** a data-backed coaching dashboard, a measurement tracking API, a step sensor integration or a validated nutrition tracker. Real-device visual sign-off and backend integration are separate work.
- Acceptance checks: create initial state → navigate Training/Activity/Body → interact → log demo water/workout → refresh/reopen → confirm weekly stats, recent recorded sets and final state; verify Body never claims hypothetical values as real.

- `login-20261009.html` — Premium login concept with email/mobile method selector, mock verification code and explicit no-authentication disclosures.
- `profile-edit-20261009.html` — Connected, browser-only Profile Edit form (name, gender, personal fitness focus, preferred training time).
## Screen 10 — Personal Profile & Coaching Journey

- Preview URL: `profile-20261008.html`. Like Meal and Progress, this cache-isolated page bundles base styles, scoped `profile.css`, and the current shared `app.js`. Legacy `profile.html` redirects here with query and fragment preserved; previous bundles continue to function through the redirect.
- Profile identity `Aarav Sharma` is **fictional**. No real member identity, email, phone, account ID, or coach-chat connection is present.
- Illustrative Transformation overview: Week 02/12 in the **12-Week Transformation**, which **includes gym membership**. The currently presented **Foundation Strength** block (Week 02/04) is a training phase inside the Transformation, not another plan or membership payment. No expiry, renewal or payment status is invented.
- Four conceptual journey stages: program introduction, Foundation Strength current block, coach review at the end of the four-week block, and a future phase decided after coach approval. Never represent an upcoming review as a real scheduled appointment or assume the system has published the next training phase.
- Sample highlights read the browser-only workout and daily state. Training sessions: 3/5 initially and 4/5 after the recorded Friday sample. Meals: 2/3 initially and 3/3 when dinner is logged. The progress and nutrition links use their existing prototype screens.
- Coach guidance is explanatory, not real messaging or assignment. The coach retains approval for consequential changes proposed by Anvaya.
- **Account & privacy** uses disclosures instead of inert mock action buttons. It explicitly states what identity, membership and data are unavailable. No payment, contact or personal edit UI is falsely advertised as operational.
- **Preview controls** require a second confirmation before clearing browser-only dinner, dependent walking activity, water additions, and the full sample 15-set workout. Cancel keeps everything intact. Reset writes a compatible version-2 workout state for the Live Workout page.
- Acceptance check: open → inspect roadmap and sample figures → log an example workout or meal → revisit Profile → confirm updated achievements → open reset dialog → cancel or confirm → reopen all affected tabs → verify final user-visible and storage states. Real-device visual testing and Flutter implementation remain separate tasks.

## Companion screens — Login and Profile Edit (9 October 2026)

**Login:**
- Open `login-20261009.html`. The user may select Email or Mobile (+91), enter a syntactically valid example value, and advance to the verification design. The page states clearly that no message was sent. A sample code `246810` is displayed visibly on the page and accepts that code only for the interactive walkthrough.
- This is deliberately **not authentication**. No email, SMS, identity provider, API call, token issuance, secure OTP delivery, or authenticated session exists. The success message says so; links then open the preview Home and coaching journey. Input identifiers are not written to persistent preview storage.
- Entire preview is bundled as a single HTML file with inline CSS and JavaScript, preventing mixed stale versions.

**Profile Edit:**
- Open `profile-edit-20261009.html` directly or via the Edit your details action on `profile-20261009.html`. Name, Gender, Personal fitness focus and Preferred training time are editable and validated.
- Saving records only `zenith-preview-profile-v1` in browser `sessionStorage` and navigates to the new coaching journey. The dynamic demo name also appears in Home greeting. The Profile's Personal details section reflects the selected values.
- Cancel returns to Profile with no changes. Invalid values or unsafe name markup are rejected; rendered name fields are HTML-escaped. A profile reader rejects malformed stored names.
- Personal focus is **a preference**, not a change to a coach-approved goal or published plan. Member ID, membership validity, billing, medical information, email and phone verification are not editable in the prototype.
- The new `profile-20261009.html` keeps the previously approved coaching roadmap and is self-contained to avoid browser cache mismatches. Both `profile.html` and `profile-20261008.html` redirect to the new snapshot.
- The existing demo activity Reset intentionally does **not** wipe personal demo preferences: it clears simulated food, hydration, walking and workout activity only.

**Verification:**
- Test email/mobile validation → verification → invalid/valid sample code → demo-success screen → Home.
- Test Profile Edit invalid name → successful save → reopened Profile → Home greeting → Personal details → cancel another edit → verify saved values unchanged.
- Both companion screens are prototype-only; production OTP, data permissions, server validation, authenticated profile updates and real-device visual sign-off remain future tasks.
