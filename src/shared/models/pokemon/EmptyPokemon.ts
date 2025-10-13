import type { Pokemon } from "./PokemonTypes";

export const emptyPokemon: Readonly<Pokemon> = {
  id: 0,
  name: "",
  weight: 0,
  height: 0,
  types: [],
  img: "",
};
