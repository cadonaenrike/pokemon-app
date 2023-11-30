import React from "react";
import PokemonList from "./components/pokemonList";
import { Grid } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        padding={10}
      >
        <h1>Pokemons</h1>
        <PokemonList />
      </Grid>
    </>
  );
};

export default App;
