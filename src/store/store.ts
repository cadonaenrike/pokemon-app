// src/app/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import PokemonsSlice from "./modules/pokemons/PokemonsSlice";
import pokedexSlice from "./modules/pokedex/pokedexSlice";

const rootReducer = combineReducers({
  pokemons: PokemonsSlice,
  pokedex: pokedexSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
