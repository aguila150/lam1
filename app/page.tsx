import { About } from "@/components/lam/about"
import { Benefits } from "@/components/lam/benefits"
import { ContactCTA } from "@/components/lam/contact-cta"
import { Footer } from "@/components/lam/footer"
import { Header } from "@/components/lam/header"
import { Hero } from "@/components/lam/hero"
import { Services } from "@/components/lam/services"
import { WhatsAppButton } from "@/components/lam/whatsapp-button"

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:font-bold focus:text-navy"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <About />
        <Benefits />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
