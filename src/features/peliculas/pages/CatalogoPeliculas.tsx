import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { PELICULAS_EJEMPLO } from '../data/peliculas-ejemplo'
import type { PeliculaResumen } from '../models/pelicula'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
// Filtros, Grilla y Paginador solo pintan y avisan.
export function CatalogoPeliculas({ esFavorita, onFavorito }: Props) {
  // TODO M3: useState para la búsqueda y un dato DERIVADO con las películas que coinciden
  // TODO M4: cambiar PELICULAS_EJEMPLO por TMDB (useEffect + servicio) con carga y error
  // TODO M5: useState para género, orden y página. Al cambiar un filtro, volver a la página 1

  return (
    <section>
      <title>Películas · Cartelera</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Películas</h1>
      </div>

      <FiltrosPeliculas
        busqueda=""
        genero={undefined}
        orden="popularity.desc"
        generos={[]}
        onBuscar={() => {}}
        onGenero={() => {}}
        onOrden={() => {}}
      />

      <GrillaPeliculas peliculas={PELICULAS_EJEMPLO} esFavorita={esFavorita} onFavorito={onFavorito} />
    </section>
  )
}
