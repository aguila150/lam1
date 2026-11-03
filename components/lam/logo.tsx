import Image from "next/image"
import { LOGO } from "@/lib/site-config"
import { cn } from "@/lib/utils"

/**
 * Renders the original LAM logo once its file is configured in `LOGO` (lib/site-config.ts).
 * Until then it shows a plain white "LAM" wordmark as a neutral placeholder.
 */
export function LamLogo({ className }: { className?: string }) {
  if (LOGO.src) {
    return (
      <Image
        src={LOGO.src}
        alt={LOGO.alt}
        width={LOGO.width}
        height={LOGO.height}
        priority
        className={cn("h-10 w-auto lg:h-11", className)}
      />
    )
  }

  return (
    <span
      className={cn(
        "inline-flex h-10 items-center font-heading text-[1.75rem] font-extrabold leading-none tracking-tight text-white lg:h-11",
        className,
      )}
    >
      LAM
    </span>
  )
}
