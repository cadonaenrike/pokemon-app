/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pokemon, PokemonColor } from "../../../types/pokemonTypes";

interface PokemonState {
  pokemonList: Pokemon[];
  pokemonColors: PokemonColor[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
}

const initialState: PokemonState = {
  pokemonList: [],
  pokemonColors: [],
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

export const fetchPokemonColors = createAsyncThunk(
  "pokemons/fetchPokemonColors",
  async (id: number) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-color/${id}/`
    );
    const promises = response.data.results.map((p: any) => {
      return axios.get(p.url);
    });

    const result = await Promise.all(promises);
    const data = result.reduce((acc, val) => {
      acc.push(val.data);
      return acc;
    }, []);
    console.log(data);
    return data;
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Erro ao buscar a lista de Pokémon";
      })
      .addCase(fetchPokemonColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokemonColors = action.payload;
      })
      .addCase(fetchPokemonColors.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Erro ao buscar as cores de Pokémon";
      });
  },
});

export const { setPage } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
