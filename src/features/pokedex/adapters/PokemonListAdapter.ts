import type { PokemonListItem } from "@/shared/models/pokemon";

export interface PokemonListRow {
  id: number;
  name: string;
  isFavorite?: boolean;
}

function extractId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
}

export function toPokemonListRow(item: PokemonListItem): PokemonListRow {
  return {
    id: extractId(item.url),
    name: item.name,
  };
}

export function toPokemonList(
  rows: Array<PokemonListItem>,
): Array<PokemonListRow> {
  return rows.map((item) => toPokemonListRow(item));
}
