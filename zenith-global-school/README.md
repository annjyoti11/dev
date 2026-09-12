# Zenith Global Senior Secondary School

Laravel admin UI foundation for the school management platform.

## Architecture
- Laravel backend and route/controller/service layers
- Blade layouts + reusable Blade components
- Tailwind CSS plus stable semantic `z-*` component classes
- Alpine.js only for lightweight UI state such as sidebar, dropdowns, toasts and confirmations
- One fixed admin shell: sidebar, topbar, page content, global toast stack and confirmation modal

## Important
This folder lives in the existing `annjyoti11/dev` repository for development/source organisation. The repository root currently serves the Zenith Fitness Hub static site, so this Laravel folder is **not** intended to be served by GitHub Pages. It should be deployed to the PHP/Laravel-capable hosting environment with its web root pointing to the Laravel `public/` directory.

## UI rules
- Modern Academic Light only
- no page-level horizontal scroll
- shared navigation and page shell
- reusable classes/components rather than deep CSS selectors
- consistent form validation, loading and global notification placement

Development branch: `luna/zenith-global-school-admin-foundation`
