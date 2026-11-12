 "use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || "No se pudo iniciar sesión.")
      router.replace("/admin")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de conexión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07162b] px-5 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <a href="/" className="text-2xl font-extrabold text-[#0b1f3a]">LA<span className="text-[#ffd43b]">M</span></a>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Administración</p>
        <h1 className="mt-8 text-2xl font-extrabold text-[#0b1f3a]">Acceso de administrador</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Ingresá con las credenciales configuradas en el backend.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">Correo electrónico
            <input type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#16365c]" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">Contraseña
            <input type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#16365c]" />
          </label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-full bg-[#0b1f3a] px-5 py-3 font-bold text-white hover:bg-[#16365c] disabled:opacity-60">{loading ? "Ingresando..." : "Ingresar"}</button>
        </form>
        <a href="/" className="mt-5 block text-center text-sm font-semibold text-slate-500 hover:underline">Volver al sitio</a>
      </section>
    </main>
  )
}
