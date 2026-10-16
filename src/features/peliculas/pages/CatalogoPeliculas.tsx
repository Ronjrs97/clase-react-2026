import axios from 'axios'
import { SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { MensajeError } from '@/shared/components/MensajeError'
import type { Pagina } from '@/shared/models/pagina'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import type { Pelicula, PeliculaResumen } from '../models/pelicula'
import { buscar, descubrir } from '../services/peliculas.service'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

const formato = new Intl.NumberFormat('es-VE')

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
export function CatalogoPeliculas({ esFavorita, onFavorito }: Props) {
  const [busqueda, setBusqueda] = useState('')

  // M4 · Estado de la petición: los datos, si está cargando y si falló
  const [respuesta, setRespuesta] = useState<Pagina<Pelicula> | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [intento, setIntento] = useState(0) // "Reintentar" lo sube y el efecto vuelve a correr

  // M4 · useEffect: "después de pintar, sincronízate con la API".
  // Se vuelve a ejecutar cada vez que cambia algo del arreglo de dependencias.
  useEffect(() => {
    const control = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const datos = busqueda ? await buscar(busqueda, 1, control.signal) : await descubrir({ pagina: 1 }, control.signal)
        setRespuesta(datos)
      } catch (e) {
        // Si la cancelamos nosotros (ver la limpieza), no es un error real
        if (!axios.isCancel(e)) setError((e as Error).message)
      } finally {
        if (!control.signal.aborted) setCargando(false)
      }
    }
    cargar()

    // Limpieza: si la búsqueda cambia antes de que llegue la respuesta, cancelamos la vieja
    return () => control.abort()
  }, [busqueda, intento])

  // TODO M5: useState para género, orden y página. Al cambiar un filtro, volver a la página 1

  return (
    <section>
      <title>{busqueda ? `“${busqueda}” · Cartelera` : 'Películas · Cartelera'}</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? 'Resultados' : 'Películas'}</h1>
        {respuesta && <p className="text-sm text-muted-foreground">{formato.format(respuesta.total_results)} películas</p>}
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
        </div>
      )}
    </section>
  )
}
