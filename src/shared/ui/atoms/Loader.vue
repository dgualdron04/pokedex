<template>
  <div class="loader-container">
    <LoaderSvg alt="Loading" class="loader" />
  </div>
</template>

<script setup lang="ts">
import LoaderSvg from "@/app/assets/icons/Loader.svg?component";
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  inset: 0;
}

.loader {
  width: 106px;
  height: 106px;
  animation: rotatePulse 1.5s infinite ease-in-out;
}

@keyframes rotatePulse {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.8;
  }
}
</style>
