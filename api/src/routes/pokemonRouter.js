const pokemonRouter = require("express").Router();
const {
  getPokemonByIdHandler,
  getPokemonsHandler,
  postPokemonHandler,
} = require("../handlers/pokemonHandlers");

pokemonRouter.get("/", getPokemonsHandler);

pokemonRouter.get("/:id", getPokemonByIdHandler);

pokemonRouter.post("/", postPokemonHandler);

module.exports = pokemonRouter;
