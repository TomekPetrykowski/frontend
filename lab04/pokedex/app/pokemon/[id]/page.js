"use client";
import { useEffect, useState } from "react";
import React from "react";
import { getPokemon } from "@/app/utils/requests";
import PokemonDetails from "@/app/components/PokemonDetails";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";

export default function PokemonDetailsPage({ params }) {
  const { id } = React.use(params);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemon(id);
        if (!data) {
          setError("Nie udało się pobrać szczegółów pokemona...");
          return;
        }
        setPokemon(data);
      } catch (error) {
        setError("Nie udało się pobrać szczegółów pokemona...");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <div id="details">
          <PokemonDetails {...pokemon} />
        </div>
      )}
    </>
  );
}
