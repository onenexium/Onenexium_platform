/**
 * Canonical paths for the three application panels (monolith).
 * Marketing: public site. Platform: product dashboard. Admin: internal operations.
 */
export const routes = {
  marketing: {
    home: "/",
    pricing: "/pricing",
    about: "/about",
  },
  platform: {
    root: "/app",
    projects: "/app/projects",
    domains: "/app/domains",
    settings: "/app/settings",
    notifications: "/app/notifications",
  },
  admin: {
    root: "/admin",
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
} as const
