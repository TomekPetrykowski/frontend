import "./compare-popout.css";
import { parseName } from "@/app/utils/utils";

export function ComparePopout({ comparison, onButtonClick }) {
  const { pokemon1, pokemon2 } = comparison;

  const renderPokemon = ({ name, sprites, types, _ }) => {
    const dreamWorldFront = sprites.other.dream_world.front_default;
    const officialFront = sprites.other["official-artwork"].front_default;

    return (
      <div className="pokemon-to-compare">
        <div className="image">
          <img src={dreamWorldFront || officialFront} alt={name + " image"} />
        </div>
        <div className="data">
          <h3 className="name">{parseName(name)}</h3>
          <div className="types">
            {types.map(({ _, type }, i) => {
              return (
                <div key={i} className={`type type-clr-${type.name}`}>
                  {type.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="compare-popout">
      {pokemon1 && renderPokemon(pokemon1)}
      {pokemon2 && renderPokemon(pokemon2)}
      <button
        className={
          pokemon1 && pokemon2 ? "compare-btn blue" : "compare-btn gray"
        }
        onClick={() => onButtonClick(comparison)}>
        Porównaj
      </button>
    </div>
  );
}
