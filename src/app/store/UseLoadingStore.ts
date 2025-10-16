import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const UseLoadingStore = defineStore("loading", () => {
  const pending = ref(0);

  function start() {
    pending.value++;
  }
  function stop() {
    pending.value = Math.max(0, pending.value - 1);
  }

  const isBusy = computed(() => pending.value > 0);

  function startIn() {
    start();
  }
  function stopIn() {
    stop();
  }

  return { pending, isBusy, start, stop, startIn, stopIn };
});
