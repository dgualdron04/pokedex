<template>
  <PokedexList
    :pokemons="pokemonList.items.value"
    :loading="pokemonList.loading.value"
    :error="pokemonList.error.value"
    :hasMore="pokemonList.hasMore.value"
    :onFetchMore="pokemonList.fetchMore"
    :onToggleFavorite="() => {}"
  />
  <Teleport to="body">
    <RouterView name="modal" />
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { UsePokedexList } from "../composables/UsePokedexList.ts";
import PokedexList from "../components/organisms/PokedexList.vue";

const pokemonList = UsePokedexList(20);

onMounted(pokemonList.init);
</script>
