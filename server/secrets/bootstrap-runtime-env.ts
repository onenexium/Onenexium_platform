import { getSecretString, resolveSecretId } from "@/server/aws/secrets"

/**
 * Maps AWS Secrets Manager secret names (under AWS_SECRETS_PREFIX) to process.env keys.
 * Aligns with docs/AWS_CREDENTIALS.md and docs/AWS_INFRASTRUCTURE.md.
 * Auth.js v5 reads AUTH_*; SM may store legacy NEXTAUTH_* / GOOGLE_* names.
 */
const INDIVIDUAL_SECRET_TO_ENV: Record<string, string> = {
  NEXTAUTH_SECRET: "AUTH_SECRET",
  AUTH_SECRET: "AUTH_SECRET",
  GOOGLE_CLIENT_ID: "AUTH_GOOGLE_ID",
  GOOGLE_CLIENT_SECRET: "AUTH_GOOGLE_SECRET",
  APP_URL: "AUTH_URL",
  NEXTAUTH_URL: "AUTH_URL",
  DATABASE_URL: "DATABASE_URL",
  REDIS_URL: "REDIS_URL",
  ADMIN_API_KEY: "ADMIN_API_KEY",
  WAITLIST_ADMIN_SECRET: "WAITLIST_ADMIN_SECRET",
  ADMIN_MIDDLEWARE_SECRET: "ADMIN_MIDDLEWARE_SECRET",
  SES_FROM_EMAIL: "AWS_SES_FROM",
  SES_CONFIGURATION_SET: "AWS_SES_CONFIGURATION_SET",
  S3_BUCKET: "AWS_S3_BUCKET",
  MCP_AUTH_TOKEN: "MCP_AUTH_TOKEN",
  ANTHROPIC_API_KEY: "ANTHROPIC_API_KEY",
  ECR_REGISTRY: "ECR_REGISTRY",
  AUTH_ADMIN_EMAILS: "AUTH_ADMIN_EMAILS",
}

let bootstrapPromise: Promise<void> | null = null

/** AWS RDS expects TLS; append sslmode if the URL has no ssl params yet. */
function ensureRdsSslOnDatabaseUrl() {
  const raw = process.env.DATABASE_URL?.trim()
  if (!raw) return
  if (raw.includes("sslmode=") || raw.includes("ssl=")) return
  if (!raw.includes("rds.amazonaws.com")) return
  process.env.DATABASE_URL = raw.includes("?")
    ? `${raw}&sslmode=require`
    : `${raw}?sslmode=require`
}

function shouldRunBootstrap(): boolean {
  if (process.env.AWS_SECRETS_BOOTSTRAP === "0") return false
  if (process.env.AWS_SECRETS_JSON_ID) return true
  const prefix = process.env.AWS_SECRETS_PREFIX?.trim()
  return Boolean(prefix)
}

function assignIfEmpty(envKey: string, value: string) {
  const cur = process.env[envKey]
  if (cur !== undefined && String(cur).length > 0) return
  process.env[envKey] = value
}

function applyJsonSecretPayload(raw: string) {
  const parsed = JSON.parse(raw) as unknown
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("JSON secret must be an object")
  }
  for (const [k, v] of Object.entries(parsed)) {
    if (typeof v !== "string") continue
    assignIfEmpty(k, v)
    const mapped = INDIVIDUAL_SECRET_TO_ENV[k]
    if (mapped) assignIfEmpty(mapped, v)
  }
}

async function loadJsonBundleIfConfigured() {
  const id = process.env.AWS_SECRETS_JSON_ID?.trim()
  if (!id) return
  const secretId = resolveSecretId(id)
  const raw = await getSecretString(secretId)
  applyJsonSecretPayload(raw)
}

async function loadIndividualSecrets() {
  const prefix = process.env.AWS_SECRETS_PREFIX?.trim()
  if (!prefix) return

  /** One SM fetch per target env key (prefer first-listed secret name). */
  const byEnv = new Map<string, string>()
  for (const [secretSuffix, envKey] of Object.entries(
    INDIVIDUAL_SECRET_TO_ENV,
  )) {
    if (byEnv.has(envKey)) continue
    const cur = process.env[envKey]
    if (cur !== undefined && String(cur).length > 0) continue
    byEnv.set(envKey, secretSuffix)
  }

  const entries = [...byEnv.entries()]

  await Promise.all(
    entries.map(async ([envKey, secretSuffix]) => {
      try {
        const secretId = resolveSecretId(secretSuffix)
        const value = (await getSecretString(secretId)).trim()
        if (value.length > 0) assignIfEmpty(envKey, value)
      } catch {
        // Missing or inaccessible secret: keep .env / prior value
      }
    }),
  )
}


/**
 * Idempotent: loads Secrets Manager values into process.env before auth and other
 * server code read configuration. Safe to call multiple times.
 *
 * - When `AWS_SECRETS_JSON_ID` is set, that secret (JSON object) is merged first.
 * - When `AWS_SECRETS_PREFIX` is set, individual secrets are fetched for any still-empty env keys.
 * - Set `AWS_SECRETS_BOOTSTRAP=0` to disable (local .env only).
 */
export async function bootstrapRuntimeSecrets(): Promise<void> {
  if (!shouldRunBootstrap()) return
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await loadJsonBundleIfConfigured()
      await loadIndividualSecrets()
      ensureRdsSslOnDatabaseUrl()
    })().catch((err) => {
      bootstrapPromise = null
      throw err
    })
  }
  await bootstrapPromise
}
