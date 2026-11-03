import { MessageCircle, Phone } from "lucide-react"
import { BulbM } from "@/components/lam/logo"
import { Reveal } from "@/components/lam/reveal"
import { CONTACT, whatsappLink } from "@/lib/site-config"

export function ContactCTA() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-white px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
        <BulbM
          className="absolute -bottom-16 -right-10 -z-10 h-72 text-volt opacity-[0.07] sm:h-96"
        />
        <div
          className="absolute left-1/2 top-0 -z-10 h-40 w-2/3 -translate-x-1/2 rounded-full bg-volt/15 blur-3xl"
          aria-hidden="true"
        />

        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-volt">
          <span className="h-0.5 w-6 rounded-full bg-volt" aria-hidden="true" />
          Contacto
          <span className="h-0.5 w-6 rounded-full bg-volt" aria-hidden="true" />
        </p>
        <h2
          id="contacto-title"
          className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl"
        >
          ¿Necesitás una solución para tu <span className="text-volt">hogar</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/75">
          Contactanos y recibí asesoramiento para encontrar la mejor solución para tu necesidad.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink("general")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-volt px-8 py-4 text-lg font-bold text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_var(--volt)] sm:w-auto"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Hablar por WhatsApp
          </a>
          <a
            href={`tel:${CONTACT.phoneHref}`}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 px-8 py-4 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 sm:w-auto"
          >
            <Phone className="size-4" aria-hidden="true" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <p className="mt-8 text-sm font-medium text-white/60">Estamos para ayudarte.</p>
      </Reveal>
    </section>
  )
}
