# AWS credentials and secrets (OneNexium)

**Do not commit real credentials to git.** This document describes *what* exists and gives a **template** you copy locally.

## Local file (your machine only)

1. Copy **`AWS_CREDENTIALS.local.template.env`** → **`AWS_CREDENTIALS.local.env`** (gitignored).
2. Replace every `CHANGEME` and uncomment lines you need.
3. Never paste **PEM private keys** or **long-lived access keys** into markdown or any tracked file.

For **resource IDs and public endpoints** (VPC, ARNs, EIPs, ALB DNS), use **`onenexium-infra-vars.env`** (repo root) and **[`AWS_INFRASTRUCTURE.md`](./AWS_INFRASTRUCTURE.md)** in this folder.

## Where secrets should live

| Kind | Recommended storage |
|------|---------------------|
| IAM access keys (human / CI) | `~/.aws/credentials`, env on runner secrets, or **IAM Identity Center (SSO)** |
| SSH `.pem` | Encrypted disk only; paths referenced in your local `.env`, not the key body |
| DB password, Redis, API keys, OAuth | **AWS Secrets Manager** `onenexium/platform/*` |
| Cloudflare token | Local `.env` or CI secret; **`CF_ZONE_ID`** is already in `onenexium-infra-vars.env` (non-secret) |

## Secrets Manager names (`onenexium/platform/`)

Verify in the AWS console; list may grow.

| Secret | Purpose |
|--------|---------|
| `DATABASE_URL` | PostgreSQL (includes credentials) |
| `REDIS_URL` | ElastiCache |
| `NEXTAUTH_SECRET` | NextAuth |
| `MCP_AUTH_TOKEN` | MCP auth |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth |
| `ANTHROPIC_API_KEY` | LLM API |
| `AWS_REGION`, `ECR_REGISTRY`, `S3_BUCKET`, `RUNTIME_EC2_IP` | App / deploy config |
| `SES_FROM_EMAIL`, `SES_CONFIGURATION_SET` | Amazon SES |
| `APP_URL`, `MCP_SERVER_URL`, `SITES_DOMAIN` | Canonical URLs (see **Platform_deployement.md**) |
| `RUNTIME_SSH_KEY` | Optional; only if Platform SSHs to Runtime (**INFRASTRUCTURE_REMAINING.md**) |

**CLI example (replace value):**

```bash
aws secretsmanager put-secret-value \
  --secret-id "onenexium/platform/ANTHROPIC_API_KEY" \
  --secret-string "YOUR_KEY" \
  --region ap-south-1
```

## EC2 / runtime

- **Platform** and **Runtime** use **instance IAM roles** for S3, Secrets Manager, SES, ECR — not access keys on the instances.
- **GitHub Actions** deploy keys: **GITHUB_CONNECTION.md**.

## Related docs

- **[`AWS_INFRASTRUCTURE.md`](./AWS_INFRASTRUCTURE.md)** — architecture and non-secret references  
- **`IMPLEMENTATION_GUIDE.md`** (if present in repo) § Secrets Manager  
- **`USER_GUIDE.md`** (if present in repo) — day-2 operations  
