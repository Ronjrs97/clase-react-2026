import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import { EstadoVacio } from '@/shared/components/EstadoVacio'

// M7 · Otra feature leyendo el mismo estado global, sin que App se lo pase
export function MisFavoritas({ onIrAlCatalogo }: { onIrAlCatalogo: () => void }) {
  const { favoritas } = useFavoritas()

  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {favoritas.length === 0 ? (
        <EstadoVacio icono={Heart} titulo="Todavía no marcas ninguna película">
          <Button variant="outline" onClick={onIrAlCatalogo}>
            Ir al catálogo
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas peliculas={favoritas} />
      )}
    </section>
  )
}
