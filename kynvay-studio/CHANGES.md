# KYNVAY / Zenith Client App — Approved Design Implementation Ledger

Updated: 15 November 2026

## Source of truth

The owner supplied `clientapp.zip` containing **23 image boards** (1536 × 1024 PNG each), showing multiple mobile screens, component details, and the approved bright Home appearances. The boards are the visual reference for this prototype; they are **not** editable HTML or Flutter source files.

The earlier generic `kynvay-studio` dashboard has been replaced. This revision follows the uploaded Zenith Fitness Hub client design system:
- Zenith Fitness Hub wordmark in the app header, dark navy text, bright blue CTAs, white background, blue-selected segmented controls, soft pastel icon/card accents.
- Bottom tabs: Home, Training, Nutrition, Progress, Profile.
- Home: Warm Morning, Bright Daytime and Dark Evening; the primary card hierarchy in the board is retained.
- No real API use or member data. Current public repo and GitHub Pages are public, unlike the restricted Flutter deployment.

**Do not mark any Flutter screen complete because its HTML demo works.** This is a visual HTML approximation to compare with the supplied boards. Screen imagery, icons, spacing, scroll and asset accuracy still require owner review against the original PNGs.

## What was reconstructed from the approved boards

| Screen / flow | Studio route | Grounded reference elements | Status |
|---|---|---|---|
| Home | `#home` | Zenith header, greetings, coach card, three Today tiles, coach note, weekly progress, updates, journey cards; three appearances | First HTML reconstruction, awaiting owner comparison |
| Training Home | `#training` | Photo hero, Today’s Workout, weekday strip, workout categories | First HTML reconstruction |
| My Plan / Weekly Training | `#week` | Week 3/12, day-specific workout cards, back navigation | First HTML reconstruction; compare hierarchy with separate My Plan PR #248 |
| Workout Session | `#session` | Upper-body exercise sequence, active card, per-exercise entry | First HTML reconstruction |
| Exercise Detail | `#exercise` | Dumbbell Bench Press, tabs, technique cues and log-set CTA | First HTML reconstruction |
| Workout Summary | `#complete` | Completed feedback, exercises, sets, duration, performance history | First HTML reconstruction |
| Nutrition Library | `#nutrition` | Categories, meals, search, popular meal tiles | First HTML reconstruction |
| Food Detail | `#food` | Portion selection, macros, add-to-plan action | First HTML reconstruction |
| Meal Library | `#meal-library` | Search, meal filters and meal list | First HTML reconstruction |
| Nutrition Plan | `#meal-plan` | Plan name, goal, meals by time | First HTML reconstruction |
| Progress | `#progress` | Tabs, weekend check-in, weight/waist/body fat, trend line | First HTML reconstruction |
| Weekly Check-in | `#checkin` | Measurement sequence, lifestyle review structure | Partial; photo guides and review substeps pending |
| Messages | `#messages` | Coach messaging and workout/nutrition feedback categories | Partial |
| My Sessions | `#sessions` | Upcoming PT sessions and history navigation | Partial |
| Membership | `#membership` | Active plan, validity, plan services and options | Partial |
| Notifications | `#notifications` | Filters, reminders and coach updates | Partial |
| Profile | `#profile` | Profile service navigation and membership links | Partial |
| Nighttime Review | `#review` | Evening summary, workout/food/water/activity and daily check-in | Partial |
| Premium Onboarding | `#onboarding` | Profile information, physical measurements, goals and intake cues | Partial |

## Fidelity corrections still required

1. **Use original visual artwork and image resources.** Public website currently references a pre-existing public Zenith training image and neutral placeholders instead of the board’s exact photography and icons. Do not approve pixel parity yet.
2. Compare every mobile layout against the uploaded PNG source at iPhone and Android widths; correct spacing, font weight, tile sizes and shadows. All 23 boards include more detailed subflows than the first reconstruction.
3. Build detailed next-level screens progressively: activity, nutrition builder, muscle maps, check-in media, exercise demos, revision requests, time changes, session history, coaching notes, full message interactions, and remaining onboarding steps.
4. Confirm whether Zenith header identity on provided boards or the newer KYNVAY login wordmark is required per screen. Do not silently override the owner's later brand decision.
5. Match actual Flutter widgets only after HTML design acceptance; maintain native features and entitlement boundaries.

## Change tracking

| ID | Screen | Owner-accepted correction | HTML commit | Flutter PR/commit | Actual device verified |
|---|---|---|---|---|---|
| DS-001 | Original studio | Generic dashboard rejected; use the uploaded approved screens | This branch | — | No |
| DS-002 | Home | Recreate three-mode Home hierarchy from supplied visual board | This branch | — | No |
| DS-003 | Training | Use workout imagery, week strip, categories, detailed plan/session flow | This branch | — | No |
| DS-004 | Nutrition | Use nutrition library, food details, meal list and plan presentation | This branch | — | No |
| DS-005 | Progress | Use weekend check-in and measurement progress layout | This branch | — | No |

For each approved difference, record: exact board/screen; before/after design details; HTML commit; Flutter source path, PR and commit; screenshots from actual Flutter; Android/iOS verification. Keep this ledger authoritative; do not reintroduce superseded Flutter UI.

## Repositories

- Public static design prototype: `annjyoti11/dev/kynvay-studio`.
- Private Flutter client: `teyrin-systems/zenith-client-app`.
- Real Flutter Web baseline: `https://preview.zenithfitnesshub.in/` (password protected).

This static prototype contains only illustrative values and does not make network requests to Laravel.
