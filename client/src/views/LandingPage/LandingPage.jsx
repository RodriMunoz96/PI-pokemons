import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.componentContainer}>
      <h1 className={style.title}>Bienvenido a mi api de Pokemon!</h1>
      <h3>Nuevo cambio para landing</h3>
      <Link to="/home">
        <h3 className={style.enter}>Empecemos!</h3>
      </Link>
    </div>
  );
};

export default LandingPage;
