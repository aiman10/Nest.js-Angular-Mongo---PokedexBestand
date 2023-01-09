export interface Sprites {
  normal: string;
  animated: string;
}

export interface Pokemon {
  id: string;
  species_id: string;
  height: string;
  weight: string;
  base_experience: string;
  name: string;
  sprites: Sprites;
  favourite?: boolean;
}
