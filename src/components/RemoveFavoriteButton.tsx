// src/features/pokedex/RemoveFromFavoritesButton.tsx
import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "../store";
import { removeFromPokedex } from "../store/modules/pokedex/pokedexSlice";

interface RemoveFromFavoritesButtonProps {
  pokemonId: number;
  onRemove: (pokemonId: number) => void;
}

const RemoveFromFavoritesButton: React.FC<RemoveFromFavoritesButtonProps> = ({
  pokemonId,
  onRemove,
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveFromPokedex = () => {
    dispatch(removeFromPokedex({ pokemonId }));
    onRemove(pokemonId);
  };

  return (
    <Button onClick={handleRemoveFromPokedex} variant="outlined" size="small">
      Remover dos Favoritos
    </Button>
  );
};

export default RemoveFromFavoritesButton;
