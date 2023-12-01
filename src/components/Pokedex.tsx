// src/features/pokedex/Pokedex.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  IconButton,
  Modal,
} from "@mui/material";
import { MdChevronRight } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store";
import { removeFromPokedex } from "../store/modules/pokedex/pokedexSlice";
import RemoveFromFavoritesButton from "./RemoveFavoriteButton";

import PokemonDetailModal from "./PokemonDetailModal";
import { Pokemon } from "../types/pokemonTypes";

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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

    setPokemonDetails([]);

    favoritePokemon.forEach((pokemonId) => {
      fetchPokemonDetails(pokemonId);
    });
  }, [favoritePokemon]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setOpenModal(false);
  };

  const handleRemoveFromPokedex = (pokemonId: number) => {
    dispatch(removeFromPokedex({ pokemonId }));
    setPokemonDetails((prevDetails) =>
      prevDetails.filter((pokemon) => pokemon.id !== pokemonId)
    );
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Botão para abrir o card lateral */}
        <Grid item xs={12}>
          <IconButton onClick={handleDrawerOpen} sx={{ fontSize: 40 }}>
            <MdChevronRight />
          </IconButton>
        </Grid>
      </Grid>

      {/* Card lateral com a lista de pokémons favoritos */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ style: { width: "300px" } }}
      >
        <Grid container spacing={2} style={{ padding: "16px" }}>
          {pokemonDetails.map((pokemon) => (
            <Grid item key={pokemon.id} xs={12}>
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
                  {/* Botão Adicionar/Remover dos Favoritos e Detalhes no card lateral */}
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <RemoveFromFavoritesButton
                        pokemonId={pokemon.id}
                        onRemove={handleRemoveFromPokedex}
                      />
                    </Grid>
                    <Grid item>
                      <button
                        onClick={() => handleOpenModal(pokemon as Pokemon)}
                        className="comic-button"
                      >
                        Detalhes
                      </button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Drawer>

      {/* Modal para exibir os detalhes do Pokémon */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="pokemon-modal-container">
          <PokemonDetailModal
            onClose={handleCloseModal}
            pokemon={selectedPokemon}
          />
        </div>
      </Modal>
    </>
  );
};

export default Pokedex;
