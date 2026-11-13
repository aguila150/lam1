"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarDays, ClipboardList, Users, FileText, BriefcaseBusiness,
  History, Menu, X, Search, Plus, LogOut, RefreshCw, AlertCircle
} from "lucide-react"

type Row = Record<string, any>
const sections = [
  ["Resumen", ClipboardList], ["Disponibilidad", CalendarDays], ["Solicitudes", ClipboardList],
  ["Clientes", Users], ["Presupuestos", FileText], ["Trabajos", BriefcaseBusiness], ["Historial", History],
] as const
const weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const statusLabel: Record<string, string> = {
  PENDIENTE: "Pendiente", PRESUPUESTADA: "Presupuestada", ACEPTADA: "Aceptada",
  RECHAZADA: "Rechazada", CANCELADA: "Cancelada", FINALIZADA: "Finalizada",
  EN_CURSO: "En curso", PROGRAMADO: "Programado",
}

async function api(path: string, init?: RequestInit) {
  const response = await fetch(path, { credentials: "same-origin", ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) } })
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (response.status === 401) throw new Error("SESSION")
  if (!response.ok) throw new Error(data?.message || `Error ${response.status}`)
  return data
}
function money(value: any) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 2 }).format(Number(value || 0))
}
function dateText(value: any) {
  if (!value) return "—"
  const d = new Date(`${String(value).slice(0,10)}T12:00:00`)
  return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("es-AR")
}

