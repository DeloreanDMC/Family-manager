# Family Manager — Claude Context

## Project
Web app for 2 users (couple): gifts wishlist, plans/tasks, requests with points, travel.
Frontend-first (mocks → real API). Local deploy only. In Russian UI.

## Current Phase
**Phase 1** — parallel frontend dev with mocks. No backend yet.
KM tasks: K1 login, K2-K3 dashboard, K4 profile, K5 auth-guard.

## Stack (do not deviate)
- React 19 + TS + Vite | TanStack Router (file-based) | TanStack Query v5 + ky
- shadcn/ui (Tailwind CSS 4 only — no CSS-in-JS) | Framer Motion | Zustand
- Backend (Phase 2): NestJS + PostgreSQL + Prisma + Google OAuth

## Key Paths
```
apps/client/src/
  routes/     — TanStack Router pages (__root.tsx, index, login, gifts, plans, profile)
  components/ — ui/ (shadcn), layout/ (Shell), shared/ (widgets)
  services/   — API functions (ky), currently mocks
  stores/     — Zustand (auth, UI state)
  mocks/      — mock data
  types/      — shared TS types
  lib/        — ky instance config, utils
```

## Rules (mandatory)
- Each major task → separate branch `feature/<name>` from `main`
- Commits: Conventional Commits (`feat(area): desc`)
- **Never push or merge to main without user confirmation**
- New shadcn components: `npx shadcn-ui@latest add <name>`
- Styles: Tailwind only, no inline styles
- Types: strict, no `any`
- Before big tasks: show plan, wait for approval
- After tasks: verify `npm run dev` works

## See Also
[LLM.txt](./LLM.txt) — compressed full reference (stack decisions, branch names, all tasks)
