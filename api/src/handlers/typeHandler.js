const { getPokemonTypes } = require("../controllers/getTypes");

const getTypesHandler = async (req, res) => {
  try {
    const getTypes = await getPokemonTypes();
    res.status(200).json(getTypes);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getTypesHandler };
