"use client"

import { FormEvent, useState } from "react"

type FormData = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
}

const initialForm: FormData = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  direccion: "",
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function update(field: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setSending(true)

    try {
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        const message =
          result?.detail ||
          result?.message ||
          result?.errors?.[0]?.defaultMessage ||
          "No se pudo enviar el formulario. Revisá los datos e intentá nuevamente."
        throw new Error(message)
      }

      setForm(initialForm)
      setSuccess(
        `¡Gracias! Tus datos se registraron correctamente. Número de cliente: ${result?.id ?? "confirmado"}.`,
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor. Verificá que el backend esté iniciado.",
      )
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40 focus:border-volt focus:ring-2 focus:ring-volt/20"

  const labelClass = "block text-sm font-semibold text-white/90"

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-12 w-full max-w-3xl text-left">
      <h3 className="text-2xl font-bold text-white">Dejanos tus datos</h3>
      <p className="mt-2 text-sm text-white/65">
        Completá el formulario y registraremos tus datos para que podamos contactarte.
        Todos los campos son obligatorios.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Nombre
          <input
            className={inputClass}
            name="nombre"
            autoComplete="given-name"
            maxLength={100}
            required
            value={form.nombre}
            onChange={(event) => update("nombre", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Apellido
          <input
            className={inputClass}
            name="apellido"
            autoComplete="family-name"
            maxLength={100}
            required
            value={form.apellido}
            onChange={(event) => update("apellido", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Correo electrónico
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={100}
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </label>

        <label className={labelClass}>
          Teléfono
          <input
            className={inputClass}
            type="tel"
            name="telefono"
            autoComplete="tel"
            maxLength={20}
            required
            value={form.telefono}
            onChange={(event) => update("telefono", event.target.value)}
          />
        </label>

        <label className={`${labelClass} sm:col-span-2`}>
          Dirección
          <input
            className={inputClass}
            name="direccion"
            autoComplete="street-address"
            maxLength={200}
            required
            value={form.direccion}
            onChange={(event) => update("direccion", event.target.value)}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-red-300/30 bg-red-400/10 p-4 text-sm text-red-100">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-volt px-8 py-4 font-bold text-navy transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Enviando..." : "Enviar mis datos"}
      </button>
    </form>
  )
}
