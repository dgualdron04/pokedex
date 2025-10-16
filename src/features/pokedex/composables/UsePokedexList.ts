import { computed, ref } from "vue";
import { useApi } from "@/shared/composables/UseApi";
import type { PokemonListResponse } from "@/shared/models/pokemon/PokemonTypes";
import {
  type PokemonListRow,
  toPokemonList,
} from "../adapters/PokemonListAdapter";
import { PokeApiService } from "../services/PokeApiService";

export function UsePokedexList(pageSize = 20) {
  const items = ref<Array<PokemonListRow>>([]);

  const offset = ref<number>(0);
  const total = ref<number | null>(null);

  const {
    loading,
    data: dataApi,
    error,
    fetch,
  } = useApi<PokemonListResponse, { offset: number; limit: number }>(
    ({ offset, limit }: { offset: number; limit: number }) =>
      PokeApiService.getPokemons(offset, limit),
  );

  const hasMore = computed(
    () => total.value === null || items.value.length < total.value,
  );

  async function fetchMore() {
    if (!hasMore.value || loading.value) return;

    await fetch({ offset: offset.value, limit: pageSize });

    const data = dataApi.value;
    if (!data) return;

    items.value.push(...toPokemonList(data.results));
    total.value = data.count;
    offset.value += pageSize;
  }

  async function init(): Promise<void> {
    items.value = [];
    offset.value = 0;
    total.value = null;
    await fetchMore();
  }

  return {
    items,
    loading,
    error,
    hasMore,
    fetchMore,
    init,
  };
}
