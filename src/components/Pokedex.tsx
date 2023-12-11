import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store";
import { removeFromPokedex } from "../store/modules/pokedex/pokedexSlice";
import PokemonDetailModal from "./PokemonDetailModal";
import { Pokemon } from "../types/pokemonTypes";
import imageFundo from "../assets/pai-card.png";
import RemoveFromFavoritesButton from "./RemoveFavoriteButton";

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
    <Grid
      mt={3}
      mb={3}
      marginRight={2}
      container
      spacing={1}
      alignContent={"flex-start"}
      style={{
        padding: "3vh",
        width: "45%",
        backgroundColor: "#666274",
      }}
    >
      <img
        style={{
          marginLeft: "0.4vw",
          width: "100%",
          maxHeight: "6vh",
        }}
        src={imageFundo}
        alt=""
      />
      {pokemonDetails.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#bfbfc2",
              border: "4px solid #917474",
              padding: "2vh",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                backgroundColor: "#000000",
                border: "solid 5px black",
                maxHeight: "20vh",
                maxWidth: "20vw",
              }}
              image={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <CardContent>
              <Typography
                variant="h5"
                fontFamily={"VT323"}
                textAlign={"center"}
                fontSize={"3vw"}
                component="div"
              >
                {pokemon.name}
              </Typography>

              {/* Botão Adicionar/Remover dos Favoritos e Detalhes no card lateral */}
              <Grid
                width={"20vw"}
                container
                justifyContent="space-evenly"
                alignItems={"center"}
                alignSelf={"center"}
              >
                <button
                  onClick={() => handleOpenModal(pokemon as Pokemon)}
                  className="comic-button"
                  style={{
                    marginBottom: "0.2vh",
                  }}
                >
                  Detalhes
                </button>

                <Grid item>
                  <RemoveFromFavoritesButton
                    pokemonId={pokemon.id}
                    onRemove={handleRemoveFromPokedex}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}

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
    </Grid>
  );
};

export default Pokedex;
