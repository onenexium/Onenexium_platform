/**
 * Auth feature module — login, signup, sign-out UI + shared auth helpers.
 * Server-only crypto and DB logic stays in `server/auth/`.
 * Root `auth.ts` / `auth.config.ts` stays at project root (Next.js convention).
 */
export { LoginForm } from "./components/login-form"
export { SignupForm } from "./components/signup-form"
export { SignOutButton } from "./components/sign-out-button"
export { signupAction, type SignupState } from "./actions/signup"
export {
  hasAuthSecretEnv,
  getGoogleOAuthPair,
  getAuthEnvFlags,
  canUseEmailAuth,
  canUseGoogleAuth,
  canSignIn,
  canSignUp,
} from "./lib/auth-env"
export { signupSchema, loginCredentialsSchema } from "./lib/auth-schemas"
export { postLoginRedirectPath } from "./lib/post-login-redirect"
