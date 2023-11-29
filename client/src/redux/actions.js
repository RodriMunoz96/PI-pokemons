import axios from "axios";

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

export function getPokemons() {
  return async function (dispatch) {
    try {
      const response = (await axios(`http://localhost:3001/pokemon`)).data;
      return dispatch({
        type: GET_POKEMONS,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      const response = (
        await axios(`http://localhost:3001/pokemon/?name=${name}`)
      ).data;
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const response = (await axios(`http://localhost:3001/type`)).data;
      return dispatch({
        type: GET_TYPES,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function createPokemon(data) {
  return async function () {
    try {
      const response = await axios.post(`http://localhost:3001/pokemon`, data);
      return response;
    } catch (error) {
      alert("Hubo un error al crear el pokemon");
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = (await axios(`http://localhost:3001/pokemon/${id}`))
        .data;
      return dispatch({
        type: GET_DETAIL,
        payload: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const orderByName = (order) => {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
};

export const orderByAttack = (order) => {
  return {
    type: ORDER_BY_ATTACK,
    payload: order,
  };
};

export const filterBySource = (filter) => {
  return {
    type: FILTER_BY_SOURCE,
    payload: filter,
  };
};

export const filterByType = (filter) => {
  return {
    type: FILTER_BY_TYPE,
    payload: filter,
  };
};
