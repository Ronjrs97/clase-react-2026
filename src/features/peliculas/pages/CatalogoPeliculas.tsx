import { useEffect, useState } from 'react'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { PELICULAS_EJEMPLO } from '../data/peliculas-ejemplo'
import type { Pelicula, PeliculaResumen } from '../models/pelicula'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { SearchX } from 'lucide-react'
import type { Pagina } from '@/shared/models/pagina'
import { buscar, descubrir } from '../services/peliculas.service'
import { MensajeError } from '@/shared/components/MensajeError'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import axios from 'axios'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
// Filtros, Grilla y Paginador solo pintan y avisan.
export function CatalogoPeliculas({ esFavorita, onFavorito }: Props) {
  //* TODO M3: useState para la búsqueda y un dato DERIVADO con las películas que coinciden
  const [busqueda, setBusqueda ] = useState('')

  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string|null>(null)
  const [respuesta, setRespuesta] = useState<Pagina<Pelicula> | null>(null)
  const [intento, setIntento ] = useState(0)

  const visibles = PELICULAS_EJEMPLO.filter((p) => p.title.toLowerCase().includes(busqueda.toLowerCase()))
  // TODO M4: cambiar PELICULAS_EJEMPLO por TMDB (useEffect + servicio) con carga y error

  const formato = new Intl.NumberFormat('es-VE')

  useEffect(() => {
    const control = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = busqueda ? await buscar(busqueda, 1, control.signal) : await descubrir({pagina: 1}, control.signal)
        setRespuesta(datos)
      } catch (e) {
        if (!axios.isCancel(e)) {
          setError((e as Error).message)
        }
      } finally {
        if (!control.signal.aborted) {
          setCargando(false)
        }
      }

    }

    cargar()

    return () => control.abort()
  }, [busqueda, intento])

  // TODO M5: useState para género, orden y página. Al cambiar un filtro, volver a la página 1

  return (
    <section>
      <title>{busqueda ? `"${busqueda}" - Cartelera ` : "Películas · Cartelera" }</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? `Resultados` : "Películas" }</h1>
        <p className='text-sm text-muted-foreground'>{ respuesta ? formato.format(respuesta.total_results) : '0' } peliculas</p>
      </div>

      <FiltrosPeliculas
        busqueda={busqueda}
        genero={undefined}
        orden="popularity.desc"
        generos={[]}
        onBuscar={setBusqueda}
        onGenero={() => {}}
        onOrden={() => {}}
      />
      {
        error ? (
          <MensajeError mensaje={error} onReintentar={() => setIntento(intento + 1)} />
        ) : !respuesta ? (
          <EsqueletoGrilla/>
        ) : respuesta.results.length === 0 ? (
          <EstadoVacio icono={SearchX} titulo="Sin resultados">
            <p>No hay peliculas que coincidan con "{busqueda}"</p>
          </EstadoVacio>
        ) : (
          <div className={cargando ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
            <GrillaPeliculas peliculas={respuesta.results} esFavorita={esFavorita} onFavorito={onFavorito} />
          </div>
        )
      }
    </section>
  )
}
