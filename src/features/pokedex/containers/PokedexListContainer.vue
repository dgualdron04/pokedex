<template>
  <SearchWrapper
    :list="pokemonList.items.value"
    placeholder="Buscar Pokemon..."
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
        :onToggleFavorite="() => {}"
      />
    </template>
  </SearchWrapper>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { UsePokedexList } from "../composables/UsePokedexList.ts";
import PokedexList from "../components/organisms/PokedexList.vue";
import SearchWrapper from "@/features/search/components/SearchWrapper.vue";

const pokemonList = UsePokedexList(20);

onMounted(pokemonList.init);
</script>
