# Plan: Middleware & AWS integration

## Current state (codebase)

| Area | Today |
|------|--------|
| **Auth** | No NextAuth; `/login` is a stub; `/admin` is open (see admin waitlist view). |
| **Persistence** | Waitlist → `data/waitlist.json` on disk (`shared/lib/waitlist-store.ts`). |
| **API** | `GET/POST /api/waitlist`, `GET /api/health` (ALB check — must stay cheap). |
| **Config** | `@t3-oss/env-nextjs` in `shared/lib/env.ts` — site URL, optional Resend/PostHog. |
| **Infra (docs)** | `docs/AWS_INFRASTRUCTURE.md` — EC2 + ALB, RDS, Redis, S3, Secrets Manager `onenexium/platform/*`, SES, ECR/ECS, `ap-south-1`. |

## Goals

1. **Middleware** — Consistent security headers, clear extension points for auth, optional protection for sensitive routes when secrets are configured.
2. **AWS** — Server-only clients aligned with docs: **Secrets Manager**, **SES**, **S3**; default credential chain (IAM role on EC2, env/profile locally).
3. **No breaking ALB health** — `/api/health` unchanged.
4. **Phased data** — RDS/Drizzle/NextAuth are **phase 2** (per UI spec); this phase wires AWS SDK + patterns only.

## Architecture decisions

| Decision | Rationale |
|----------|-----------|
| **Edge middleware = headers + light checks only** | AWS SDK does not run on the Edge runtime; secrets and SES stay in **Node** route handlers / server modules. |
| **Single AWS region default** | `ap-south-1` per `AWS_INFRASTRUCTURE.md`; override via `AWS_REGION`. |
| **Secret IDs** | Full ARN or name; docs use prefix `onenexium/platform/` — expose `AWS_SECRETS_PREFIX` + helper `secretId('DATABASE_URL')`. |
| **Waitlist GET** | Public enumeration is a privacy risk; when `ADMIN_API_KEY` (or `WAITLIST_ADMIN_SECRET`) is set, require `Authorization: Bearer <key>`. Dev without key stays open for DX. |
| **Optional SES on signup** | After successful waitlist POST, if `AWS_SES_FROM` + SES identity exist, send internal notification (non-fatal on failure). |

## Implementation checklist (this PR)

- [x] `middleware.ts` — security headers; optional `/admin` cookie gate when `ADMIN_MIDDLEWARE_SECRET` set.
- [x] `server/aws/*` — Secrets Manager, SES v2, S3 thin wrappers.
- [x] `shared/lib/env.ts` — optional AWS + admin vars (Zod).
- [x] `.env.*.example` — documented variables.
- [x] `app/api/waitlist/route.ts` — protect GET when admin key set; optional SES hook on POST.
- [x] `docs/README.md` — link this plan.

## Phase 2 (not in this PR)

- NextAuth v5 + Google OAuth (Secrets Manager: `GOOGLE_*`, `NEXTAUTH_SECRET`).
- Drizzle + `DATABASE_URL` from env or Secrets Manager bootstrap.
- Redis (`REDIS_URL`) for sessions or rate limits.
- Move waitlist rows to Postgres; keep file/S3 only as fallback if needed.
- VPC / internal-only admin or ALB rules as described in `AWS_INFRASTRUCTURE.md`.

## References

- `docs/AWS_INFRASTRUCTURE.md` — topology, ARNs, health check path.
- `docs/AWS_CREDENTIALS.md` — Secrets Manager naming, no keys in git.
