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
  return JSON.parse(localStorage.getItem("favourites")) || [];
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
