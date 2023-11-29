const typeRouter = require("express").Router();
const { getTypesHandler } = require("../handlers/typeHandler");

typeRouter.get("/", getTypesHandler);

module.exports = typeRouter;
