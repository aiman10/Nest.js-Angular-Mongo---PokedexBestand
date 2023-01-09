import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pokemon } from 'src/types';
import pokejson from 'src/pokedex.json';
import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://Admin:admin@webframeworkscluster.0dkna9w.mongodb.net/test';

@Injectable()
export class PokemonsService {
  private client = new MongoClient(url);

  constructor() {
    this.loadDataFromDb();
  }

  onModuleInit() {
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  private async loadDataFromDb() {
    let pokemon = await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .find<Pokemon>({})
      .toArray();
    if (pokemon.length === 0) {
      await this.client
        .db('WebFrameworks')
        .collection('Pokemon')
        .insertMany(pokejson);
    }
  }

  public async getAllPokemon() {
    let pokemon = await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .find<Pokemon>({})
      .toArray();
    return pokemon;
  }

  private async assertExists(id: string) {
    let pokemon = await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .findOne<Pokemon>({ id: id });
    if (!pokemon) {
      throw new HttpException('Pokemon does not exist', HttpStatus.NOT_FOUND);
    }
  }

  public async getPokemonById(id: string) {
    await this.assertExists(id);
    let pokemon = await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .findOne<Pokemon>({ id: id });
    return pokemon;
  }

  private async getMaxId() {
    let allPokemon = await this.getAllPokemon();
    return (Math.max(...allPokemon.map((p) => parseInt(p.id))) + 1).toString();
  }

  public async createPokemon(pokemon: Pokemon) {
    let maxId = await this.getMaxId();
    pokemon.id = maxId;
    await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .insertOne(pokemon);
    return await this.getPokemonById(pokemon.id);
  }

  public async updatePokemon(id: string, pokemon: Pokemon) {
    await this.assertExists(id);
    let oldPokemon = await this.getPokemonById(id);
    await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .updateOne(
        { _id: oldPokemon._id },
        {
          $set: {
            name: pokemon.name,
            height: pokemon.height,
            width: pokemon.weight,
          },
        },
      );
    return pokemon;
  }

  public async deletePokemon(id: string) {
    await this.assertExists(id);
    await this.client
      .db('myPokemonsDB')
      .collection('pokemons')
      .deleteOne({ id: id });
  }
}
