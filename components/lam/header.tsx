"use client"

import { useEffect, useState } from "react"
import { Menu, MessageCircle, X } from "lucide-react"
import { LamLogo } from "@/components/lam/logo"
import { NAV_LINKS, whatsappLink } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-navy transition-shadow duration-300",
        scrolled && "shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]">
        <a href="#inicio" className="rounded-md" aria-label="LAM Servicios, ir al inicio">
          <LamLogo />
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-volt transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_var(--volt)] sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-navy lg:hidden"
      >
        <nav aria-label="Navegación móvil" className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3.5 font-heading text-lg font-semibold text-white transition-colors hover:bg-white/5"
                >
                  {link.label}
                  <span className="size-1.5 rounded-full bg-volt" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-volt px-5 py-3.5 font-bold text-navy"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
