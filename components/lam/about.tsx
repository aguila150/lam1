import Image from "next/image"
import { Award, HeartHandshake, ShieldCheck } from "lucide-react"
import { Reveal } from "@/components/lam/reveal"
import { SectionHeading } from "@/components/lam/section-heading"

const highlights = [
  {
    icon: Award,
    title: "30 años de experiencia",
    text: "Tres décadas brindando soluciones y realizando trabajos de diferentes especialidades.",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    text: "Asesoramiento directo para encontrar la solución más conveniente para cada necesidad.",
  },
  {
    icon: ShieldCheck,
    title: "Trabajo responsable",
    text: "Compromiso con la seguridad, la prolijidad y la calidad en cada servicio.",
  },
]

export function About() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom_right,black_20%,transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -bottom-4 -left-4 h-1/2 w-1/2 rounded-3xl bg-volt sm:-bottom-6 sm:-left-6" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-navy-2 shadow-2xl shadow-black/40">
            <Image
              src="/images/nosotros-luis.png"
              alt="Retrato de un técnico electricista en su taller"
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 28rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-4 top-6 rounded-2xl border border-white/10 bg-navy/85 px-5 py-4 backdrop-blur sm:-right-6">
            <p className="font-heading text-lg font-extrabold">Luis</p>
            <p className="text-xs font-medium uppercase tracking-wider text-volt">Técnico a cargo</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="nosotros-title"
              eyebrow="Sobre nosotros"
              title="Experiencia que genera confianza."
              tone="dark"
              align="left"
            />
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
              Soy Luis, técnico a cargo de LAM. Me dedico a brindar soluciones integrales de electricidad,
              instalaciones y mantenimiento del hogar, ofreciendo siempre un trabajo seguro, prolijo y de
              confianza, tanto para viviendas como para comercios.
            </p>
          </Reveal>

          <ul className="mt-10 flex flex-col gap-4">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 100} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-volt/40 hover:bg-white/[0.06]">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-volt">
                    <Icon className="size-6 text-navy" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-1 leading-relaxed text-white/70">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
