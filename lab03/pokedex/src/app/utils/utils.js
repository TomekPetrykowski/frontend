export function parseName(name) {
  return name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

export function capitalize(word) {
  const firstLetter = word.charAt(0);
  const restLetters = word.slice(1);

  return firstLetter.toUpperCase() + restLetters;
}

export function saveFavs(favourites) {
  localStorage.setItem("favourites", JSON.stringify([...favourites]));
}

export function getFavs() {
  const stored = localStorage.getItem("favourites");
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

export function addToFavs(favs, pokemonId) {
  favs.add(pokemonId);
  saveFavs(favs);
}

export function removeFromFavs(favs, pokemonId) {
  favs.delete(pokemonId);
  saveFavs(favs);
}

export function isFav(favs, pokemonId) {
  return favs.has(pokemonId);
}

export async function handleBackspace(event, param, callback) {
  if (event.key === "Backspace") {
    if (param.length === 0) callback();
  }
}

export async function handleEnter(event, callback) {
  if (event.key === "Enter") {
    callback();
  }
}
