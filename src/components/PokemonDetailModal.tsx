import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Button,
  List,
  ListItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  ModalContainer,
  ModalContent,
  PokeballBg,
  PokeballBgAfter,
  ModalBefore,
} from "./PokemonDetailStiled";
import { Pokemon, PokemonColor } from "../types/pokemonTypes";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchPokemonColors } from "../store/modules/pokemons/PokemonsSlice";

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  onClose?: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const colors = useAppSelector((state) => state.pokemons.pokemonColors);
  const [pokemonColors, setPokemonColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      if (pokemon) {
        const resultAction = await dispatch(fetchPokemonColors(pokemon.id));
        if (fetchPokemonColors.fulfilled.match(resultAction)) {
          setPokemonColors(
            resultAction.payload.map((c: PokemonColor) => c.name)
          );
        }
      }
    };

    fetchColors();
  }, [dispatch, pokemon]);
  console.log(colors, pokemonColors);
  return (
    <Modal
      open={Boolean(pokemon)}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer
        style={{ width: "80%", height: "90vh" }}
        isOpen={Boolean(pokemon)}
      >
        <CardMedia
          component="img"
          alt={pokemon?.name || ""}
          image={pokemon?.sprites.front_default || ""}
          style={{
            objectFit: "cover",
            width: "20svw",
            height: "40vh",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            marginTop: "0px",
            position: "absolute",
            top: "0%",
            left: "70%",
          }}
        />
        <ModalContent>
          <Card
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid #ddd",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent style={{ width: "80%", textAlign: "center" }}>
              <Typography
                variant="overline"
                style={{
                  fontSize: "50px",
                }}
                gutterBottom
              >
                {pokemon?.name}
              </Typography>

              <Typography
                variant="button"
                fontSize={18}
                color={pokemonColors}
                paragraph
              >
                Type: {pokemon?.types.map((v) => v.type.name).join(", ")}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card
                    style={{
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Habilidades:
                      </Typography>
                      <List>
                        {pokemon?.abilities.map((ability, index) => (
                          <ListItem key={index}>
                            <Typography variant="caption" fontSize={15}>
                              {ability.ability.name}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card
                    style={{
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        Status:
                      </Typography>
                      <List>
                        {pokemon?.stats.map((stat, index) => (
                          <ListItem key={index}>
                            <Typography variant="caption" fontSize={15}>
                              {`${stat.stat.name}: ${stat.base_stat}`}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Button
                onClick={onClose}
                variant="contained"
                color="primary"
                style={{
                  marginTop: "16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Voltar
              </Button>
            </CardContent>
          </Card>
        </ModalContent>
        <PokeballBg>
          <PokeballBgAfter />
        </PokeballBg>
        <ModalBefore />
      </ModalContainer>
    </Modal>
  );
};

export default PokemonDetailModal;
