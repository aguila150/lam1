import { cn } from "@/lib/utils"

/**
 * The M doubles as a light bulb: its central V is the glass,
 * the stacked bars below are the screw base and the strokes above are light rays.
 */
export function BulbM({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 112"
      className={cn("h-[1em] w-auto", className)}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M50 4v9M34 9l4 7M66 9l-4 7" strokeWidth="6" />
      </g>
      <path
        d="M6 104V24a6 6 0 0 1 10.6-3.9L50 59.5 83.4 20.1A6 6 0 0 1 94 24v80H78V45.6L56.1 71.4a8 8 0 0 1-12.2 0L22 45.6V104H6Z"
        fill="currentColor"
      />
      <rect x="40" y="79" width="20" height="6" rx="3" fill="currentColor" />
      <rect x="42" y="89" width="16" height="6" rx="3" fill="currentColor" />
      <path d="M45 99h10l-2.5 5h-5L45 99Z" fill="currentColor" />
    </svg>
  )
}

export function LamLogo({
  className,
  tagline = true,
}: {
  className?: string
  tagline?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className="flex items-end font-heading text-[1.75rem] font-extrabold leading-none tracking-tight text-white"
        aria-label="LAM"
      >
        <span aria-hidden="true">LA</span>
        <BulbM className="ml-[0.06em] h-[0.92em] translate-y-[0.02em] text-volt" />
      </span>
      {tagline && (
        <span className="hidden border-l border-white/20 pl-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.18em] text-white/70 sm:block">
          Servicios
          <br />
          eléctricos
        </span>
      )}
    </span>
  )
}
