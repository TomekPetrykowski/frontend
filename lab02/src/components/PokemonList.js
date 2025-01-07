function PokemonList({ pokemons }) {
  const detailsRoot = ReactDOM.createRoot(document.getElementById("details"));

  function handleClick(pokemon) {
    updateDetails(detailsRoot, pokemon);
    openSidePanel();
  }

  return (
    <section id="pokemon-list">
      {pokemons.map((pokemon) => {
        return (
          <PokemonBox
            {...pokemon}
            key={pokemon.name}
            onClick={() => handleClick(pokemon)}
          />
        );
      })}
    </section>
  );
}
