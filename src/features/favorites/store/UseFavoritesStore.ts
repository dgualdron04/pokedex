import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export type Favorite = Readonly<{ id: number; name: string; img?: string }>;

export const UseFavoritesStore = defineStore("favorites", () => {
  const list = ref<Array<Favorite>>(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  const ids = computed(() => new Set(list.value.map((f) => f.id)));
  const names = computed(() => new Set(list.value.map((f) => f.name)));

  function add(favorite: Favorite) {
    if (!ids.value.has(favorite.id)) list.value.push(favorite);
  }
  function remove(id: number) {
    const i = list.value.findIndex((x: Favorite) => x.id === id);
    if (i >= 0) list.value.splice(i, 1);
  }
  function toggle(favorite: Favorite) {
    ids.value.has(favorite.id) ? remove(favorite.id) : add(favorite);
  }

  const isFavoriteById = (id: number) => ids.value.has(id);
  const isFavoriteByName = (name: string) => names.value.has(name);

  watch(
    list,
    (favorite) => localStorage.setItem("favorites", JSON.stringify(favorite)),
    { deep: true },
  );

  return { list, add, remove, toggle, isFavoriteById, isFavoriteByName };
});
