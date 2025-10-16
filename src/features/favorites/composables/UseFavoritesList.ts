import { computed } from "vue";
import { UseFavoritesStore } from "../store/UseFavoritesStore.ts";

export function UseFavoritesList() {
  const store = UseFavoritesStore();
  const items = computed(() =>
    store.list.map((favorite) => ({
      id: favorite.id,
      name: favorite.name,
      isFavorite: true,
    })),
  );
  return { items };
}
