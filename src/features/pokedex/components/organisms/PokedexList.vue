<template>
  <section class="list">
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonItem
          :id="pokemon.id"
          :name="pokemon.name"
          :is-favorite="pokemon.isFavorite ?? false"
          @toggle-fav="() => onToggleFavorite(pokemon)"
          :detail-route-name="props.detailRouteName"
        />
      </li>
    </ul>

    <div ref="sentinel" v-show="hasMore">
      <span v-if="loading">Loding more...</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { PokemonListRow } from "../../adapters/PokemonListAdapter";
import type { PokemonListItem } from "@/shared/models/pokemon";
import PokemonItem from "../molecules/PokemonItem.vue";

const props = defineProps<{
  pokemons: Array<PokemonListRow | PokemonListItem>;
  loading: boolean;
  hasMore: boolean;
  onFetchMore: () => void;
  onToggleFavorite: (p: PokemonListRow) => void;
  detailRouteName?: string;
}>();

const sentinel = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) props.onFetchMore();
    },
    {
      root: null,
      rootMargin: "320px",
      threshold: 0.1,
    },
  );
  if (sentinel.value) observer.observe(sentinel.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<style scoped>
.list {
  width: 100%;
}

.list ul {
  list-style: none;
}
</style>
