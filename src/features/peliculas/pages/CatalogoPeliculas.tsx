import { useState } from 'react'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { PELICULAS_EJEMPLO } from '../data/peliculas-ejemplo'
import type { PeliculaResumen } from '../models/pelicula'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { SearchX } from 'lucide-react'

interface Props {
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
// Filtros, Grilla y Paginador solo pintan y avisan.
export function CatalogoPeliculas({ esFavorita, onFavorito }: Props) {
  //* TODO M3: useState para la búsqueda y un dato DERIVADO con las películas que coinciden
  const [busqueda, setBusqueda ] = useState('')

  const visibles = PELICULAS_EJEMPLO.filter((p) => p.title.toLowerCase().includes(busqueda.toLowerCase()))
  // TODO M4: cambiar PELICULAS_EJEMPLO por TMDB (useEffect + servicio) con carga y error
  // TODO M5: useState para género, orden y página. Al cambiar un filtro, volver a la página 1

  return (
    <section>
      <title>{busqueda ? `"${busqueda}" - Cartelera ` : "Películas · Cartelera" }</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? `Resultados` : "Películas" }</h1>
        <p className='text-sm text-muted-foreground'>{ visibles.length } peliculas</p>
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
        visibles.length === 0 ? (
          <EstadoVacio icono={SearchX} titulo="Sin resultados">
            <p>No hay peliculas que coincidan con "{busqueda}"</p>
          </EstadoVacio>
          ) :
          <GrillaPeliculas peliculas={visibles} esFavorita={esFavorita} onFavorito={onFavorito} />
        }  
    </section>
  )
}
