const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { cleanApiPokemons } = require("../utils/cleanPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getPokemonByName = async (name) => {
  let nextURL = URL;
  let foundPokemons = [];

  while (nextURL) {
    const apiPokemons = (await axios.get(nextURL)).data;

    const filterPokemons = (await apiPokemons.results).filter((poke) =>
      poke.name.toLowerCase().includes(name.toLowerCase())
    );

    foundPokemons = [...foundPokemons, ...filterPokemons];
    nextURL = apiPokemons.next;
  }

  const filterPokeInfo = await cleanApiPokemons(foundPokemons);
  const onlyPokemons = filterPokeInfo.filter((poke) => poke.id < 10000);

  const findInDb = await Pokemon.findAll({
    where: { name: name },
    include: [
      {
        model: Type,
        through: { attributes: [] },
        as: "types",
      },
    ],
  });

  const cleanDbInfo = findInDb.map((pokemon) => ({
    ...pokemon.toJSON(),
    types: pokemon.types.map((type) => type.name).join(", "),
  }));

  if (findInDb.length === 0 && onlyPokemons.length === 0) {
    throw Error();
  }

  return [...cleanDbInfo, ...onlyPokemons];
};

module.exports = {
  getPokemonByName,
};
