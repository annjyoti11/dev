# KYNVAY Client — Approved-Screen HTML Reconstruction

**Source:** 23 owner-supplied PNG design boards in `clientapp.zip` (15 November 2026). These boards are the reference; the current HTML is a first-pass editable reconstruction and must be visually compared before approval.

**Public review path (when this branch is merged):** https://zenithfitnesshub.in/kynvay-studio/

## Why this exists

Review the approved Zenith/KYNVAY mobile screen hierarchy quickly in HTML/CSS without rebuilding Flutter on every visual change. The original generic design dashboard was rejected. The replacement places an actual mobile app preview at the centre, retaining the Zenith logo style, bright white/blue mobile components, bottom five-tab navigation, Home light/day/dark variants and major interaction flows visible in the supplied boards.

- `index.html`: compact screen/appearance selector and mobile preview container.
- `studio.css`: editable responsive styling tokens and mobile component hierarchy.
- `studio.js`: 19 navigable sample screens and static demo interactions; no HTTP requests or member data.
- `CHANGES.md`: board mapping, implementation caveats, and the acceptance ledger.

The original screenshots are *not* hosted here, because the website repository is public and the supplied archive has not been imported as public web assets. Existing public Zenith website training imagery may be used for mock-up placeholders. Do not confuse these placeholders with the specific photos in the source boards.

## Approval workflow

1. Compare each HTML route with the matching approved board at the same mobile viewport and note exact differences.
2. Correct HTML/CSS until the owner approves that screen; record it in `CHANGES.md`.
3. Apply the accepted batch to the **existing Flutter** widget files.
4. Run Flutter CI and review the resulting **actual Flutter app** (browser and mobile). Update the ledger only after confirming parity.

This site is **not the Flutter app**, not a replacement React app, and not an authenticated client portal. Its UI is illustrative, with no real workout logging, upload, notification, account, nutrition API or coaching actions. The separately protected Flutter build stays at https://preview.zenithfitnesshub.in/.

No changes to site root, DNS, Laravel, TEYRIN or existing Zenith pages are required.
