import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTypes, createPokemon } from "../../redux/actions";
import validate from "./validate";
import style from "./CreateForm.module.css";

const CreateForm = () => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  const [form, setForm] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const validateForm = () => {
    const errors = validate(form);

    const hasErrors = Object.values(errors).some((error) =>
      Array.isArray(error) ? error.length > 0 : !!error
    );

    return hasErrors;
  };

  const changeInputHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    setError(
      validate({
        ...form,
        [property]: value,
      })
    );
  };

  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked && selected.length < 2) {
      setSelected([...selected, value]);
      setForm({
        ...form,
        types: [...selected, value],
      });
      setError(
        validate({
          ...form,
          types: value,
        })
      );
    } else {
      setSelected(selected.filter((option) => option !== value));
      setForm({
        ...form,
        types: selected.filter((option) => option !== value),
      });
      setError(
        validate({
          ...form,
          types: value,
        })
      );
    }
  };

  const resetTypes = () => {
    setSelected([]);
    setForm({
      ...form,
      types: [],
    });
    setError(
      validate({
        ...form,
        types: "",
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createPokemon(form));
    alert("El pokemon se ha creado con éxito!");
    setForm({
      name: "",
      image: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
    setSelected([]);
  };

  return (
    <div className={style.formContainer}>
      <Link to="/home">
        <button type="button" className={style.returnButton}>
          Volver
        </button>
      </Link>
      <h1>Aquí es donde puedes crear un pokemon</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changeInputHandler}
          />
          <br />
          {error.name && <span>{error.name}</span>}
        </div>
        <br />
        <div>
          <label>Image: </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={changeInputHandler}
          />
          <br />
          {error.image && <span>{error.image}</span>}
        </div>
        <br />
        <div>
          <label>HP: </label>
          <input
            type="number"
            name="hp"
            value={form.hp}
            onChange={changeInputHandler}
          />
          <br />
          {error.hp && <span>{error.hp}</span>}
        </div>
        <br />
        <div>
          <label>Attack: </label>
          <input
            type="number"
            name="attack"
            value={form.attack}
            onChange={changeInputHandler}
          />
          <br />
          {error.attack && <span>{error.attack}</span>}
        </div>
        <br />
        <div>
          <label>Defense: </label>
          <input
            type="number"
            name="defense"
            value={form.defense}
            onChange={changeInputHandler}
          />
          <br />
          {error.defense && <span>{error.defense}</span>}
        </div>
        <br />
        <div>
          <label>Speed: </label>
          <input
            type="number"
            name="speed"
            value={form.speed}
            onChange={changeInputHandler}
          />
          <br />
          {error.speed && <span>{error.speed}</span>}
        </div>
        <br />
        <div>
          <label>Height: </label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={changeInputHandler}
          />
          <br />
          {error.height && <span>{error.height}</span>}
        </div>
        <br />
        <div>
          <label>Weight: </label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={changeInputHandler}
          />
          <br />
          {error.weight && <span>{error.weight}</span>}
        </div>
        <br />
        <div>
          <label>Types:</label>
          <div className={style.typesContainer}>
            {allTypes.map((option) => (
              <div key={option.name} className={style.typesCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    value={option.name}
                    checked={selected.includes(option.name)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{option.name}</label>
                </label>
              </div>
            ))}
          </div>

          <div>
            <br />
            <span>{error.types}</span>
          </div>
          <br />
          <button
            type="button"
            onClick={resetTypes}
            className={style.resetButton}
          >
            Resetear los tipos
          </button>
        </div>
        <hr />

        <button
          type="submit"
          disabled={validateForm()}
          className={style.createButton}
        >
          CREAR POKEMON
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
