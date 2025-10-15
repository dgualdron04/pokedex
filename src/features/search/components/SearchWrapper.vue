<template>
  <SearchBar v-model="search.query.value" :placeholder="placeholder" />

  <slot
    v-if="!search.active.value || search.results.value.length > 0"
    name="default"
    :results="search.active.value ? search.results.value : props.list"
    :query="search.query.value"
    :active="search.active.value"
  />

  <div
    v-if="search.active.value && search.results.value.length === 0"
    class="search-wrapper__not-found-container"
  >
    <div class="search-wrapper__not-found">
      <p class="search-wrapper__not-found-title">Uh-Oh!</p>
      <p class="search-wrapper__not-found-title-description">
        You look lost on your journey!
      </p>
    </div>
    <ButtonBase as="router-link" :to="{ name: 'welcome' }" variant="primary">
      Go back home
    </ButtonBase>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SearchBar from "@/shared/ui/molecules/SearchBar.vue";
import { useLocalSearch } from "../composables/UseLocalSearch.ts";
import { PokemonListItem } from "@/shared/models/pokemon/PokemonTypes.ts";
import ButtonBase from "@/shared/ui/atoms/ButtonBase.vue";

interface SearchWrapperProps {
  list: Array<PokemonListItem>;
  placeholder?: string;
  selector: (item: PokemonListItem) => string;
  debounceMs?: number;
  minChars?: number;
  limit?: number;
}

const props = defineProps<SearchWrapperProps>();
const listRef = computed(() => props.list);

const search = useLocalSearch<PokemonListItem>(listRef, {
  selector: props.selector,
  debounceMs: props.debounceMs ?? 200,
  minChars: props.minChars ?? 1,
  limit: props.limit,
});
</script>

<style scoped>
.search-wrapper__not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.search-wrapper__not-found-title {
  color: #353535;
  font-family: "Lato", sans-serif;
  font-size: 36px;
  font-weight: bold;
  line-height: normal;
  margin: 10px 0;
}
.search-wrapper__not-found-title-description {
  color: #5e5e5e;
  font-family: "Lato", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 150%;
  margin: 0 0 25px 0;
}
</style>
