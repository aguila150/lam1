import { BadgeCheck, Handshake, ShieldCheck, Wrench } from "lucide-react"
import { Reveal } from "@/components/lam/reveal"
import { SectionHeading } from "@/components/lam/section-heading"

const benefits = [
  {
    icon: BadgeCheck,
    title: "Experiencia comprobada",
    text: "30 años brindando soluciones y realizando trabajos.",
  },
  {
    icon: Handshake,
    title: "Atención personalizada",
    text: "Cada cliente recibe asesoramiento según sus necesidades.",
  },
  {
    icon: ShieldCheck,
    title: "Compromiso y responsabilidad",
    text: "Trabajos realizados con atención a la seguridad y los detalles.",
  },
  {
    icon: Wrench,
    title: "Soluciones integrales",
    text: "Diferentes servicios para resolver necesidades del hogar y comercio.",
  },
]

export function Benefits() {
  return (
    <section aria-labelledby="beneficios-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading id="beneficios-title" eyebrow="Diferenciales" title="¿Por qué elegir LAM?" />
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="bg-white">
              <Reveal delay={i * 100} className="group h-full p-8 transition-colors duration-300 hover:bg-mist">
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-navy transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-6 text-volt" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-sm font-bold text-navy/25">0{i + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-tight text-navy">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                <span
                  className="mt-6 block h-1 w-10 rounded-full bg-volt transition-all duration-300 group-hover:w-16"
                  aria-hidden="true"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
