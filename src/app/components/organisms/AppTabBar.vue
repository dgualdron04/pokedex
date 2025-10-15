<template>
  <nav class="tabbar" role="navigation">
    <ButtonBase
      as="router-link"
      :to="{ name: 'pokedex' }"
      :variant="isAllActive ? 'primary' : 'secondary'"
      :aria-current="isAllActive ? 'page' : undefined"
    >
      <template #icon-left>
        <TabsSvg />
      </template>
      All
    </ButtonBase>
    <ButtonBase
      as="router-link"
      :to="{ name: 'favorites' }"
      :variant="isFavsActive ? 'primary' : 'secondary'"
      :aria-current="isFavsActive ? 'page' : undefined"
    >
      <template #icon-left>
        <StarSvg />
      </template>
      Favorites
    </ButtonBase>
  </nav>
</template>

<script setup lang="ts">
import TabsSvg from "@/app/assets/icones/Tabs.svg?component";
import StarSvg from "@/app/assets/icones/Star.svg?component";
import ButtonBase from "@/shared/ui/atoms/ButtonBase.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isAllActive = computed(
  () =>
    route.name === "pokedex" || String(route.name).startsWith("pokemon-detail"),
);
const isFavsActive = computed(() => String(route.name).startsWith("favorites"));
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  background: var(--color-white);
  border-top: 1px solid var(--color-gray-300);
  display: grid;
  grid-auto-flow: column;
  gap: 12px;
  z-index: 1;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
}
</style>
