"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUp, Globe, ImagePlus, Sparkles } from "lucide-react"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { cn } from "@/shared/lib/utils"

const suggestions = ["Landing page", "Personal website", "SaaS app"] as const

const demoApps = [
  {
    title: "OneNexium landing page",
    edited: "Edited 21 days ago",
    previewClass:
      "bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-100 dark:from-indigo-950/60 dark:via-violet-950/40 dark:to-purple-950/30",
  },
  {
    title: "PhotoShare feed",
    edited: "Edited about 2 months ago",
    previewClass:
      "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-yellow-950/10",
  },
] as const

export function PlatformHomeDashboard() {
  const [prompt, setPrompt] = React.useState("")

  return (
    <div className="mx-auto w-full max-w-3xl space-y-12 pb-8">
      <section className="animate-page-in pt-8 text-center sm:pt-12">
        <h1 className="font-heading text-3xl font-bold tracking-[-0.04em] text-premium-text sm:text-4xl">
          What can{" "}
          <span className="bg-gradient-to-r from-indigo to-premium-violet bg-clip-text text-transparent">
            {siteConfig.name}
          </span>{" "}
          build for you?
        </h1>
      </section>

      <section className="animate-page-in space-y-5" style={{ animationDelay: "60ms" }}>
        <div className="overflow-hidden rounded-2xl border border-premium-border bg-premium-surface shadow-premium-composer">
          <label htmlFor="home-build-prompt" className="sr-only">
            Describe what to build
          </label>
          <textarea
            id="home-build-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder={`Ask ${siteConfig.name} to build a prototype of…`}
            className="w-full resize-none border-0 bg-transparent px-5 py-5 text-[15px] leading-relaxed text-premium-text placeholder:text-premium-text-3 focus:outline-none focus:ring-0"
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-premium-border bg-premium-surface-2 px-4 py-3">
            {[
              { icon: ImagePlus, label: "Attach" },
              { icon: Sparkles, label: "Build mode" },
              { icon: Globe, label: "Public" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="premium-focus inline-flex h-8 items-center gap-1.5 rounded-lg bg-premium-surface px-2.5 text-xs font-medium text-premium-text-3 shadow-xs transition hover:text-premium-text-2 hover:shadow-sm"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </button>
            ))}
            <div className="ml-auto">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-md ring-1 ring-indigo-500/20 transition hover:-translate-y-px hover:opacity-95 hover:shadow-premium-primary-hover"
                aria-label="Send prompt"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <span className="text-center text-sm text-premium-text-3">Try one →</span>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setPrompt(`Build a ${label.toLowerCase()} for my business`)}
                className="premium-focus rounded-full border border-premium-border bg-premium-surface px-4 py-2 text-sm font-medium text-premium-text-2 shadow-xs transition hover:shadow-sm hover:text-premium-text hover:border-premium-border-2"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-lg font-semibold tracking-[-0.02em] text-premium-text">
            My apps
          </h2>
          <Link
            href={routes.platform.projects}
            className="inline-flex items-center gap-1 text-sm font-medium text-premium-violet transition hover:gap-2 dark:text-primary"
          >
            See all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {demoApps.map((app, i) => (
            <li
              key={app.title}
              className="animate-card-in"
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <Link
                href={routes.platform.projects}
                className="group block overflow-hidden rounded-2xl border border-premium-border bg-premium-surface shadow-premium-card transition-all duration-200 ease-premium hover:-translate-y-1 hover:shadow-premium-card-hover"
              >
                <div className={cn("aspect-[16/10] w-full", app.previewClass)} />
                <div className="px-4 py-3.5">
                  <p className="font-heading text-sm font-semibold text-premium-text transition-colors group-hover:text-premium-violet dark:group-hover:text-primary">
                    {app.title}
                  </p>
                  <p className="mt-0.5 text-xs text-premium-text-3">{app.edited}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
