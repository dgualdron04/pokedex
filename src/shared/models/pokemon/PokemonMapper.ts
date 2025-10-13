import type { Pokemon, PokemonApiResponse } from "./PokemonTypes";

export function toPokemon(api: PokemonApiResponse): Pokemon {
  return {
    id: api.id,
    name: api.name,
    height: api.height,
    weight: api.weight,
    types: api.types.map((t) => t.type.name),
    img: api.sprites.other?.["official-artwork"]?.front_default ?? "",
  };
}
