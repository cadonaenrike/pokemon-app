import React from "react";
import PokemonList from "./components/pokemonList";
import { Grid } from "@mui/material";
import Pokedex from "./components/Pokedex";

const App: React.FC = () => {
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          paddingBottom: "2vh",
          backgroundColor: "#f5cbc3",
        }}
      >
        <Pokedex />
        <PokemonList />
      </Grid>
    </>
  );
};

export default App;
