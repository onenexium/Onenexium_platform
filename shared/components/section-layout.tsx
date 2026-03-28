import * as React from "react"
import { cn } from "@/shared/lib/utils"

/** Outer wrapper for page sections. Uses design-token vertical padding. */
const Section = React.forwardRef<HTMLElement, React.ComponentProps<"section">>(
  function Section({ children, className, id, ...props }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative w-full py-[var(--section-py)]", className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

/** Constrains content to design-token max-width and horizontal padding. */
function SectionContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("section-container", className)} {...props}>
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  kicker?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}

/** Consistent section header: kicker (eyebrow) + title + optional description. */
function SectionHeader({
  kicker,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-[var(--section-gap)]",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {kicker && (
        <p className="section-kicker mb-3 block">{kicker}</p>
      )}
      <h2 className="font-bold tracking-tight text-foreground text-h2 leading-[var(--leading-tight)]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-content text-[length:var(--font-size-lead)] text-muted-foreground leading-[var(--leading-relaxed)]",
            align === "center" ? "mx-auto" : "mx-0"
          )}
        >
          {description}
        </p>
      )}
    </header>
  )
}

export { Section, SectionContainer, SectionHeader }
