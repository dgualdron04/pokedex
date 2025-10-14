import axios from "axios";
import type {
  PokemonApiResponse,
  PokemonListResponse,
} from "@/shared/models/pokemon/PokemonTypes.ts";
import { LoadAbort } from "@/shared/utilities/LoadAbort";
import type { UseApiCall } from "@/shared/models/UseApiCall.ts";

const BASE_URL = "https://pokeapi.co/api/v2";

export const PokeApiService = {
  getPokemons(
    offset: number = 0,
    limit: number = 20,
  ): UseApiCall<PokemonListResponse> {
    const controller = LoadAbort();
    const call = axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      {
        signal: controller.signal,
      },
    );
    return {
      call,
      controller,
    };
  },

  getPokemonByName(name: string): UseApiCall<PokemonApiResponse> {
    const controller = LoadAbort();
    const call = axios.get<PokemonApiResponse>(`${BASE_URL}/pokemon/${name}`, {
      signal: controller.signal,
    });

    return {
      call,
      controller,
    };
  },
};
