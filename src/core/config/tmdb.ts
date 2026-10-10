export const TMDB_IMG = "https://image.tmdb.org/t/p"

export function imagen(ruta: string | null, size = 'w342'){
    return ruta ? `${TMDB_IMG}/${size}${ruta}` : null
}