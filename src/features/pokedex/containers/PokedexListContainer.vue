<template>
  <SearchWrapper
    :list="items"
    placeholder="Search"
    :selector="(p) => p.name"
    :debounceMs="150"
    :minChars="1"
  >
    <template #default="{ results, active }">
      <PokedexList
        :pokemons="results"
        :loading="pokemonList.loading.value"
        :error="pokemonList.error.value"
        :hasMore="!active && pokemonList.hasMore.value"
        :onFetchMore="pokemonList.fetchMore"
        :onToggleFavorite="
          (p) =>
            favoriteList.toggle({
              id: p.id,
              name: p.name,
              img: `${baseUrl}/${p.name}`,
            })
        "
        detailRouteName="pokemon-detail"
      />
    </template>
  </SearchWrapper>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { UsePokedexList } from "../composables/UsePokedexList";
import { UseFavorites } from "@/features/favorites/composables/UseFavorites";
import PokedexList from "../components/organisms/PokedexList.vue";
import SearchWrapper from "@/features/search/components/SearchWrapper.vue";

const pokemonList = UsePokedexList(20);
const favoriteList = UseFavorites();

const items = computed(() =>
  pokemonList.items.value.map((pokemon) => ({
    ...pokemon,
    isFavorite: favoriteList.isFavorite(pokemon.id),
  })),
);

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

onMounted(pokemonList.init);
</script>
