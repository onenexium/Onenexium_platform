import Link from "next/link"

import { routes } from "@/config/routes"

const stats = [
  { label: "Total", value: "—", delta: "—" },
  { label: "Live now", value: "—", delta: "—" },
  { label: "Builds", value: "—", delta: "—" },
  { label: "Domains", value: "—", delta: "—" },
] as const

export default function PlatformProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mt-1 text-sm text-premium-text-2">
            Your projects at a glance.
          </p>
        </div>
        <Link
          href={routes.platform.root}
          className="premium-focus inline-flex h-11 min-w-[44px] items-center justify-center rounded-xl bg-gradient-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-md ring-1 ring-indigo-500/15 transition-all duration-200 ease-premium hover:-translate-y-px hover:opacity-95 hover:shadow-premium-primary-hover"
        >
          + New project
        </Link>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="animate-stat-in min-w-[140px] snap-start rounded-2xl border border-premium-border bg-premium-surface p-5 shadow-premium-card transition-all duration-200 ease-premium hover:-translate-y-0.5 hover:shadow-premium-card-hover sm:min-w-0"
            style={{ animationDelay: `${50 + i * 50}ms` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-premium-text-3">
              {s.label}
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-premium-text">
              {s.value}
            </p>
            <p className="mt-1 text-[11px] font-medium text-premium-text-3">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-card-in relative overflow-hidden rounded-2xl border border-premium-border bg-premium-surface p-5 shadow-premium-card transition-all duration-200 ease-premium hover:-translate-y-1 hover:shadow-premium-card-hover"
            style={{ animationDelay: `${80 + i * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-heading text-sm font-semibold tracking-[-0.02em] text-premium-text">
                Project {i}
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-premium-green-bg px-2 py-0.5 text-[11px] font-medium text-premium-green">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-premium-green animate-pulse-dot"
                  aria-hidden
                />
                Live
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] text-premium-text-3">preview.onenexium.com</p>
            <div className="mt-4 border-t border-premium-border pt-3 font-mono text-[11px] text-premium-text-3">
              4 pages · updated recently
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
