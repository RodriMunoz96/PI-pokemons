const { Pokemon, Type } = require("../db");

const createPokemon = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  typeNames
) => {
  const findOrCreatePokemon = await Pokemon.findOrCreate({
    where: { name: name.toLowerCase() },
    defaults: {
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    },
  });

  if (typeNames && typeNames.length > 0) {
    const types = await Type.findAll({ where: { name: typeNames } });

    await findOrCreatePokemon[0].addType(types);
  }

  return findOrCreatePokemon[0];
};

module.exports = { createPokemon };
