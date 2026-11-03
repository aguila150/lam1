import { cn } from "@/lib/utils"

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
}: {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  tone?: "light" | "dark"
  align?: "center" | "left"
}) {
  const dark = tone === "dark"
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p
        className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
          dark ? "text-volt" : "text-navy-2",
        )}
      >
        <span className="h-0.5 w-6 rounded-full bg-volt" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-5 text-pretty text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
