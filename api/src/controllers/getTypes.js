const { Type } = require("../db");
const axios = require("axios");

const getPokemonTypes = async () => {
  const dbTypes = await Type.findAll();

  if (dbTypes.length === 0) {
    const allTypes = (await axios("https://pokeapi.co/api/v2/type")).data
      .results;

    const cleanTypes = allTypes.map((type) => {
      return {
        name: type.name,
      };
    });

    await Type.bulkCreate(cleanTypes);
    const actualizedDb = await Type.findAll();

    return actualizedDb;
  }

  return dbTypes;
};

module.exports = { getPokemonTypes };
