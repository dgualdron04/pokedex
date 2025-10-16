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
        :loading="loading"
        :error="error"
        :hasMore="hasMore"
        :onFetchMore="noFetch"
        :onToggleFavorite="
          (p) => favoriteList.toggle({ id: p.id, name: p.name })
        "
        detailRouteName="favorites-detail"
      />
    </template>
  </SearchWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UseFavorites } from "@/features/favorites/composables/UseFavorites";
import PokedexList from "@/features/pokedex/components/organisms/PokedexList.vue";
import SearchWrapper from "@/features/search/components/SearchWrapper.vue";
import { UseFavoritesList } from "../composables/UseFavoritesList";

const { items } = UseFavoritesList();
const favoriteList = UseFavorites();
const loading = computed(() => false);
const error = computed(() => false);
const hasMore = computed(() => false);
function noFetch() {}
</script>
