// src/features/pokemons/types.ts
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}
export const colorType = [
  { type: "fire", card: "#ffb5a9", chip: "#fd7d24" },
  { type: "grass", card: "#a0e2a6", chip: "#9ccc51" },
  { type: "water", card: "#95bbe4", chip: "#329de5" },
  { type: "normal", card: "#dae0e3", chip: "#a4acaf" },
  { type: "fighting", card: "#dae0e3", chip: "#a4acaf" },
  { type: "flying", card: "#dae0e3", chip: "#a4acaf" },
  { type: "poison", card: "#deb3e9", chip: "#b97fc9" },
  { type: "ground", card: "#dae0e3", chip: "#a4acaf" },
  { type: "rock", card: "#dae0e3", chip: "#a4acaf" },
  { type: "bug", card: "#c7e99f", chip: "#739f40" },
  { type: "ghost", card: "#dae0e3", chip: "#a4acaf" },
  { type: "steel", card: "#dae0e3", chip: "#a4acaf" },
  { type: "electric", card: "#eadc82", chip: "#eed536" },
  { type: "psychic", card: "#ecc0da", chip: "#f365b9" },
  { type: "ice", card: "#dae0e3", chip: "#a4acaf" },
  { type: "dragon", card: "#e6a195", chip: "#f26e57" },
  { type: "dark", card: "#dae0e3", chip: "#a4acaf" },
  { type: "unknown", card: "#dae0e3", chip: "#a4acaf" },
  { type: "shadow", card: "#dae0e3", chip: "#a4acaf" },
  { type: "fairy", card: "#eacee1", chip: "#fdb9e8" },
];

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}
