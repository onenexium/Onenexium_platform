"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type ThemeToggleProps = {
  className?: string
  compact?: boolean
}

export function ThemeToggle({ className, compact }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span
        className={cn(compact ? "inline-flex h-8 w-8" : "inline-flex h-9 w-9", className)}
        aria-hidden
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "relative shrink-0",
        compact ? "h-8 w-8" : "h-9 w-9",
        className,
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-[1.15rem] w-[1.15rem] scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.15rem] w-[1.15rem] scale-0 rotate-90 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
