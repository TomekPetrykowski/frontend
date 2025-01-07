import { parseName } from "../../utils/utils";

export default function Compare({ pokemon1, pokemon2 }) {
  const translatedStats = {
    hp: "życie",
    attack: "atak",
    defense: "obrona",
    "special-attack": "atak specjalny",
    "special-defense": "wzmocniona obrona",
    speed: "szybkość",
  };

  const renderPokemonDetails = (pokemon) => {
    const { name, sprites, stats, types } = pokemon;
    const image =
      sprites?.other?.dream_world?.front_default ||
      sprites?.other?.["official-artwork"]?.front_default;

    return (
      <div className="pokemon-details">
        <div className="image">
          <img src={image} alt={`${name} image`} />
        </div>
        <div className="header">
          <h2 className="name">{parseName(name)}</h2>
          <div className="types">
            {types.map(({ type }, i) => (
              <div key={i} className={`type type-clr-${type.name}`}>
                {type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="info">
          <div className="stats">
            <h3 className="title">Statystyki</h3>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>punkty</th>
                  <th>wysiłek</th>
                </tr>
              </thead>
              <tbody id="stats-table">
                {stats.map(({ base_stat, effort, stat }, i) => (
                  <tr key={i}>
                    <th>{translatedStats[stat.name]}</th>
                    <td>{base_stat}</td>
                    <td>{effort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="comparison-container">
      {renderPokemonDetails(pokemon1)}
      {renderPokemonDetails(pokemon2)}
    </div>
  );
}
