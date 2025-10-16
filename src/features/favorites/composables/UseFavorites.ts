import { computed } from "vue";
import { UseFavoritesStore, type Favorite } from "../store/UseFavoritesStore";

export function UseFavorites() {
  const store = UseFavoritesStore();

  return {
    list: computed(() => store.list),
    isFavorite: (id: number) => store.isFavoriteById(id),
    toggle: (favorite: Favorite) => store.toggle(favorite),
    add: (favorite: Favorite) => store.add(favorite),
    remove: (id: number) => store.remove(id),
  };
}
