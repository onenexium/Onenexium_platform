# Documentation

| File | Description |
|------|-------------|
| [PLAN_MIDDLEWARE_AND_AWS.md](./PLAN_MIDDLEWARE_AND_AWS.md) | Middleware + AWS integration plan and phased roadmap |
| [AWS_CREDENTIALS.md](./AWS_CREDENTIALS.md) | AWS secrets handling, local env templates, Secrets Manager names |
| [AWS_INFRASTRUCTURE.md](./AWS_INFRASTRUCTURE.md) | Deployed AWS topology, IDs, and operational reference |
| [onenexium-ui-spec.md](./onenexium-ui-spec.md) | Product UI specification (dashboard, onboarding, design system) |
| [onenexium_premium_ui (1).html](./onenexium_premium_ui%20(1).html) | Premium dashboard HTML reference (tokens implemented in `config/theme/`) |

The repository **README** remains at the project root for GitHub / quick start.

**Theme (code):** `next-themes` at the root (`app/layout.tsx`). Light/dark marketing tokens: `app/globals.css` + `shared/styles/onenexium-marketing-dark.css`. Dashboard tokens (`--nx-*`): `shared/styles/onenexium-dashboard-tokens.css`. TypeScript: `config/theme/dashboard-themes.ts`. Tailwind: `premium/*` maps to `--nx-*` on `html` / `html.dark`.
