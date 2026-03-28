/** Default from docs/AWS_INFRASTRUCTURE.md — override with AWS_REGION. */
export const DEFAULT_AWS_REGION = "ap-south-1"

export function awsRegion(): string {
  return process.env.AWS_REGION?.trim() || DEFAULT_AWS_REGION
}
