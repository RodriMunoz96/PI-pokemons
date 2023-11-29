const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { cleanApiPokemons } = require("../utils/cleanPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  let allApiPokemons = [];
  let nextURL = URL;
  let page = 1;

  while (nextURL && page <= 2) {
    const apiPokemons = (await axios.get(nextURL)).data;

    const cleanPokemons = await cleanApiPokemons(apiPokemons.results);

    allApiPokemons = [...allApiPokemons, ...cleanPokemons];
    nextURL = apiPokemons.next;
    page++;
  }

  const databasePokemons = await Pokemon.findAll({
    include: [{ model: Type, through: "pokemon_type" }],
  });

  const cleanDatabasePokemons = databasePokemons.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      speed: pokemon.speed,
      height: pokemon.height,
      weight: pokemon.weight,
      created: true,
      types: pokemon.types.map((type) => type.name).join(", "),
    };
  });

  return [...cleanDatabasePokemons, ...allApiPokemons];
};

module.exports = { getAllPokemons };
