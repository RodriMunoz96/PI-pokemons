import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const detail = useSelector((state) => state.detail);

  if (!detail) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={style.container}>
      <div>
        <Link to="/home">
          <button className={style.returnButton}>Return</button>
        </Link>
      </div>
      <div>
        <h1 className={style.name}>{detail.name} </h1>
        <img
          src={detail.image}
          alt="Not found"
          width={"300px"}
          className={style.image}
        />
        <div className={style.propertiesContainer}>
          <h3>ID: {detail.id} </h3>
          <h3>Life: {detail.hp} </h3>
          <h3>Attack: {detail.attack}</h3>
          <h3>Defense: {detail.defense}</h3>
          <h3>Speed: {detail.speed} </h3>
          <h3>Height: {detail.height} </h3>
          <h3>Weight: {detail.weight} </h3>
          <h3>Types: {detail.types} </h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
