function App() {
  let pokemons = [];
  let errorMessage = null;

  if (pokemons.length === 0) {
    fetchPokemons();
  }

  function resetDeck(name, deckDisplayed) {
    if (name.length === 0 && !deckDisplayed) {
      updateMainContent(<PokemonList pokemons={pokemons} />);
      return true;
    }
    return false;
  }

  async function searchPokemon(searchValue) {
    const pokemonName = searchValue.toLowerCase().split(" ").join("-");

    if (pokemonName) {
      updateMainContent(<Loading />);
      try {
        const pokemon = await getPokemon(pokemonName);

        if (!pokemon) {
          errorMessage = "Nie złapaliśmy tego pokemona...";
          throw new Error(errorMessage);
        }

        updateMainContent(<PokemonList pokemons={[pokemon]} />);
      } catch (error) {
        updateMainContent(<Error message={errorMessage} />);
      }
    }
    return false;
  }

  async function fetchPokemons() {
    const pokemonNames = await get20Pokemons();
    try {
      if (!pokemonNames) {
        errorMessage = "Wszystkie pokemony się pochowały...";
        throw new Error(errorMessage);
      }

      const pokemonsResult = await Promise.all(
        pokemonNames.map((name) => getPokemon(name))
      );

      pokemons = pokemonsResult.filter((pokemon) => pokemon !== null);

      if (pokemons.length === 0) {
        errorMessage = "Nie udało się pobrać żadnych pokemonów...";
        throw new Error(errorMessage);
      }

      updateMainContent(<PokemonList pokemons={pokemons} />);
    } catch (error) {
      updateMainContent(<Error message={errorMessage} />);
    }
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <SearchSection onSearch={searchPokemon} onClearSearchBar={resetDeck} />
        <main id="content">
          <Loading />
        </main>
      </div>
      <div id="overlay" onClick={closeSidePanel}></div>
      <aside id="details"></aside>
    </>
  );
}
