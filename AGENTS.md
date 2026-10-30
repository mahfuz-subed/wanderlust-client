# Wanderlust Client (Agent Instructions)

## Stack
- Next.js 16.4.3 (App Router), React 19.3.0, TypeScript 5
- Tailwind CSS v4, tw-animate-css, shadcn/tailwind.css
- shadcn/ui configured with style `base-nova` (`components.json`); `rsc: true`, path aliases `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`
- Font: `Josefin_Sans` loaded in `src/app/layout.tsx` and applied to `<html>`; `globals.css` imports Tailwind + tw-animate-css + shadcn/tailwind.css

## Important notes (Next.js 16 / React 19)
- Root layout uses `LayoutProps<"/">` (App Router typed layout) and sets `body` with flex column; `<main>` wraps children.
- Home page is currently empty (`src/app/page.tsx` returns `<div></div>`).
- `AGENTS.md` in repo root contains the Next.js "not the Next.js you know" notice pointing to `node_modules/next/dist/docs/`. When in doubt about APIs/conventions, read those docs (and `node_modules/next/AGENTS.md`) — do not rely on older training assumptions.

## Commands
- Dev: `npm run dev` (Next dev)
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

No test script is present.

## Structure
- `src/app/` — App Router (layout, page, globals.css, favicon)
- `src/components/ui/` — shadcn/ui components (many preinstalled: button, input, card, carousel, etc.)
- `src/lib/utils.ts` — shared utils
- `components.json` defines shadcn config; add components via `npx shadcn@latest add <component>`

## Conventions / gotchas
- Use path aliases as configured. Prefer existing `src/components/ui/*` components before adding new ones.
- Styling uses Tailwind v4 + CSS variables (enabled). Follow existing patterns in installed UI components.
- Keep changes consistent with App Router (RSC by default).
