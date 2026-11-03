import { Flame, Lamp, PlugZap } from "lucide-react"
import { Reveal } from "@/components/lam/reveal"
import { ServiceCard, type Service } from "@/components/lam/service-card"
import { SectionHeading } from "@/components/lam/section-heading"

const services: Service[] = [
  {
    id: "instalaciones",
    number: "01",
    title: "Instalaciones eléctricas",
    description:
      "Realizamos instalaciones y trabajos eléctricos para garantizar el correcto funcionamiento y la seguridad de tus espacios.",
    items: [
      "Cableados generales.",
      "Montaje de tableros eléctricos.",
      "Instalación de llaves térmicas.",
      "Instalación de tomacorrientes.",
      "Diagnóstico y resolución de fallas eléctricas.",
    ],
    image: "/images/servicio-instalaciones.png",
    imageAlt: "Técnico conectando el cableado de un tomacorriente",
    icon: PlugZap,
  },
  {
    id: "artefactos",
    number: "02",
    title: "Instalación de artefactos",
    description:
      "Instalación y colocación prolija de diferentes elementos para mejorar la funcionalidad y comodidad de tu hogar.",
    items: [
      "Luminarias y lámparas.",
      "Ventiladores de techo.",
      "Extractores de aire.",
      "Canillas.",
      "Bajo mesadas y alacenas.",
    ],
    image: "/images/servicio-artefactos.png",
    imageAlt: "Técnico instalando una luminaria colgante en un living moderno",
    icon: Lamp,
  },
  {
    id: "calefones",
    number: "03",
    title: "Mantenimiento y reparación de calefones",
    description:
      "Servicio de mantenimiento y reparación para mantener tu calefón en buenas condiciones de funcionamiento.",
    items: [
      "Limpieza y mantenimiento.",
      "Limpieza de sarro.",
      "Cambio de diafragmas.",
      "Revisión y calibración de llama.",
      "Diagnóstico de funcionamiento.",
    ],
    image: "/images/servicio-calefones.png",
    imageAlt: "Técnica revisando el quemador de un calefón con un multímetro",
    icon: Flame,
  },
]

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            id="servicios-title"
            eyebrow="Servicios"
            title="Nuestros servicios"
            subtitle="Soluciones integrales para tu hogar y comercio."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 120} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
