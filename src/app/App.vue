<template>
  <main class="app-container">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="css" scoped>
.app-container {
  padding: 0 1.5rem;
}
</style>
