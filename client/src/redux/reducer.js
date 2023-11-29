import {
  GET_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  GET_DETAIL,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  FILTER_BY_TYPE,
  FILTER_BY_SOURCE,
} from "./actionTypes";

const initialState = {
  allPokemons: [],
  filteredPokemons: [],
  allTypes: [],
  pokemonDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        filteredPokemons: action.payload,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemons: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ORDER_BY_NAME:
      const nameSort =
        action.payload === "asc"
          ? state.filteredPokemons.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.filteredPokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        filteredPokemons: [...nameSort],
      };

    case ORDER_BY_ATTACK:
      const attackSort =
        action.payload === "min"
          ? state.filteredPokemons.sort((a, b) => a.attack - b.attack)
          : state.filteredPokemons.sort((a, b) => b.attack - a.attack);

      return {
        ...state,
        filteredPokemons: [...attackSort],
      };

    case FILTER_BY_TYPE:
      const typeFilter =
        action.payload !== ""
          ? state.filteredPokemons.filter((pokemon) =>
              pokemon.types.includes(action.payload)
            )
          : state.filteredPokemons;

      return {
        ...state,
        filteredPokemons: [...typeFilter],
      };

    case FILTER_BY_SOURCE:
      const createdPokemons =
        action.payload === "db"
          ? state.filteredPokemons.filter((pokemon) => pokemon.created === true)
          : state.filteredPokemons.filter(
              (pokemon) => !pokemon.created || pokemon.created === false
            );

      return {
        ...state,
        filteredPokemons: [...createdPokemons],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
