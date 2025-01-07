async function get20Pokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon`;

  try {
    const response = await fetch(url);

    if (response.status !== 200) return null;

    const result = await response.json();
    return result.results.map((obj) => obj.name);
  } catch (error) {
    return null;
  }
}

async function getPokemon(pokemonNameOrId) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const { id, name, height, weight, sprites, stats, types } =
      await response.json();

    return {
      id,
      name,
      height,
      weight,
      sprites,
      stats,
      types,
    };
  } catch (error) {
    return null;
  }
}
