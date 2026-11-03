import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { LamLogo } from "@/components/lam/logo"
import { CONTACT, NAV_LINKS, whatsappLink } from "@/lib/site-config"

const services = [
  "Instalaciones eléctricas",
  "Instalación de artefactos",
  "Mantenimiento de calefones",
]

const PENDING = "A confirmar"

export function Footer() {
  const contactItems = [
    { icon: Phone, label: "Teléfono", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneHref}` },
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.phoneDisplay, href: whatsappLink("general"), external: true },
    { icon: Mail, label: "Correo", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: MapPin, label: "Ubicación", value: CONTACT.location ?? PENDING },
    { icon: Clock, label: "Horarios", value: CONTACT.hours ?? PENDING },
  ]

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr] lg:gap-10">
        <div>
          <LamLogo />
          <p className="mt-5 max-w-xs leading-relaxed text-white/65">
            Soluciones eléctricas, instalación de artefactos y mantenimiento de calefones para hogares y comercios.
            30 años de experiencia.
          </p>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-volt">Secciones</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white/70 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-volt">Servicios</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {services.map((s) => (
              <li key={s}>
                <a href="#servicios" className="text-white/70 transition-colors hover:text-white">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-volt">Contacto</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <Icon className="mt-0.5 size-4 shrink-0 text-volt" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/45">{label}</span>
                    <span className={value === PENDING ? "italic text-white/45" : "break-words text-white/85"}>
                      {value}
                    </span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex gap-3 transition-colors hover:text-white [&:hover_span]:text-white"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex gap-3">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-white/50 sm:flex-row sm:px-8">
          <p>© 2026 LAM Servicios. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-volt" aria-hidden="true" />
            Hogares y comercios
          </p>
        </div>
      </div>
    </footer>
  )
}
