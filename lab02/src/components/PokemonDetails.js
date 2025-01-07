function PokemonDetails({ _, name, height, weight, sprites, stats, types }) {
  const translatedStats = {
    hp: "życie",
    attack: "atak",
    defense: "obrona",
    "special-attack": "atak specjalny",
    "special-defense": "wzmocniona obrona",
    speed: "szybkość",
  };

  const image =
    sprites?.other?.dream_world?.front_default ||
    sprites?.other?.["official-artwork"]?.front_default;

  return (
    <>
      <button id="close-btn" onClick={closeSidePanel}>
        X
      </button>
      <div className="image">
        <img src={image} alt={`${name} image`} />
      </div>
      <div className="info">
        <div className="header">
          <h2 className="name">{parseName(name)}</h2>
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
              {stats.map(({ base_stat, effort, stat }, i) => {
                return (
                  <tr key={i}>
                    <th>{translatedStats[stat.name]}</th>
                    <td>{base_stat}</td>
                    <td>{effort}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="other">
          <h3 className="title">Inne</h3>
          <table>
            <tbody>
              <tr>
                <th>wzrost</th>
                <td id="stat-height">{height}</td>
              </tr>
              <tr>
                <th>waga</th>
                <td id="stat-weight">{weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
