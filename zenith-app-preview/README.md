# Zenith Client App — Interactive Design Preview

Standalone mobile-first HTML/CSS/JavaScript design prototype, contained in `zenith-app-preview/`.

## Purpose
Build and review the client experience screen by screen, before implementing the agreed design in Flutter. The approved Home visual direction and the Earlier Today activity model are the starting points.

## Routes
- `index.html` — Home; focus card, daily metrics and contextual post-meal action.
- `earlier-today.html` — recorded versus unrecorded tasks; Today / Week tabs.
- `meal.html` — sample planned dinner and a functional demo log action.
- `training.html`, `nutrition.html`, `progress.html`, `profile.html` — exploratory first-pass supporting pages; **not final approved designs**.

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
