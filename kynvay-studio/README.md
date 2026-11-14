# KYNVAY Studio

This subfolder contains an **editable browser-based design-review prototype**, not another deployed fitness app. It is intentionally isolated from the existing `zenithfitnesshub.in` website. It is public, uses illustrative content only, stores nothing, and makes no network requests to Laravel/TEYRIN.

## URLs

- Public review workspace after publishing master: `https://zenithfitnesshub.in/kynvay-studio/`
- Current actual Flutter Web baseline (separately password-protected): `https://preview.zenithfitnesshub.in/`
- Ledger: `CHANGES.md`

## Development method

1. Compare each sample HTML view with the previously approved KYNVAY design and current protected Flutter browser rendering.
2. Edit `index.html` and `studio.css` for fast visual work. Use `studio.js` only for simple design interaction.
3. Note every approved difference in `CHANGES.md` and record precise screen and source paths.
4. Batch approved changes into the **existing Flutter Client** repository.
5. Run Flutter CI once per approved batch, verify actual Flutter Web and mobile screens. Do not mistake visual mock approval for implementation.

The login screen follows the current Safari/Chrome screenshot structure but does not use the original proprietary image asset yet; the other views are **first-pass design drafts** built from the approved feature hierarchy, not claims of pixel parity.

## Security and publishing

The source website repository `annjyoti11/dev` is public. Do not place compiled private Flutter code, private GitHub artifacts, tokens, credentials or genuine member records here without a deliberate separate disclosure/security review. The existing compiled Flutter build stays at the protected VPS preview for comparison.

GitHub Pages may briefly cache a newly published folder; no DNS or changes to root `index.html`, `CNAME`, or existing Zenith assets are needed.
