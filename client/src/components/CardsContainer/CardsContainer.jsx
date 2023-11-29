import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = (props) => {
  const { allPokemons } = props;

  return (
    <div className={style.container}>
      {allPokemons.map((pokemon) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            attack={pokemon.attack}
            types={pokemon.types}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
