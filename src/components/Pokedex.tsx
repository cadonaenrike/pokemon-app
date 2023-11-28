import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addToPokedex } from "../store/modules/pokedex/pokedexSlice";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

interface PokemonDetails {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
}

const Pokedex: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favoritePokemon } = useAppSelector((state) => state.pokedex);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const fetchPokemonDetails = async (pokemonId: number) => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPokemonDetails((prevDetails) => [...prevDetails, data]);
      } catch (error) {
        console.error(
          `Erro ao buscar detalhes do Pokémon ${pokemonId}:`,
          error
        );
      }
    };

    favoritePokemon.forEach((pokemonId) => {
      fetchPokemonDetails(pokemonId);
    });
  }, [favoritePokemon]);

  const handleAddToPokedex = (pokemonId: number) => {
    dispatch(addToPokedex({ pokemonId }));
  };

  return (
    <Grid container spacing={2}>
      {pokemonDetails.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {pokemon.name}
              </Typography>
              <Button
                onClick={() => handleAddToPokedex(pokemon.id)}
                variant="outlined"
                size="small"
              >
                Add to Pokedex
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Pokedex;
