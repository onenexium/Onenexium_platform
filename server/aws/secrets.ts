import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager"

import { awsRegion } from "./region"

let client: SecretsManagerClient | null = null

function getClient(): SecretsManagerClient {
  if (!client) {
    client = new SecretsManagerClient({ region: awsRegion() })
  }
  return client
}

/**
 * Fetch a secret string from AWS Secrets Manager.
 * Uses default credential chain (IAM role on EC2, env keys locally, profile).
 */
export async function getSecretString(secretId: string): Promise<string> {
  const out = await getClient().send(
    new GetSecretValueCommand({ SecretId: secretId }),
  )
  if (out.SecretString) return out.SecretString
  if (out.SecretBinary) {
    return Buffer.from(out.SecretBinary).toString("utf8")
  }
  throw new Error(`Secret ${secretId} has no string or binary payload`)
}

/**
 * Resolve secret id: if `name` has no `/`, prefix with AWS_SECRETS_PREFIX (e.g. onenexium/platform/).
 */
export function resolveSecretId(name: string): string {
  const prefix = process.env.AWS_SECRETS_PREFIX?.replace(/\/$/, "") ?? ""
  if (!prefix || name.includes("/") || name.startsWith("arn:")) {
    return name
  }
  return `${prefix}/${name}`
}
