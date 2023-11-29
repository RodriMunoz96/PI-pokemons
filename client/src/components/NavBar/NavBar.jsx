import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/home">
        <div>HOME</div>
      </Link>
      <SearchBar />
      <Link to="/create">
        <div>CREATE POKEMON</div>
      </Link>
    </div>
  );
};

export default NavBar;
