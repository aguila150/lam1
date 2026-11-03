import Image from "next/image"
import { ArrowDown, Building2, MessageCircle, ShieldCheck, UserRound, Zap } from "lucide-react"
import { whatsappLink } from "@/lib/site-config"

const indicators = [
  { icon: ShieldCheck, label: "30 años de experiencia" },
  { icon: UserRound, label: "Atención personalizada" },
  { icon: Building2, label: "Hogares y comercios" },
]

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
      <div
        className="absolute -right-40 top-1/3 -z-10 size-[520px] rounded-full bg-navy-2 opacity-60 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            <Zap className="size-3.5 fill-volt" aria-hidden="true" />
            30 años de experiencia
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            Soluciones eléctricas y mantenimiento para tu hogar.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
            Experiencia, seguridad y confianza en cada trabajo. Brindamos soluciones para que tu hogar y
            comercio funcionen como deben.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-volt px-7 py-4 font-bold text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-10px_var(--volt)]"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Solicitar presupuesto
            </a>
            <a
              href="#servicios"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5"
            >
              Conocer nuestros servicios
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {indicators.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/85">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Icon className="size-4 text-volt" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute -right-3 -top-3 h-2/3 w-2/3 rounded-3xl border-2 border-volt/60 sm:-right-5 sm:-top-5"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-2 shadow-2xl shadow-black/40">
            <Image
              src="/images/hero-electricista.png"
              alt="Electricista con experiencia trabajando sobre un tablero eléctrico moderno"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" aria-hidden="true" />
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-2xl bg-white p-4 pr-6 text-navy shadow-xl sm:-left-8">
            <span className="flex size-12 items-center justify-center rounded-xl bg-navy">
              <Zap className="size-6 fill-volt text-volt" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-heading text-3xl font-extrabold leading-none">30</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                años de oficio
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
