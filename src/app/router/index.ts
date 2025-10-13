import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("@/app/views/WelcomeView.vue"),
  },
  {
    path: "/pokedex",
    name: "pokedex",
    components: {
      default: () => import("@/features/pokedex/views/PokedexListView.vue"),
    },
    children: [
      {
        path: ":name",
        name: "pokemon-detail",
        components: {
          modal: () => import("@/features/details/views/PokemonDetailView.vue"),
        },
        props: {
          modal: true,
        },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
