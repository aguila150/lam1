import { MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/site-config"

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("general")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-volt p-4 text-navy shadow-[0_12px_32px_-8px_rgb(11_31_58/0.55)] ring-4 ring-navy/10 transition-all hover:-translate-y-1 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-volt/50 [animation-duration:2.5s]" aria-hidden="true" />
      <MessageCircle className="size-6" strokeWidth={2.25} aria-hidden="true" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-300 group-hover:max-w-40 group-focus-visible:max-w-40 sm:inline">
        WhatsApp
      </span>
    </a>
  )
}
