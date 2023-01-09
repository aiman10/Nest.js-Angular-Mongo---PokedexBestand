import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Options,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PokemonsService } from 'src/pokemons/pokemons.service';
import { Pokemon } from 'src/types';

@Controller('pokemon')
export class PokemonController {
  constructor(private _pokedex: PokemonsService) {}

  @Options()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  public options() {
    return {};
  }

  @Get()
  public getAllPokemon() {
    return this._pokedex.getAllPokemon();
  }

  @Get(':id')
  public getPokemonById(@Param('id') id: string) {
    return this._pokedex.getPokemonById(id);
  }

  @Post()
  public createPokemon(@Body() pokemon: Pokemon) {
    return this._pokedex.createPokemon(pokemon);
  }

  @Put(':id')
  public updatePokemon(@Body() pokemon: Pokemon, @Param('id') id: string) {
    return this._pokedex.updatePokemon(id, pokemon);
  }

  @Delete(':id')
  public deletePokemon(@Param('id') id: string) {
    return this._pokedex.deletePokemon(id);
  }
}
