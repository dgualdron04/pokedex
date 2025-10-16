<template>
  <div class="details" @click.self="close">
    <div class="details-container">
      <div class="details-container__card">
        <header class="details-container__card-img">
          <img
            :src="pokemon?.img ?? ''"
            :alt="`Image of the Pokemon ${pokemon?.name ?? ''}`"
          />
          <XMarkSvg class="details-container__card-x" @click="close" />
        </header>
        <ul class="details-container__card-info">
          <li>
            <p><strong>Name:</strong> {{ toCamelCase(pokemon?.name ?? "") }}</p>
          </li>
          <li>
            <p><strong>Weight:</strong> {{ pokemon?.weight }}</p>
          </li>
          <li>
            <p><strong>Height:</strong> {{ pokemon?.height }}</p>
          </li>
          <li>
            <p><strong>Types:</strong> {{ typesString }}</p>
          </li>
        </ul>
        <footer class="details-container__card-btns">
          <ButtonBase
            as="button"
            variant="primary"
            class="welcome__btn"
            @click="handleShareDetails"
          >
            Share to my friends
          </ButtonBase>
          <StarSvg
            class="item__star"
            :favorite="isFavorite"
            @click="toggleFavorite"
          />
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useFunctions from "@/shared/composables/useFunctions";

import { UsePokedexDetail } from "../composables/UsePokedexDetail.ts";
import ButtonBase from "@/shared/ui/atoms/ButtonBase.vue";
import StarSvg from "@/shared/ui/atoms/StarSvg.vue";
import XMarkSvg from "@/app/assets/icones/x-mark.svg?component";
import { UseFavorites } from "@/features/favorites/composables/UseFavorites.ts";

defineOptions({ name: "PokemonDetailView" });

const route = useRoute();
const router = useRouter();
const { toCamelCase } = useFunctions();
const favorites = UseFavorites();

const pokemonName = String(route.params.name);

const { pokemon, loading, error, refetch } = UsePokedexDetail(pokemonName);

const isFavorite = computed(() =>
  pokemon.value ? favorites.isFavorite(pokemon.value.id) : false,
);

function toggleFavorite() {
  const p = pokemon.value;
  if (!p) return;
  favorites.toggle({ id: p.id, name: p.name, img: p.img });
}

watch(
  () => route.params.name,
  (n) => {
    if (n) void refetch(String(n));
  },
);

const typesString = computed(() =>
  (pokemon.value?.types ?? []).map((t) => toCamelCase(t)).join(", "),
);

const handleShareDetails = () => {
  const name = `Name: ${toCamelCase(pokemon.value?.name ?? "")}`;
  const weight = `Weight: ${pokemon.value?.weight ?? ""}`;
  const height = `Height: ${pokemon.value?.height ?? ""}`;
  const types = `Types: ${typesString.value ?? ""}`;

  const shareText = `${name}, ${weight}, ${height}, ${types}`;
  navigator.clipboard.writeText(shareText);
  alert("Detalles copiados al portapapeles.");
};

function close() {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  router.push({ name: "pokedex" });
}
</script>

<style scoped>
.details {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.details .details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 30px;
}
.details .details-container .details-container__card {
  background-color: var(--color-white);
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.details-container__card-img {
  position: relative;
  background-image: url("@/app/assets/images/background.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
.details-container__card-x {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
.details-container__card-img img {
  width: 100%;
  height: 100%;
  max-width: 180px;
  max-height: 180px;
  object-fit: contain;
  object-position: center;
}
.details-container__card-info {
  list-style: none;
  padding: 10px 30px 0 30px;
  margin: 0;
}
.details-container__card-info li {
  margin: 0;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid var(--color-gray-200);
}
.details-container__card-info li p {
  margin: 0;
  font-family: "Lato", "sans-serif";
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-body);
}
.details-container__card-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
}

@media (min-width: 570px) {
  .details .details-container {
    width: 570px;
    padding: 0;
  }
}
</style>
