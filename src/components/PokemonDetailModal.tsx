import React from "react";
import {
  Modal,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ModalContainer,
  ModalContent,
  PokeballBg,
  PokeballBgAfter,
  ModalBefore,
} from "./PokemonDetailStyled";
import { Pokemon, PokemonType, colorType } from "../types/pokemonTypes";
import AddToFavoritesButton from "./AddButtonFavorite";

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  onClose?: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  onClose,
}) => {
  const getColorForType = (type: string): string => {
    const color = colorType.find((colorEntry) => colorEntry.type === type);
    return color ? color.card : "#dae0e3";
  };

  return (
    <Modal
      open={Boolean(pokemon)}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer
        isOpen={Boolean(pokemon)}
        color={getColorForType(pokemon?.types[0]?.type.name || "")}
        className="container-modal"
      >
        <ModalContent>
          <Card
            sx={{
              width: "90%",
              height: "100%",
              border: `5px solid ${getColorForType(
                pokemon?.types[0]?.type.name || ""
              )}`,

              borderRadius: "15px",
              boxShadow: "0 4px 8px rgb(7, 7, 7)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              alt={pokemon?.name || ""}
              image={pokemon?.sprites.front_default || ""}
              sx={{ maxWidth: "15vw", maxHeight: "80vh" }}
              style={{
                margin: "40px",
                position: "fixed",
                bottom: "50vh",
                left: "52vw",
              }}
            />
            <CardContent
              style={{
                width: "100%",
                height: "80vh",
                textAlign: "center",
                overflowX: "auto",
              }}
            >
              <Typography
                variant="overline"
                style={{
                  fontSize: "6vh",
                  fontFamily: "VT323",
                  marginBottom: "0px",
                }}
                gutterBottom
              >
                {pokemon?.name}
              </Typography>

              <Typography
                variant="button"
                fontSize={20}
                color={getColorForType(pokemon?.types[0]?.type.name || "")}
                paragraph
              >
                Type:{" "}
                {pokemon?.types.map((v: PokemonType) => v.type.name).join(", ")}
              </Typography>

              <Grid
                container
                spacing={2}
                sx={{ paddingRight: "5vw", paddingLeft: "5vw" }}
              >
                <Grid item xs={12} md={6}>
                  <Typography fontSize={16} fontWeight={900} paragraph>
                    Lista de habilidades do personagem:
                  </Typography>
                  <List>
                    {pokemon?.abilities.map((ability) => (
                      <ListItem key={ability.ability.name}>
                        <ListItemText primary={ability.ability.name} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography fontSize={16} fontWeight={900} paragraph>
                    Lista de stats:
                  </Typography>
                  <List>
                    {pokemon?.stats.map((stat) => (
                      <div key={stat.stat.name}>
                        <ListItem>
                          <ListItemText primary={stat.stat.name} />
                          <ListItemText
                            style={{ textAlign: "end" }}
                            primary={stat.base_stat}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </List>
                </Grid>
              </Grid>
              <AddToFavoritesButton pokemonId={pokemon!.id} />
              <Button
                onClick={() => onClose?.()}
                variant="contained"
                sx={{
                  marginTop: "1vw",
                  marginBottom: "1vw",
                  marginLeft: "1vw",
                  height: "5vh",
                  width: "30%",
                  fontFamily: "VT323",
                  fontSize: "3vh",
                  backgroundColor: "#000000",
                  color: getColorForType(pokemon?.types[0]?.type.name || ""),
                  borderRadius: "8px",

                  border: `solid 2px ${getColorForType(
                    pokemon?.types[0]?.type.name || ""
                  )}`,
                  boxShadow: `2px 2px 5px 2px ${getColorForType(
                    pokemon?.types[0]?.type.name || ""
                  )}`,
                  "&:hover": {
                    backgroundColor: "#050505",
                  },
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
