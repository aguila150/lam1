/**
 * Configuración central de LAM Servicios.
 * Modificá acá los datos de contacto del negocio; se reflejan en toda la página.
 */

/**
 * NÚMERO DE WHATSAPP
 * Formato internacional sin "+", espacios ni guiones.
 * Argentina (celular): 549 + código de área sin 0 + número sin 15.
 * Tomado del sitio actual del negocio (+54 9 11 3097-2850).
 */
export const WHATSAPP_NUMBER = "5491130972850"

/**
 * LOGOTIPO ORIGINAL DE LAM
 * 1. Guardá el archivo en /public/images (ej: /public/images/logo-lam.png, idealmente PNG transparente o SVG).
 * 2. Completá `src` con su ruta y ajustá `width`/`height` a las proporciones reales del archivo.
 * Mientras `src` sea null se muestra el texto "LAM" en blanco.
 */
export const LOGO = {
  src: null as string | null,
  width: 160,
  height: 48,
  alt: "LAM Servicios",
}

export const CONTACT = {
  /** Teléfono tal como se muestra en pantalla */
  phoneDisplay: "+54 9 11 3097-2850",
  /** Teléfono para el enlace tel: */
  phoneHref: "+5491130972850",
  /** Reemplazar por el correo real: el sitio actual muestra un correo de prueba */
  email: "emaildeprueba@gmail.com",
  /** Completar con la zona de cobertura o dirección. null = "A confirmar" */
  location: null as string | null,
  /** Completar con los horarios de atención. null = "A confirmar" */
  hours: null as string | null,
}

export const WHATSAPP_MESSAGES = {
  general: "Hola, quisiera consultar por sus servicios y solicitar un presupuesto.",
  instalaciones: "Hola, quisiera consultar por un trabajo de instalaciones eléctricas.",
  artefactos: "Hola, quisiera consultar por la instalación de un artefacto.",
  calefones: "Hola, quisiera consultar por el mantenimiento o reparación de un calefón.",
} as const

export type WhatsAppMessageKey = keyof typeof WHATSAPP_MESSAGES

export function whatsappLink(key: WhatsAppMessageKey = "general") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[key])}`
}

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
] as const
