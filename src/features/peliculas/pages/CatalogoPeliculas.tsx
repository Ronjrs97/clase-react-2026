import axios from 'axios'
import { SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { MensajeError } from '@/shared/components/MensajeError'
import { Paginador } from '@/shared/components/Paginador'
import { MAX_PAGINAS, type Pagina } from '@/shared/models/pagina'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import type { Genero, Orden, Pelicula, PeliculaResumen } from '../models/pelicula'
import { buscar, descubrir, obtenerGeneros } from '../services/peliculas.service'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

const formato = new Intl.NumberFormat('es-VE')

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
export function CatalogoPeliculas({ esFavorita, onFavorito }: Props) {
  // M5 · Estado de los filtros: cada useState es una memoria independiente
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState<number>()
  const [orden, setOrden] = useState<Orden>('popularity.desc')
  const [pagina, setPagina] = useState(1)

  // M4 · Estado de la petición
  const [respuesta, setRespuesta] = useState<Pagina<Pelicula> | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [intento, setIntento] = useState(0)
  const [generos, setGeneros] = useState<Genero[]>([])

  useEffect(() => {
    const control = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = busqueda
          ? await buscar(busqueda, pagina, control.signal)
          : await descubrir({ pagina, genero, orden }, control.signal)
        setRespuesta(datos)
      } catch (e) {
        if (!axios.isCancel(e)) setError((e as Error).message)
      } finally {
        if (!control.signal.aborted) setCargando(false)
      }
    }
    cargar()

    return () => control.abort()
  }, [busqueda, genero, orden, pagina, intento]) // M5: cualquier filtro dispara otra petición

  // M5 · Los géneros se piden UNA vez: arreglo de dependencias vacío
  useEffect(() => {
    const control = new AbortController()
    obtenerGeneros(control.signal)
      .then(setGeneros)
      .catch(() => {}) // si fallan, el select solo muestra "Todos"
    return () => control.abort()
  }, [])

  // Al cambiar un filtro volvemos a la página 1. Se hace en el manejador del evento, NO en un efecto.
  function cambiarBusqueda(texto: string) {
    setBusqueda(texto)
    setPagina(1)
  }
  function cambiarGenero(g: number | undefined) {
    setGenero(g)
    setPagina(1)
  }
  function cambiarOrden(o: Orden) {
    setOrden(o)
    setPagina(1)
  }
  function irAPagina(nueva: number) {
    setPagina(nueva)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Dato derivado: TMDB no deja pasar de la página 500
  const totalPaginas = Math.min(respuesta?.total_pages ?? 0, MAX_PAGINAS)

  return (
    <section>
      <title>{busqueda ? `“${busqueda}” · Cartelera` : 'Películas · Cartelera'}</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? 'Resultados' : 'Películas'}</h1>
        {respuesta && <p className="text-sm text-muted-foreground">{formato.format(respuesta.total_results)} películas</p>}
      </div>

      <FiltrosPeliculas
        busqueda={busqueda}
        genero={genero}
        orden={orden}
        generos={generos}
        onBuscar={cambiarBusqueda}
        onGenero={cambiarGenero}
        onOrden={cambiarOrden}
      />

      {/* Una vista distinta para cada estado de la petición */}
      {error ? (
        <MensajeError mensaje={error} onReintentar={() => setIntento(intento + 1)} />
      ) : !respuesta ? (
        <EsqueletoGrilla />
      ) : respuesta.results.length === 0 ? (
        <EstadoVacio icono={SearchX} titulo="Sin resultados">
          <p>No hay películas que coincidan con “{busqueda}”.</p>
        </EstadoVacio>
      ) : (
        // Mientras llega lo nuevo, lo anterior se ve atenuado
        <div className={cargando ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
          <GrillaPeliculas peliculas={respuesta.results} esFavorita={esFavorita} onFavorito={onFavorito} />
          <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPagina} />
        </div>
      )}
    </section>
  )
}
