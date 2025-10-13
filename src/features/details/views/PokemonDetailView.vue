<template>
  <div class="overlay" @click.self="close">
    <div class="modal">
      <header>
        <button @click="close">×</button>
      </header>
      <p>Hola mundo!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function close() {
  router.push({ name: "pokedex" });
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 9999;
}
.modal {
  background: #fff;
  border-radius: 16px;
  width: min(720px, 92vw);
  padding: 16px 20px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
}
</style>
