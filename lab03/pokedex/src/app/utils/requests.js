export async function getPokemon(pokemonNameOrId) {
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
