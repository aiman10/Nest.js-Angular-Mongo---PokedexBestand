import { Injectable } from '@angular/core';
import { Pokemon } from './types';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private _pokemon: Pokemon[] = [];

  async toggleFavorite(pokemon: Pokemon) {
    pokemon.favourite = !pokemon.favourite;
    await this.updatePokemon(pokemon);
  }

  async updatePokemon(pokemon: Pokemon) {
    await lastValueFrom(
      this._http.put<Pokemon>(
        'http://localhost:3000/pokemon/' + pokemon.id,
        pokemon
      )
    );
  }

  getPokemonById(id: number) {
    return this.pokemon.find((p) => parseInt(p.id) == id);
  }

  get pokemon() {
    return this._pokemon;
  }

  async loadPokemon() {
    let pokemon = await lastValueFrom(
      this._http.get<Pokemon[]>('http://localhost:3000/pokemon')
    );
    this._pokemon = pokemon;
  }

  async deletePokemon(pokemon: Pokemon) {
    await lastValueFrom(
      this._http.delete('http://localhost:3000/pokemon/' + pokemon.id)
    );
    await this.loadPokemon();
  }

  constructor(private _http: HttpClient) {
    this.loadPokemon();
  }
}
