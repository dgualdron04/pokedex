export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: Array<PokemonType>;
  sprites: {
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: Array<string>;
  img: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokemonListItem>;
}
