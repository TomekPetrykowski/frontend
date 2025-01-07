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

function openSidePanel() {
  document.body.classList.add("active");
  document.getElementById("details").classList.add("active");
  document.getElementById("overlay").classList.add("active");
  document.querySelector(".wrapper").classList.add("active");
}

function closeSidePanel() {
  document.body.classList.remove("active");
  document.getElementById("details").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
  document.querySelector(".wrapper").classList.remove("active");
}

function updateDetails(root, pokemon) {
  root.render(<PokemonDetails {...pokemon} />);
}

function updateMainContent(MainComponent, targetID = "content") {
  const target = document.getElementById(targetID);
  ReactDOM.render(MainComponent, target);
}
