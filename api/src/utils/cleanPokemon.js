const axios = require("axios");

const cleanApiPokemons = async (arrayOfPokemons) => {
  return Promise.all(
    arrayOfPokemons.map(async (poke) => {
      const pokedata = (await axios.get(poke.url)).data;

      return {
        id: pokedata.id,
        name: pokedata.name,
        image: pokedata.sprites.other.home.front_default,
        hp: pokedata.stats.find((st) => st.stat.name === "hp").base_stat,
        attack: pokedata.stats.find((st) => st.stat.name === "attack")
          .base_stat,
        defense: pokedata.stats.find((st) => st.stat.name === "defense")
          .base_stat,
        speed: pokedata.stats.find((st) => st.stat.name === "speed").base_stat,
        height: pokedata.height,
        weight: pokedata.weight,
        types: pokedata.types
          .map((tp) => {
            return tp.type.name;
          })
          .join(", "),
        created: false,
      };
    })
  );
};

const cleanApiPokemonDetail = (pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.home.front_default,
    hp: pokemon.stats.find((st) => st.stat.name === "hp").base_stat,
    attack: pokemon.stats.find((st) => st.stat.name === "attack").base_stat,
    defense: pokemon.stats.find((st) => st.stat.name === "defense").base_stat,
    speed: pokemon.stats.find((st) => st.stat.name === "speed").base_stat,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types
      .map((tp) => {
        return tp.type.name;
      })
      .join(", "),
    created: false,
  };
};

module.exports = { cleanApiPokemons, cleanApiPokemonDetail };
