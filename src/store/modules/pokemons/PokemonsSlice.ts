/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Pokemon } from "../../../types/pokemonTypes";

interface PokemonState {
  pokemonList: Pokemon[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
}

const initialState: PokemonState = {
  pokemonList: [],
  status: "idle",
  error: null,
  page: 1,
};

export const fetchPokemonList = createAsyncThunk(
  "pokemons/fetchPokemonList",
  async (page: number) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 12}&limit=20`
    );

    const promises = response.data.results.map((p: any) => {
      return axios.get(p.url);
    });

    const result = await Promise.all(promises);

    console.log(result);

    const data = result.reduce((acc, val) => {
      acc.push(val.data as Pokemon);
      return acc;
    }, []);
    return data;
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      return { ...state, page: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        return { ...state, status: "loading" };
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        return {
          ...state,
          status: "succeeded",
          pokemonList: action.payload,
        };
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message ?? "Erro ao buscar a lista de Pokémon",
        };
      });
  },
});

export const { setPage } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
