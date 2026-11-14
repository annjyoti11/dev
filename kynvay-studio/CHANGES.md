# KYNVAY Design Studio — Change Ledger

Date started: 15 November 2026
Source website: `annjyoti11/dev` (public GitHub Pages)
Flutter source: `teyrin-systems/zenith-client-app` (private)
Current restricted Flutter reference: https://preview.zenithfitnesshub.in/

## Critical distinction

This site is a **synthetic-data HTML/CSS design reference**, not the compiled Flutter client. Editing these pages has **no automatic effect** on Flutter. Apply approved revisions in a separate batch to the actual Flutter widgets, then use Flutter CI and a new Flutter Web preview build to verify parity. Do not import real member data, passwords, Laravel tokens, medical details or private assets into this public repository.

## Review queue

| Screen | HTML reference | Flutter implementation to inspect | Visual status | Applied to Flutter | Verified in Flutter |
|---|---|---|---|---|---|
| Login | `index.html#login` | `lib/src/client/auth_screen.dart` | Current screenshot reproduced approximately; needs comparison/approval | Not started | No |
| Home | `index.html#home` | `lib/src/client/adaptive_home.dart`, `lib/src/client/client_shell.dart` | Design draft; compare with approved home | Not started | No |
| My Plan | `index.html#plan` | `lib/src/client/premium_training_page.dart` | Design draft; programme and week overview precede feedback | Not started | No |
| Workout | `index.html#workout` | `lib/src/client/training_screens.dart` | Design draft; requires screen reference | Not started | No |
| Nutrition | `index.html#nutrition` | Source file to verify before edit | Design draft; requires screen reference | Not started | No |

## Approved design constraints to enforce

- Same Flutter application for web and mobile; no React clone or independent long-term app.
- Text: Inter. Palette: restrained blue and charcoal.
- General home uses a bright appearance. Premium may use Warm Morning (05:00–09:59), Bright Daytime (10:00–17:59), Dark Evening (18:00–04:59), with manual override. This studio's appearance selector is a static design comparison only.
- My Plan overview and scheduled training must remain prominent. Plan feedback belongs below primary programme content.
- An assigned workout or nutrition plan must remain available until a coach publishes a replacement. Displaying a four-week interval must not automatically hide an assignment.
- Do not reintroduce prior Nutrition, workout, login or fixed-dark layout implementations where newer designs were approved.
- This public page never connects to the Laravel API; **the VPS preview's password gate does not protect GitHub Pages**.

## Change entries

| ID | Screen | Correction requested | HTML status | Flutter commit | Acceptance |
|---|---|---|---|---|---|
| DS-001 | Workspace | Establish editable HTML/CSS design board and change-ledger without modifying Zenith website pages | Draft created | — | Awaiting first review |
| DS-002 | My Plan | Programme hierarchy and weekly overview above feedback (from draft client PR #248) | Shown in draft; verify visually | Already proposed in PR #248, not merged | Awaiting comparison |

## How to log each correction

Add one entry with: screen; exact observed defect; approved desired behaviour/layout; HTML file and commit; Flutter path; Flutter PR/commit; visual verification screenshot/date; Android/iOS check status.

Do not mark work complete solely because the HTML mock looks correct.
