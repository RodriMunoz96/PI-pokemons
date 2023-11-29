const mainRouter = require("express").Router();
const pokemonRouter = require("./pokemonRouter");
const typeRouter = require("./typeRouter");

mainRouter.use("/pokemon", pokemonRouter);
mainRouter.use("/type", typeRouter);

module.exports = mainRouter;