export default function AdminPage() {
  const router = useRouter()
  const [section, setSection] = useState<string>("Resumen")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [data, setData] = useState<Record<string, Row[]>>({})
  const [query, setQuery] = useState("")
  const [day, setDay] = useState("1")
  const [start, setStart] = useState("09:00")
  const [end, setEnd] = useState("18:00")
  const [exceptionDate, setExceptionDate] = useState("")
  const [exceptionAvailable, setExceptionAvailable] = useState(false)
  const [exceptionStart, setExceptionStart] = useState("09:00")
  const [exceptionEnd, setExceptionEnd] = useState("18:00")
  const [exceptionReason, setExceptionReason] = useState("")
  const [quoteRequest, setQuoteRequest] = useState("")
  const [quoteAmount, setQuoteAmount] = useState("")
  const [quoteDetail, setQuoteDetail] = useState("")
  const [quoteValidity, setQuoteValidity] = useState("")
  const [workRequest, setWorkRequest] = useState("")
  const [workDate, setWorkDate] = useState("")
  const [workTime, setWorkTime] = useState("09:00")

  async function loadAll() {
    setError("")
    setLoading(true)
    try {
      const me = await api("/api/auth/me")
      if (!me?.authenticated) throw new Error("SESSION")
      setAuthorized(true)  
      const paths = ["clientes", "solicitudes", "disponibilidad", "presupuestos", "trabajos", "historial"]
      const results = await Promise.all(paths.map(async p => [p, await api(`/api/admin/${p}`)] as const))
      setData(Object.fromEntries(results))
    } catch (e) {
      if (e instanceof Error && e.message === "SESSION") router.replace("/admin/login")
      else setError(e instanceof Error ? e.message : "No se pudieron cargar los datos.")
    } finally { setLoading(false) }
  }
  useEffect(() => { loadAll() }, [])

  async function act(path: string, method: string, body?: any) {
    setBusy(true); setError(""); setNotice("")
    try {
      await api(path, { method, ...(body === undefined ? {} : { body: JSON.stringify(body) }) })
      setNotice("Cambios guardados correctamente.")
      await loadAll()
    } catch (e) {
      if (e instanceof Error && e.message === "SESSION") router.replace("/admin/login")
      else setError(e instanceof Error ? e.message : "No se pudo completar la operación.")
    } finally { setBusy(false) }
  }
  async function logout() {
    await api("/api/auth/logout", { method: "POST" }).catch(() => null)
    router.replace("/admin/login")
  }

  const requests = data.solicitudes || []
  const clients = data.clientes || []
  const budgets = data.presupuestos || []
  const jobs = data.trabajos || []
  const weekly = data.disponibilidad?.semanal || []
  const exceptions = data.disponibilidad?.excepciones || []
  const history = data.historial || []
  const filteredRequests = requests.filter(r => `${r.nombre} ${r.apellido} ${r.servicio} ${r.estado} ${r.email}`.toLowerCase().includes(query.toLowerCase()))

  function table(headers: string[], rows: any[][], empty: string) {
    return <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{headers.map(h => <th key={h} className="px-5 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{rows.length ? rows.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j} className="px-5 py-4 align-top">{v}</td>)}</tr>) : <tr><td colSpan={headers.length} className="p-8 text-center text-slate-500">{empty}</td></tr>}</tbody></table></div>
  }
  const card = (label: string, value: number, note: string) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-extrabold">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p></article>

    if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f5f8] px-5 text-[#0b1f3a]">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-extrabold">Administración LAM</h1>

          {loading ? (
            <p className="mt-4 text-slate-500">
              Verificando acceso...
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm text-red-700">
                No se pudo verificar tu sesión. El panel permanece bloqueado.
              </p>

              {error && (
                <p className="mt-2 text-sm text-slate-500">
                  {error}
                </p>
              )}

              <button
                onClick={() => router.replace("/admin/login")}
                className="mt-6 rounded-full bg-[#0b1f3a] px-6 py-3 font-bold text-white"
              >
                Ir al inicio de sesión
              </button>

              <button
                onClick={loadAll}
                className="ml-2 mt-6 rounded-full border border-slate-300 px-6 py-3 font-bold"
              >
                Reintentar
              </button>
            </>
          )}
        </div>
      </main>
    )
  }

return <main className="min-h-screen bg-[#f3f5f8] text-[#0b1f3a]">
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-[#0b1f3a] px-5 text-white shadow-lg">
      <a href="/" className="text-xl font-extrabold tracking-wide">LA<span className="text-[#ffd43b]">M</span> <span className="text-sm font-medium text-white/70">ADMIN</span></a>
      <div className="flex items-center gap-2"><button onClick={loadAll} className="rounded-lg p-2 hover:bg-white/10" title="Actualizar"><RefreshCw size={18}/></button><button onClick={logout} className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-2 text-sm hover:bg-white/10"><LogOut size={16}/> Salir</button><button className="rounded-lg p-2 hover:bg-white/10 lg:hidden" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menú">{mobileOpen?<X/>:<Menu/>}</button></div>
    </header>
    <div className="mx-auto flex max-w-[1500px]">
      <aside className={`${mobileOpen?"block":"hidden"} fixed inset-y-16 left-0 z-20 w-64 bg-white p-4 shadow-xl lg:static lg:block lg:min-h-[calc(100vh-4rem)] lg:shadow-none`}>
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">Administración</p>
        <nav className="space-y-1">{sections.map(([label,Icon])=><button key={label} onClick={()=>{setSection(label);setMobileOpen(false)}} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${section===label?"bg-[#0b1f3a] text-white":"text-slate-600 hover:bg-slate-100"}`}><Icon size={18}/>{label}</button>)}</nav>
      </aside>
      <section className="min-w-0 flex-1 p-5 sm:p-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-slate-500">LAM Servicios / Administración</p><h1 className="mt-1 text-3xl font-extrabold">{section}</h1><p className="mt-2 text-sm text-slate-500">Gestión conectada a la base de datos.</p></div><a href="/" className="text-sm font-bold text-[#16365c] hover:underline">Volver al sitio →</a></div>
        {error && <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><AlertCircle size={18}/>{error}</div>}
        {notice && <div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</div>}
        {loading ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">Cargando información...</div> : <>
          {section==="Resumen" && <><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{card("Solicitudes pendientes",requests.filter(r=>r.estado==="PENDIENTE").length,"Requieren revisión")}{card("Presupuestos enviados",budgets.filter(b=>b.estado==="ENVIADO").length,"Esperando respuesta")}{card("Trabajos programados",jobs.filter(j=>j.estado==="PROGRAMADO").length,"En agenda")}{card("Clientes registrados",clients.length,"En la base de datos")}</div><div className="mt-7"><h2 className="mb-3 font-bold">Solicitudes recientes</h2>{table(["N.º","Cliente","Servicio","Fecha solicitada","Estado"],requests.slice(0,8).map(r=>[`#${r.id}`,`${r.nombre} ${r.apellido}`,r.servicio,`${dateText(r.fechaSolicitada)} · ${String(r.horaSolicitada).slice(0,5)}`,statusLabel[r.estado]||r.estado]),"Todavía no hay solicitudes.")}</div></>}
          {section==="Solicitudes" && <><div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"><Search size={16} className="text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar cliente, servicio o estado..." className="w-full text-sm outline-none"/></div>{table(["N.º","Cliente / contacto","Servicio y detalle","Fecha / hora","Estado","Acciones"],filteredRequests.map(r=>[<b>#{r.id}</b>,<>{r.nombre} {r.apellido}<br/><span className="text-xs text-slate-500">{r.email} · {r.telefono}</span></>,<>{r.servicio}<br/><span className="text-xs text-slate-500">{r.descripcion}</span></>,`${dateText(r.fechaSolicitada)} · ${String(r.horaSolicitada).slice(0,5)}`,statusLabel[r.estado]||r.estado,<select aria-label={`Estado solicitud ${r.id}`} defaultValue={r.estado} onChange={e=>act(`/api/admin/solicitudes/${r.id}/estado`,"PATCH",{estado:e.target.value,comentario:"Actualizado desde el panel"})} className="rounded-lg border border-slate-300 px-2 py-1">{["PENDIENTE","PRESUPUESTADA","ACEPTADA","RECHAZADA","CANCELADA","EN_CURSO","FINALIZADA"].map(s=><option key={s} value={s}>{statusLabel[s]}</option>)}</select>]),"No hay solicitudes que coincidan.")}</>}
          {section==="Clientes" && table(["ID","Nombre","Correo","Teléfono","Dirección"],clients.map(c=>[c.id,`${c.nombre} ${c.apellido}`,c.email,c.telefono||"—",c.direccion||"—"]),"Todavía no hay clientes.")}
          {section==="Disponibilidad" && <div className="grid gap-5 xl:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold">Agregar / actualizar horario semanal</h2><p className="mt-1 text-sm text-slate-500">Los horarios se pueden configurar por día.</p><form className="mt-4 grid gap-3" onSubmit={e=>{e.preventDefault();act("/api/admin/disponibilidad/semanal","POST",{diaSemana:Number(day),horaInicio:start,horaFin:end,activo:true})}}><label className="text-sm font-semibold">Día<select value={day} onChange={e=>setDay(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2">{weekdays.map((d,i)=><option key={d} value={i+1}>{d}</option>)}</select></label><div className="grid grid-cols-2 gap-3"><label className="text-sm font-semibold">Desde<input type="time" value={start} onChange={e=>setStart(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><label className="text-sm font-semibold">Hasta<input type="time" value={end} onChange={e=>setEnd(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label></div><button disabled={busy} className="rounded-full bg-[#0b1f3a] px-4 py-2.5 text-sm font-bold text-white">Guardar horario</button></form><h3 className="mb-2 mt-6 font-bold">Horarios configurados</h3>{table(["Día","Rango","Acción"],weekly.map(w=>[weekdays[Number(w.diaSemana)-1],`${String(w.horaInicio).slice(0,5)} – ${String(w.horaFin).slice(0,5)}`,<button onClick={()=>act(`/api/admin/disponibilidad/semanal/${w.id}`,"DELETE")} className="text-red-700 hover:underline">Eliminar</button>]),"No hay horarios.")}</article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold">Excepciones y fechas especiales</h2><form className="mt-4 grid gap-3" onSubmit={e=>{e.preventDefault();act("/api/admin/disponibilidad/excepciones","POST",{fecha:exceptionDate,disponible:exceptionAvailable,horaInicio:exceptionAvailable?exceptionStart:null,horaFin:exceptionAvailable?exceptionEnd:null,motivo:exceptionReason})}}><label className="text-sm font-semibold">Fecha<input type="date" required value={exceptionDate} onChange={e=>setExceptionDate(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={exceptionAvailable} onChange={e=>setExceptionAvailable(e.target.checked)}/> Disponible en horario especial</label>{exceptionAvailable&&<div className="grid grid-cols-2 gap-3"><input type="time" value={exceptionStart} onChange={e=>setExceptionStart(e.target.value)} className="rounded-lg border border-slate-300 p-2"/><input type="time" value={exceptionEnd} onChange={e=>setExceptionEnd(e.target.value)} className="rounded-lg border border-slate-300 p-2"/></div>}<input value={exceptionReason} onChange={e=>setExceptionReason(e.target.value)} placeholder="Motivo (opcional)" className="rounded-lg border border-slate-300 p-2"/><button className="rounded-full bg-[#0b1f3a] px-4 py-2.5 text-sm font-bold text-white">Guardar excepción</button></form><h3 className="mb-2 mt-6 font-bold">Excepciones registradas</h3>{table(["Fecha","Disponibilidad","Motivo","Acción"],exceptions.map(x=>[dateText(x.fecha),x.disponible?"Disponible":"No disponible",x.motivo||"—",<button onClick={()=>act(`/api/admin/disponibilidad/excepciones/${x.id}`,"DELETE")} className="text-red-700 hover:underline">Eliminar</button>]),"No hay excepciones.")}</article>
          </div>}
          {section==="Presupuestos" && <><article className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold">Crear presupuesto</h2><form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={e=>{e.preventDefault();act("/api/admin/presupuestos","POST",{solicitudId:Number(quoteRequest),monto:Number(quoteAmount),detalle:quoteDetail,validezHasta:quoteValidity||null});setQuoteRequest("");setQuoteAmount("");setQuoteDetail("");}}><label className="text-sm font-semibold">Solicitud<select required value={quoteRequest} onChange={e=>setQuoteRequest(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"><option value="">Elegir solicitud</option>{requests.filter(r=>["PENDIENTE","PRESUPUESTADA"].includes(r.estado)).map(r=><option key={r.id} value={r.id}>#{r.id} · {r.nombre} {r.apellido} · {r.servicio}</option>)}</select></label><label className="text-sm font-semibold">Monto (ARS)<input required type="number" min="0" step="0.01" value={quoteAmount} onChange={e=>setQuoteAmount(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><label className="text-sm font-semibold md:col-span-2">Detalle<textarea required value={quoteDetail} onChange={e=>setQuoteDetail(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><label className="text-sm font-semibold">Válido hasta<input type="date" value={quoteValidity} onChange={e=>setQuoteValidity(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><button disabled={busy} className="self-end rounded-full bg-[#0b1f3a] px-4 py-2.5 text-sm font-bold text-white">Enviar presupuesto</button></form></article>{table(["N.º","Cliente","Servicio","Monto","Detalle","Estado","Acción"],budgets.map(b=>[b.id,`${b.nombre} ${b.apellido}`,b.servicio,money(b.monto),b.detalle,statusLabel[b.estado]||b.estado,b.estado==="ENVIADO"?<div className="flex gap-2"><button onClick={()=>act(`/api/admin/presupuestos/${b.id}/estado`,"PATCH",{estado:"ACEPTADO"})} className="text-emerald-700 hover:underline">Aceptar</button><button onClick={()=>act(`/api/admin/presupuestos/${b.id}/estado`,"PATCH",{estado:"RECHAZADO"})} className="text-red-700 hover:underline">Rechazar</button></div>:"—"]), "Todavía no hay presupuestos.")}</>}
          {section==="Trabajos" && <><article className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-bold">Programar trabajo</h2><form className="mt-4 grid gap-3 md:grid-cols-3" onSubmit={e=>{e.preventDefault();act("/api/admin/trabajos","POST",{solicitudId:Number(workRequest),fechaProgramada:workDate,horaProgramada:workTime});}}><label className="text-sm font-semibold">Solicitud aceptada<select required value={workRequest} onChange={e=>setWorkRequest(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"><option value="">Elegir solicitud</option>{requests.filter(r=>r.estado==="ACEPTADA").map(r=><option key={r.id} value={r.id}>#{r.id} · {r.nombre} {r.apellido}</option>)}</select></label><label className="text-sm font-semibold">Fecha<input type="date" required value={workDate} onChange={e=>setWorkDate(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><label className="text-sm font-semibold">Hora<input type="time" required value={workTime} onChange={e=>setWorkTime(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 p-2"/></label><button className="rounded-full bg-[#0b1f3a] px-4 py-2.5 text-sm font-bold text-white md:col-span-3">Programar trabajo</button></form></article>{table(["N.º","Cliente","Servicio","Fecha / hora","Estado","Acción"],jobs.map(j=>[j.id,`${j.nombre} ${j.apellido}`,j.servicio,`${dateText(j.fechaProgramada)} · ${String(j.horaProgramada).slice(0,5)}`,statusLabel[j.estado]||j.estado,<select defaultValue={j.estado} onChange={e=>act(`/api/admin/trabajos/${j.id}/estado`,"PATCH",{estado:e.target.value})} className="rounded-lg border border-slate-300 p-1">{["PROGRAMADO","EN_CURSO","FINALIZADO","CANCELADO"].map(s=><option key={s} value={s}>{statusLabel[s]}</option>)}</select>]),"No hay trabajos programados.")}</>}
          {section==="Historial" && table(["Fecha","Solicitud","Cliente","Servicio","Cambio","Comentario"],history.map(h=>[String(h.cambiadoEn||"").replace("T"," ").slice(0,16),`#${h.solicitudId}`,`${h.nombre} ${h.apellido}`,h.servicio,`${h.estadoAnterior||"Nueva"} → ${h.estadoNuevo}`,h.comentario||"—"]),"Todavía no hay movimientos.")}
        </>}
      </section>
    </div>
  </main>
}
