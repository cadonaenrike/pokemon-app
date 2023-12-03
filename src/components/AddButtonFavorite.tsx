import React from "react";
import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch } from "../store";
import { addToPokedex } from "../store/modules/pokedex/pokedexSlice";

interface AddToFavoritesButtonProps {
  pokemonId: number;
}

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
  pokemonId,
}) => {
  const dispatch = useAppDispatch();

  const handleAddToPokedex = () => {
    dispatch(addToPokedex({ pokemonId }));
  };

  return (
    <IconButton
      onClick={handleAddToPokedex}
      size="small"
      color="error"
      sx={{
        "&:hover": {
          border: "none !important",
          borderRadius: "0px",
        },
        "&:active": {
          backgroundColor: "transparent !important",
        },
        "&:focus": {
          outline: "none",
        },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        m={"0.5vw"}
        border={"solid"}
        padding={"0.3vw"}
      >
        <span
          style={{
            fontFamily: "VT323",
            fontSize: "2vh",
          }}
        >
          Adicionar Aos favoritos
        </span>
        <FavoriteIcon />
      </Box>
    </IconButton>
  );
};

export default AddToFavoritesButton;
