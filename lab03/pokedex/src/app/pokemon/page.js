"use client";
import { useSearchParams } from "next/navigation";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PokemonList from "../components/PokemonList";
import { getPokemon } from "@/app/utils/requests";
import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";

export default function PokemonPage() {
  const searchParams = useSearchParams();

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);
      setError("");
      try {
        const search = searchParams.get("search") || "";
        const type = searchParams.get("type") || "";
        const limit = parseInt(searchParams.get("limit") || "12");

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=1025`
        );
        const data = await response.json();
        const allPokemons = data.results.reduce(
          (acc, poke) => [...acc, poke.name],
          []
        );

        let filteredPokemons = new Set(
          allPokemons.filter((pokemon) =>
            pokemon.includes(search.toLowerCase())
          )
        );

        if (filteredPokemons.length === 0) {
          setError("Nie znaleźliśmy takich pokemonów...");
          return;
        }

        if (type !== "") {
          const response = await fetch(
            `https://pokeapi.co/api/v2/type/${type}`
          );
          const result = await response.json();

          const pokemonsOfTypeSet = new Set(
            result.pokemon.reduce(
              (acc, poke) => [...acc, poke.pokemon.name],
              []
            )
          );

          filteredPokemons = filteredPokemons.intersection(pokemonsOfTypeSet);
        }

        filteredPokemons = [...filteredPokemons].slice(0, limit);

        const pokemons = await Promise.all(
          filteredPokemons.map((pokemon) => getPokemon(pokemon))
        );

        if (pokemons.length > 0) {
          setPokemons(pokemons);
        } else {
          setError("Nie znaleźliśmy takich pokemonów...");
        }
      } catch (error) {
        console.error("Błąd pobierania Pokemonów:", error);
        setError("Wszystkie pokemony się pochowały...");
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [searchParams]);

  return (
    <>
      <FilterBar />

      {loading && <Loading />}
      {errorMessage && <Error message={errorMessage} />}
      {!loading && !errorMessage && <PokemonList pokemons={pokemons} />}
    </>
  );
}
