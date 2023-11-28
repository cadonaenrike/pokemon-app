import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Button,
  Pagination,
  Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store";
import { Pokemon } from "./types/pokemonTypes";
import {
  fetchPokemonList,
  setPage,
} from "./store/modules/pokemons/PokemonsSlice";
import PokemonDetailModal from "./components/PokemonDetailModal";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemonList, status, error, page } = useAppSelector(
    (state) => state.pokemons
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList(page));
  }, [dispatch, page]);

  const handleOpenModal = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    setOpenModal(false);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };
  console.log(pokemonList);
  return (
    <div>
      <Grid container spacing={2}>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          pokemonList.map((pokemon: Pokemon) => (
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
                  <Typography variant="body2" color="text.secondary">
                    Tamanho: {pokemon.height} centimetros
                  </Typography>
                  <Button
                    onClick={() => handleOpenModal(pokemon)}
                    variant="outlined"
                    size="small"
                  >
                    Detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Box mt={2}>
        <Pagination count={65} page={page} onChange={handlePageChange} />s
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PokemonDetailModal
          onClose={handleCloseModal}
          pokemon={selectedPokemon}
        />
      </Modal>
    </div>
  );
};

export default App;
