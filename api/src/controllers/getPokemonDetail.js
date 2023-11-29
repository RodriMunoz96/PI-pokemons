const { Pokemon, Type } = require("../db");
const { cleanApiPokemonDetail } = require("../utils/cleanPokemon");
const axios = require("axios");

const getPokemonDetail = async (id, idType) => {
  if (idType === "api") {
    const apiPokemon = (
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    ).data;
    return cleanApiPokemonDetail(apiPokemon);
  } else {
    const pokemonFromDB = await Pokemon.findByPk(id, {
      include: Type,
    });

    const pokemonDetail = {
      id: pokemonFromDB.id,
      name: pokemonFromDB.name,
      image: pokemonFromDB.image,
      hp: pokemonFromDB.hp,
      attack: pokemonFromDB.attack,
      defense: pokemonFromDB.defense,
      speed: pokemonFromDB.speed,
      height: pokemonFromDB.height,
      weight: pokemonFromDB.weight,
      created: true,
      types: pokemonFromDB.types.map((type) => type.name).join(", "),
    };

    return pokemonDetail;
  }
};

module.exports = { getPokemonDetail };
