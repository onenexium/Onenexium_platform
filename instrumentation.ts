/**
 * Runs once per Node.js server process (next dev / next start).
 * Hydrates process.env from AWS Secrets Manager before route handlers run.
 * Edge runtime does not execute this file.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return

  try {
    const { bootstrapRuntimeSecrets } = await import(
      "./server/secrets/bootstrap-runtime-env"
    )
    await bootstrapRuntimeSecrets()
  } catch (err) {
    console.error("[onenexium] instrumentation: secrets bootstrap failed:", err)
  }
}
