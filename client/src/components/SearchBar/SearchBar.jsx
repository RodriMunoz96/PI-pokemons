import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPokemonByName(name));
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.inputField}
        type="text"
        placeholder="nombre del pokemon"
        onChange={handleChange}
      ></input>
      <button
        className={styles.searchButton}
        type="submit"
        onClick={handleSubmit}
      >
        BUSCAR
      </button>
    </div>
  );
};

export default SearchBar;
