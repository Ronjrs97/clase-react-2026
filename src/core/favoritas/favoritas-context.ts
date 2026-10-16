// TODO M7 · Context: un canal para pasar datos a cualquier componente del árbol
// sin ir pasándolos por props nivel por nivel (adiós "prop drilling").
//
//   1. Una interface FavoritasValor { favoritas, esFavorita, alternar }
//   2. export const FavoritasContext = createContext<FavoritasValor | null>(null)
//   3. export function useFavoritas()  -> use(FavoritasContext), con error si no hay Provider
export {}
