<template>
  <main class="app-container">
    <RouterView />

    <Loader v-if="isBusy" />
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import Loader from "@/shared/ui/atoms/Loader.vue";
import { UseLoadingStore } from "../app/store/UseLoadingStore";

const { isBusy } = storeToRefs(UseLoadingStore());
</script>

<style lang="css" scoped>
.app-container {
  padding: 0 1.5rem 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
