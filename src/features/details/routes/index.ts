import type { Component } from "vue";
import type { RouteRecordRaw, RawRouteComponent } from "vue-router";

type LazyComp = () => Promise<{ default: Component }>;

export function buildDetailModalChild(
  name: string,
  defaultComponent?: RawRouteComponent | LazyComp,
): RouteRecordRaw {
  return {
    path: ":name",
    name,
    components: {
      default: defaultComponent,
      modal: () => import("../views/PokemonDetailView.vue"),
    },
    props: { modal: true },
  };
}
