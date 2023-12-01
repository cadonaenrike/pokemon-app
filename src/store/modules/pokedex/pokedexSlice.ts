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
    removeFromPokedex: (state, action) => {
      const { pokemonId } = action.payload;
      state.favoritePokemon = state.favoritePokemon.filter(
        (id) => id !== pokemonId
      );
    },
  },
});

export const { addToPokedex, removeFromPokedex } = pokedexSlice.actions;
export default pokedexSlice.reducer;
