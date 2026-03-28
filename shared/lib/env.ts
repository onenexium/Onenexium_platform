import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        RESEND_API_KEY: z.string().min(1).optional(),
        /** Auth.js — from SM secret NEXTAUTH_SECRET or env */
        AUTH_SECRET: z.string().min(1).optional(),
        AUTH_URL: z.string().url().optional(),
        AUTH_GOOGLE_ID: z.string().min(1).optional(),
        AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
        /** Comma-separated; when set, only these emails may access /admin */
        AUTH_ADMIN_EMAILS: z.string().min(1).optional(),
        /** Optional JSON object secret id (suffix or full ARN) merged into env first */
        AWS_SECRETS_JSON_ID: z.string().min(1).optional(),
        /** Set to 0 to skip Secrets Manager bootstrap (local) */
        AWS_SECRETS_BOOTSTRAP: z.enum(["0", "1"]).optional(),
        /** ap-south-1 in production per docs/AWS_INFRASTRUCTURE.md */
        AWS_REGION: z.string().min(1).optional(),
        /** e.g. onenexium/platform — used with resolveSecretId("DATABASE_URL") */
        AWS_SECRETS_PREFIX: z.string().min(1).optional(),
        /** Postgres URL for Drizzle (RDS or local); optional if only loaded from SM at runtime */
        DATABASE_URL: z.string().min(1).optional(),
        AWS_S3_BUCKET: z.string().min(1).optional(),
        AWS_SES_FROM: z.string().min(1).optional(),
        AWS_SES_CONFIGURATION_SET: z.string().min(1).optional(),
        WAITLIST_NOTIFY_TO: z.string().min(1).optional(),
        /** When set, /admin requires header x-onenexium-admin or cookie onenexium_admin_session */
        ADMIN_MIDDLEWARE_SECRET: z.string().min(1).optional(),
        /** When set, GET /api/waitlist requires Authorization: Bearer <key> */
        ADMIN_API_KEY: z.string().min(1).optional(),
        WAITLIST_ADMIN_SECRET: z.string().min(1).optional(),
    },
    client: {
        NEXT_PUBLIC_SITE_URL: z.string().url(),
        NEXT_PUBLIC_APP_NAME: z.string().min(1),
        NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
        NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
    },
    runtimeEnv: {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_URL: process.env.AUTH_URL,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        AUTH_ADMIN_EMAILS: process.env.AUTH_ADMIN_EMAILS,
        AWS_SECRETS_JSON_ID: process.env.AWS_SECRETS_JSON_ID,
        AWS_SECRETS_BOOTSTRAP: process.env.AWS_SECRETS_BOOTSTRAP as "0" | "1" | undefined,
        AWS_REGION: process.env.AWS_REGION,
        AWS_SECRETS_PREFIX: process.env.AWS_SECRETS_PREFIX,
        DATABASE_URL: process.env.DATABASE_URL,
        AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
        AWS_SES_FROM: process.env.AWS_SES_FROM,
        AWS_SES_CONFIGURATION_SET: process.env.AWS_SES_CONFIGURATION_SET,
        WAITLIST_NOTIFY_TO: process.env.WAITLIST_NOTIFY_TO,
        ADMIN_MIDDLEWARE_SECRET: process.env.ADMIN_MIDDLEWARE_SECRET,
        ADMIN_API_KEY: process.env.ADMIN_API_KEY,
        WAITLIST_ADMIN_SECRET: process.env.WAITLIST_ADMIN_SECRET,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    },
})
