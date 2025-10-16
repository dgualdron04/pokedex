<template>
  <article
    class="item"
    @click="goToDetail"
    :aria-label="`See details of ${name}`"
  >
    <h3 class="item__title">{{ name }}</h3>
    <StarSvg
      class="item__star"
      :favorite="isFavorite"
      @click.stop="emit('toggle-fav')"
    />
  </article>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

import StarSvg from "@/shared/ui/atoms/StarSvg.vue";

const props = defineProps<{
  id: number;
  name: string;
  isFavorite?: boolean;
}>();

function goToDetail() {
  router.push({ name: "pokemon-detail", params: { name: props.name } });
}

const emit = defineEmits<{ (e: "toggle-fav"): void }>();
</script>

<style scoped>
.item {
  align-items: center;
  background-color: var(--color-white);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px 8px 20px;
  margin: 0 0 10px 0;
  cursor: pointer;
}

.item h3 {
  color: var(--color-text-heading);
  font-family: "Lato", sans-serif;
  font-size: 22px;
  font-weight: 500;
  margin: 0;
}
</style>
