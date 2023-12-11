import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { Pokemon, colorType } from "../types/pokemonTypes";
import {
  fetchPokemonList,
  setPage,
} from "../store/modules/pokemons/PokemonsSlice";
import PokemonDetailModal from "./PokemonDetailModal";
import CustomPagination from "./pagination";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemonList, status, error, page } = useAppSelector(
    (state) => state.pokemons
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Pokemon | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList(page));
  }, [dispatch, page]);

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsCardOpen(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setIsCardOpen(false);
    setOpenModal(false);
  };

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedCard(pokemon);
  };

  const handleDetailsClick = () => {
    if (selectedCard) {
      handleOpenModal(selectedCard);
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  const getColorForType = (type: string): string => {
    const color = colorType.find((colorEntry) => colorEntry.type === type);
    return color ? color.card : "#dae0e3";
  };

  return (
    <>
      <Grid>
        <CustomPagination count={65} page={page} onChange={handlePageChange} />
        <div className="pokemon-list-container">
          <Grid container spacing={2}>
            {status === "loading" && (
              <img
                src="https://media.tenor.com/Cm7KfjVqri4AAAAi/pokemon-pokeball.gif"
                alt="Loading..."
                style={{
                  width: "50rem",
                  height: "50rem",
                  margin: "auto",
                  display: "block",
                }}
              />
            )}

            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" &&
              pokemonList.map((pokemon: Pokemon) => (
                <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className={`pokemon-card ${isCardOpen ? "open-card" : ""}`}
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                      marginBottom: "20px",
                      boxShadow: "none",
                      border: "none",
                    }}
                  >
                    <CardMedia
                      component="img"
                      className="pokemon-card-media"
                      sx={{
                        objectFit: "cover",
                        borderRadius: "10px",
                        filter: "brightness(1.2)",
                      }}
                      image={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      onClick={() => handleCardClick(pokemon)}
                    />
                    {selectedCard && selectedCard.id === pokemon.id && (
                      <Grid container padding={"2vw"}>
                        <CardContent
                          className={`${isCardOpen} spin-animation`}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: getColorForType(
                              pokemon.types[0].type.name
                            ),
                            borderRadius: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            fontFamily={"VT323"}
                            fontSize={"5vh"}
                            component="div"
                            color="#070707"
                          >
                            {pokemon.name}
                          </Typography>
                          <Typography
                            fontSize={"4vh"}
                            fontFamily={"VT323"}
                            component="div"
                            color="#070707"
                          >
                            #{pokemon.id}
                          </Typography>
                          <Typography
                            fontSize={"3vh"}
                            fontFamily={"VT323"}
                            color="#070707"
                          >
                            Tamanho: {pokemon.height} cm
                            <br />
                            Peso: {pokemon.weight} kg
                          </Typography>
                          <button
                            style={{
                              maxHeight: "10vh",
                              maxWidth: "15vw",
                              marginTop: "1vw",
                              fontSize: "1.6vh",
                            }}
                            onClick={handleDetailsClick}
                            className="comic-button"
                          >
                            Detalhes
                          </button>
                        </CardContent>
                      </Grid>
                    )}
                  </Card>
                </Grid>
              ))}
          </Grid>

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="pokemon-modal"
          >
            <div className="pokemon-modal-container">
              <PokemonDetailModal
                onClose={handleCloseModal}
                pokemon={selectedPokemon}
              />
            </div>
          </Modal>
        </div>
      </Grid>
    </>
  );
};

export default PokemonList;
