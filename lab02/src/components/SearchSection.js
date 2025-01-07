function SearchSection({ onSearch, onClearSearchBar }) {
  let deckDisplayed = true;

  async function handleSearchClick() {
    const name = document.getElementById("search__field").value;
    deckDisplayed = await onSearch(name);
  }

  async function handleKeyUp(event) {
    const name = document.getElementById("search__field").value;
    if (event.key === "Backspace") {
      deckDisplayed = await onClearSearchBar(name, deckDisplayed);
    }
  }

  async function handleKeyDown(event) {
    const name = document.getElementById("search__field").value;
    if (event.key === "Enter") {
      if (name) {
        deckDisplayed = await onSearch(name);
      }
    }
  }

  return (
    <section id="search">
      <input
        name="search-input"
        type="text"
        id="search__field"
        placeholder="Wpisz ID lub nazwę pokemona"
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />
      <button id="search__btn" onClick={handleSearchClick}>
        Szukaj
      </button>
    </section>
  );
}
