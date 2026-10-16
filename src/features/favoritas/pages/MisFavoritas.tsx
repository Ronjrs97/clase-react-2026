import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'
import { EstadoVacio } from '@/shared/components/EstadoVacio'

interface Props {
  favoritas: PeliculaResumen[]
  onFavorito: (pelicula: PeliculaResumen) => void
  onIrAlCatalogo: () => void
}

// La misma Grilla, ahora con datos que no vienen de la API sino del estado de App
export function MisFavoritas({ favoritas, onFavorito, onIrAlCatalogo }: Props) {
  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {/* M2 · Ternario: una cosa u otra según haya favoritas o no */}
      {favoritas.length === 0 ? (
        // M2 · children: lo que va entre <EstadoVacio> y </EstadoVacio> lo decide el padre
        <EstadoVacio icono={Heart} titulo="Todavía no marcas ninguna película">
          <Button variant="outline" onClick={onIrAlCatalogo}>
            Ir al catálogo
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas peliculas={favoritas} esFavorita={() => true} onFavorito={onFavorito} />
      )}
    </section>
  )
}
