// src/features/pokedex/RemoveFromFavoritesButton.tsx
import React from "react";
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
    <button className="ui-btn" onClick={handleRemoveFromPokedex}>
      Remover
    </button>
  );
};

export default RemoveFromFavoritesButton;
