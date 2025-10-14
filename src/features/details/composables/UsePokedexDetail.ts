import { computed, watch } from "vue";
import { useApi } from "../../../shared/composables/UseApi";
import {
  toPokemon,
  type Pokemon,
  type PokemonApiResponse,
} from "../../../shared/models/pokemon";
import { PokeApiService } from "../../pokedex/services/PokeApiService";

export function UsePokedexDetail(initialName?: string) {
  const {
    loading,
    data: apiData,
    error,
    fetch,
  } = useApi<PokemonApiResponse, string>(
    (name: string) => PokeApiService.getPokemonByName(name),
    initialName ? { autoFetch: true, params: initialName } : undefined,
  );

  const pokemon = computed<Pokemon | null>(() =>
    apiData.value ? toPokemon(apiData.value) : null,
  );

  async function refetch(name: string) {
    await fetch(name);
  }

  watch(
    () => initialName,
    (n) => {
      if (typeof n === "string" && n.length) void fetch(n);
    },
  );

  return { pokemon, loading, error, refetch };
}
