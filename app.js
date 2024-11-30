const pokemonList = document.querySelector("#pokemon-list");
const searchBtn = document.querySelector("#search__btn");
const searchField = document.querySelector("#search__field");
let pokemons = [];
let deckDisplayed = false;

window.addEventListener("load", async () => {
  displayLoadingAnimation(pokemonList);
  const pokemonNames = await get20Pokemons();

  if (pokemonNames) {
    pokemons = await Promise.all(
      pokemonNames.map((pokemonName) => getPokemon(pokemonName))
    );
    displayDeck(pokemonList, pokemons);
  } else {
    displayError(pokemonList, "Wszystkie pokemony się schowały...");
  }
});

//  SEARCHING ---------------------------------------------------- //

searchBtn.addEventListener("click", async () => {
  displayLoadingAnimation(pokemonList);
  const pokemonName = searchField.value.toLowerCase();
  if (!pokemonName) {
    displayDeck(pokemonList, pokemons);
  } else {
    displaySearchResult(pokemonName);
  }
});

searchField.addEventListener("focus", () => {
  searchField.addEventListener("keydown", (event) => {
    const pokemonName = searchField.value.toLowerCase();
    if (event.key === "Enter") {
      if (pokemonName) {
        displayLoadingAnimation(pokemonList);
        displaySearchResult(pokemonName);
      }
    }
  });

  searchField.addEventListener("keyup", (event) => {
    const pokemonName = searchField.value.toLowerCase();
    if (event.key == "Backspace") {
      if (pokemonName.length === 0 && !deckDisplayed) {
        displayDeck(pokemonList, pokemons);
      }
    }
  });
});

async function displaySearchResult(pokemonName) {
  const pokemon = await getPokemon(pokemonName);

  if (pokemon) {
    displayDeck(pokemonList, [pokemon]);
  } else {
    displayError(pokemonList, "Nie możemy znależć tego pokemona...");
  }

  deckDisplayed = false;
}

async function get20Pokemons() {
  const url = `https://pokeapi.co/api/v2/pokemon`;

  try {
    const response = await fetch(url);

    if (response.status !== 200) return null;

    const result = await response.json();
    return result.results.map((obj) => obj.name);
  } catch (error) {
    console.error(error);
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
    // console.error(error);
    return null;
  }
}

function displayDeck(surface, pokemons) {
  surface.innerHTML = "";
  clearLoading(surface);

  pokemons.map((pokemon) => {
    addPokemonBox(surface, pokemon);
  });
  deckDisplayed = true;
}

function addPokemonBox(surface, pokemonData) {
  const pokemonBox = createPokemonBox();
  const pokemonImgs = pokemonData.sprites.other;
  const image = pokemonBox.querySelector("img");
  const name = pokemonBox.querySelector(".info h2");
  const index = pokemonBox.querySelector(".info span");

  console.log(pokemonData);

  image.src =
    pokemonImgs.dream_world.front_default ||
    pokemonImgs["official-artwork"].front_default;
  image.alt = `${pokemonData.name} image`;
  name.innerText = parseName(pokemonData.name);
  index.innerText = `#${pokemonData.id}`;

  surface.classList.remove("loading");
  surface.appendChild(pokemonBox);
  return surface;
}

function createPokemonBox() {
  const pokemonBox = document.createElement("div");
  const imageBox = document.createElement("div");
  const info = document.createElement("div");
  const img = document.createElement("img");
  const name = document.createElement("h2");
  const index = document.createElement("span");

  pokemonBox.classList.add("fade-in");
  pokemonBox.classList.add("pokemon-list__item");
  imageBox.classList.add("image");
  info.classList.add("info");

  imageBox.appendChild(img);
  info.appendChild(name);
  info.appendChild(index);
  pokemonBox.appendChild(imageBox);
  pokemonBox.appendChild(info);

  return pokemonBox;
}

function displayLoadingAnimation(surface) {
  const image = document.createElement("img");
  const text = document.createElement("p");
  image.src = "./pokeball.svg";
  text.innerText = "Łapanie pokemonów ...";

  surface.innerHTML = "";
  surface.classList.add("loading");
  surface.appendChild(image);
  surface.appendChild(text);
}

function clearLoading(surface) {
  if (surface.classList.contains("loading"))
    surface.classList.remove("loading");
}

function displayError(surface, error) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error");
  errorMessage.textContent = `Wystąpił błąd. ${error}`;

  surface.innerHTML = "";
  clearLoading(surface);
  surface.appendChild(errorMessage);
}

function parseName(name) {
  return name
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

function capitalize(word) {
  const firstLetter = word.charAt(0);
  const restLetters = word.slice(1);

  return firstLetter.toUpperCase() + restLetters;
}
