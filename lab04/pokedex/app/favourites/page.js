"use client";
import { useEffect, useState } from "react";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PokemonList from "../components/PokemonList";
import Breadcrumbs from "../components/Breadcrumbs";
import { ComparePopout } from "../components/ComparePopout/ComparePopout";
import { getPokemon } from "../utils/requests";
import { useFavourites } from "../hooks/useFavourites";
import { useComparison } from "../hooks/useComparison";

export default function FavouritesPage() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [favourites, handleFavouriteToggle] = useFavourites();
  const [comparison, handleComparisonToggle] = useComparison();

  useEffect(() => {
    const favouriteIds = Array.from(favourites).sort(
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
  }, [favourites]);

  return (
    <main id="content">
      <div id="breadcrumbs" className="ml-">
        <Breadcrumbs />
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <PokemonList
          pokemons={pokemons}
          favourites={favourites}
          comparison={comparison}
          onFavouriteToggle={handleFavouriteToggle}
          onComparisonToggle={handleComparisonToggle}
        />
      )}
      {(comparison.pokemon1 || comparison.pokemon2) && (
        <ComparePopout
          comparison={comparison}
          onButtonClick={(comparison) => {
            const { pokemon1, pokemon2 } = comparison;
            if (pokemon1 && pokemon2) {
              router.push(
                `/pokemon/comparison?id=${pokemon1.id}&id=${pokemon2.id}`
              );
            }
          }}
        />
      )}
    </main>
  );
}
