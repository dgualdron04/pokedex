<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive include="PokedexListView,FavoritesView,SearchView">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
  <Teleport to="body">
    <RouterView name="modal" />
  </Teleport>
  <AppTabBar />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppTabBar from "@/app/components/organisms/AppTabBar.vue";
</script>
