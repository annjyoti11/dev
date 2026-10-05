# Zenith Global website preview

Standalone, responsive HTML/CSS/JavaScript preview, published by the repository's existing GitHub Pages setup at `/zenith-global-preview/`. No build step or root configuration changes are required. All asset paths are relative to this folder.

## Content status

- Navy `#00265f` and green `#047f4e` follow the supplied brand guide. The crest is extracted from the original brand file.
- The licensed Blauer Nue webfont was not supplied; the page uses a system sans-serif fallback.
- Photography is illustrative, not documentation of the actual school or facilities. Hero and robotics images are generated separately; supporting images are extracted from the approved visual concept.
- “Introducing Tezpur’s First School Robotics Lab” is requested preview copy based on the owner's statement. Independently verify this first-in-city claim before an official school launch.
- The lab is described as upcoming. Dates, affiliation, fees, contact details and unverified statistics are deliberately omitted.
- Admissions buttons open a local enquiry-note composer. No data is sent or stored; it only downloads a text note. Connect official school contact details before accepting real enquiries.
- `noindex,nofollow` keeps the school concept out of the intended search index; it is a public preview, not access-controlled.

## Local preview

From the repository root: `python3 -m http.server 8080`, then visit `http://localhost:8080/zenith-global-preview/`.

Only this folder is part of the school preview. Existing fitness pages and the separate `zenith-global-school` project are unchanged.

## Multi-page preview and News

The nine navigation destinations are separate HTML pages. Houses use the approved names, colours and mottos. News includes a labelled illustrative article. A lightweight WordPress theme and installation notes are in `_wordpress/`; this folder is excluded from GitHub Pages by its underscore prefix. WordPress hosting has not yet been connected.
