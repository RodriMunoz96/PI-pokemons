const { getAllPokemons } = require("../controllers/getAllPokemons");
const { getPokemonByName } = require("../controllers/getPokemonByName");
const { getPokemonDetail } = require("../controllers/getPokemonDetail");
const { createPokemon } = require("../controllers/createPokemon");

const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;

  const idType = isNaN(id) ? "db" : "api";
  try {
    const pokemonDetail = await getPokemonDetail(id, idType);
    return res.status(200).json(pokemonDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name
      ? await getPokemonByName(name.toLowerCase())
      : await getAllPokemons();

    return res.status(200).json(result);
  } catch (error) {
    res
      .status(404)
      .json({ error: `No se encontraron coincidencias con ${name}` });
  }
};

const postPokemonHandler = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, typeNames } =
    req.body;
  try {
    const newPokemon = await createPokemon(
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      typeNames
    );
    return res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonByIdHandler,
  getPokemonsHandler,
  postPokemonHandler,
};
