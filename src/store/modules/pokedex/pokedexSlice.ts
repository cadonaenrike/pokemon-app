// src/features/pokedex/pokedexSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface PokedexState {
  favoritePokemon: number[];
}

const initialState: PokedexState = {
  favoritePokemon: [],
};

const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    addToPokedex: (state, action) => {
      const { pokemonId } = action.payload;
      state.favoritePokemon.push(pokemonId);
    },
  },
});

export const { addToPokedex } = pokedexSlice.actions;
export default pokedexSlice.reducer;
