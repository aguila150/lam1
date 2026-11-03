import Image from "next/image"
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react"
import { whatsappLink, type WhatsAppMessageKey } from "@/lib/site-config"

export type Service = {
  id: WhatsAppMessageKey
  number: string
  title: string
  description: string
  items: string[]
  image: string
  imageAlt: string
  icon: LucideIcon
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgb(11_31_58/0.04),0_12px_32px_-16px_rgb(11_31_58/0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-navy/15 hover:shadow-[0_24px_48px_-20px_rgb(11_31_58/0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/0 to-transparent" aria-hidden="true" />
        <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1 font-heading text-xs font-bold tracking-widest text-white backdrop-blur">
          {service.number}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-6 pb-7 pt-10 sm:px-7">
        <span className="absolute -top-7 left-6 flex size-14 items-center justify-center rounded-2xl bg-navy shadow-lg ring-4 ring-white transition-colors duration-300 group-hover:bg-volt sm:left-7">
          <Icon
            className="size-6 text-volt transition-colors duration-300 group-hover:text-navy"
            aria-hidden="true"
          />
        </span>

        <h3 className="text-2xl font-extrabold tracking-tight text-navy">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>

        <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] text-navy">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-volt/25">
                <Check className="size-3 text-navy" strokeWidth={3} aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(service.id)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar servicio: ${service.title} por WhatsApp`}
          className="mt-8 inline-flex items-center justify-between gap-2 rounded-full bg-navy py-3.5 pl-6 pr-2 font-semibold text-white transition-colors duration-300 hover:bg-volt hover:text-navy lg:mt-auto lg:translate-y-0"
        >
          Consultar servicio
          <span className="flex size-9 items-center justify-center rounded-full bg-volt text-navy transition-colors duration-300 group-hover:bg-white">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </article>
  )
}
