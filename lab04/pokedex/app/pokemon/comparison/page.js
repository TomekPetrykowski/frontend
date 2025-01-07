"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getPokemon } from "../../utils/requests";
import Compare from "../../components/Compare/Compare";

export default function ComparisonPage() {
  const searchParams = useSearchParams();
  const [id1, id2] = searchParams.getAll("id");
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        if (!id1 || !id2) {
          setError("Nie znaleziono pokemonów do porównania.");
          return;
        }
        const data = await Promise.all([getPokemon(id1), getPokemon(id2)]);

        if (!data) {
          setError("Nie moglismy pobrać danych pokemonów.");
        } else {
          const comparition = data.reduce((acc, pokemon, i) => {
            acc[`pokemon${i + 1}`] = {
              name: pokemon.name,
              sprites: pokemon.sprites,
              stats: pokemon.stats,
              types: pokemon.types,
            };
            return acc;
          }, {});

          setPokemons(comparition);
        }
      } catch (error) {
        setError("Nie mogliśmy porównać pokemonów.");
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [id1, id2]);

  return (
    <main id="content">
      <div id="breadcrumbs">
        <Breadcrumbs />
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && <Compare {...pokemons} />}
    </main>
  );
}
