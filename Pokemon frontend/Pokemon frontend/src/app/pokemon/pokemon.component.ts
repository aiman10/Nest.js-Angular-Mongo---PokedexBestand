import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../types';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  constructor(private pokedex: PokedexService) {}

  ngOnInit(): void {}

  get pokemon(): Pokemon[] {
    return this.pokedex.pokemon;
  }

  toggleFavorite(pokemon: Pokemon) {
    this.pokedex.toggleFavorite(pokemon);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokedex.deletePokemon(pokemon);
  }
}
