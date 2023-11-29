import NavBar from "../../components/NavBar/NavBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getPokemons,
  getTypes,
  orderByName,
  orderByAttack,
  filterBySource,
  filterByType,
} from "../../redux/actions";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.filteredPokemons);
  const allTypes = useSelector((state) => state.allTypes);

  const [filter, setFilter] = useState({
    name: "",
    attack: "",
    source: "",
    types: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const handleFilterClear = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(getPokemons());
  };

  const handleSortName = (event) => {
    event.preventDefault();
    dispatch(orderByName(event.target.value));
    setFilter({ ...filter, name: event.target.value });
  };

  const handleSortAttack = (event) => {
    event.preventDefault();
    dispatch(orderByAttack(event.target.value));
    setFilter({ ...filter, attack: event.target.value });
  };

  const handleFilterSource = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(filterBySource(event.target.value));
    setFilter({ ...filter, source: event.target.value });
  };

  const handleFilterType = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(filterByType(event.target.value));
    setFilter({ ...filter, types: event.target.value });
  };

  const limitPerPage = 12;

  const indexEnd = currentPage * limitPerPage;

  const indexIni = indexEnd - limitPerPage;

  const pokemonsInPage = allPokemons.slice(indexIni, indexEnd);

  const nPages = Math.ceil(allPokemons.length / limitPerPage);

  return (
    <div>
      <NavBar />
      <h1 className={style.title}>
        Aquí es donde puedes ver todos los pokemones que tengo!
      </h1>

      <button
        onClick={(event) => handleFilterClear(event)}
        className={style.button}
      >
        Reload
      </button>
      <br />

      <div className={style.inputGroup}>
        <label class>
          Ordenar alfabéticamente:
          <select
            onChange={(event) => handleSortName(event)}
            value={filter.name}
          >
            <option value="name">name</option>
            <option value="asc">A - Z</option>
            <option value="des">Z - A</option>
          </select>
        </label>

        <label>
          Ordenar por ataque:
          <select
            onChange={(event) => handleSortAttack(event)}
            value={filter.attack}
          >
            <option value="attack">attack</option>
            <option value="min">min</option>
            <option value="max">max</option>
          </select>
        </label>

        <label>
          Filtrar por api o bd:
          <select
            onChange={(event) => handleFilterSource(event)}
            value={filter.source}
          >
            <option value="source">source</option>
            <option value="api">API</option>
            <option value="db">DB</option>
          </select>
        </label>

        <label>
          Filtrar por tipo:
          <select
            onChange={(event) => handleFilterType(event)}
            value={filter.types}
          >
            <option value="types">types</option>
            {allTypes.map((e, index) => (
              <option key={index} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <CardsContainer allPokemons={pokemonsInPage} />

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        nPages={nPages}
      />
    </div>
  );
};

export default Home;
