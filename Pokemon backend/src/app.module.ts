import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons/pokemons.service';
import { PokemonController } from './pokemon/pokemon.controller';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [PokemonsService],
})
export class AppModule {}
