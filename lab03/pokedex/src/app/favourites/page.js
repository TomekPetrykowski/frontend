"use client";
import { getFavs } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PokemonList from "../components/PokemonList";
import Breadcrumbs from "../components/Breadcrumbs";
import { getPokemon } from "../utils/requests";

export default function FavouritesPage() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favouriteIds = [...getFavs()].sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    async function fetch() {
      try {
        if (favouriteIds.length !== 0) {
          const data = await Promise.all(
            favouriteIds.map((id) => getPokemon(id))
          );

          if (!data) {
            setError("Nie moglismy pobrać danych pokemonów.");
          } else {
            setPokemons(data);
          }
        } else {
          setError("Nie mogliśmy znaleźć Twoich ulubionych pokemonów.");
        }
      } catch (error) {
        setError("Nie mogliśmy znaleźć Twoich ulubionych pokemonów.");
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  return (
    <main id="content">
      <div id="breadcrumbs" className="ml-">
        <Breadcrumbs />
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && <PokemonList pokemons={pokemons} />}
    </main>
  );
}
