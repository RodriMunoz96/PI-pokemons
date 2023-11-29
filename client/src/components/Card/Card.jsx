import React from "react";
import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

const Card = (props) => {
  const { id, name, image, types, attack } = props;

  return (
    <div className={style.card}>
      <NavLink to={`/detail/${id}`}>
        <img src={image} alt="No se encontró" className={style.cardImage} />
        <div className={style.cardText}>
          <h3>Nombre: {name}</h3>
          <h3>Ataque: {attack}</h3>
          <h3>Tipos: {types}</h3>
        </div>
      </NavLink>
    </div>
  );
};

export default Card;
