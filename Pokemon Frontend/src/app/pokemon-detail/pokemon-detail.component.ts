import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from '../pokedex.service';

import { Pokemon } from '../types';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(private route: ActivatedRoute, private pokedex: PokedexService) {}

  async ngOnInit() {
    await this.pokedex.loadPokemon();
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') != null) {
        this.pokemon = this.pokedex.getPokemonById(Number(params.get('id')));
      }
    });
  }

  update() {
    if (this.pokemon) {
      this.pokedex.updatePokemon(this.pokemon);
    }
  }
}
