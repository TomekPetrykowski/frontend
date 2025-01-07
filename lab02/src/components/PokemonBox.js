function PokemonBox({ id, name, sprites, _, onClick }) {
  const dreamWorldFront = sprites.other.dream_world.front_default;
  const officialFront = sprites.other["official-artwork"].front_default;

  return (
    <div className="fade-in pokemon-list__item" onClick={onClick}>
      <div className="image">
        <img src={dreamWorldFront || officialFront} alt={name + " image"} />
      </div>
      <div className="info">
        <h2>{parseName(name)}</h2>
        <span>#{id}</span>
      </div>
    </div>
  );
}
