<template>
  <div class="layout">
    <RouterView v-slot="{ Component }">
      <KeepAlive include="PokedexListView,FavoritesView,SearchView">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
  <Teleport to="body">
    <RouterView name="modal" />
  </Teleport>
  <AppTabBar />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppTabBar from "@/app/components/organisms/AppTabBar.vue";
</script>

<style scoped>
.layout {
  padding-top: 2.1rem;
  max-width: 570px;
  width: 100%;
}
</style>
