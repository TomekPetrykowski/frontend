"use client";

import { PokemonBox } from "./PokemonBox";
import { useRouter } from "next/navigation";

export default function PokemonList({ pokemons }) {
  const router = useRouter();

  const handleClick = (pokemon) => {
    router.push(`/pokemon/${pokemon.name}`);
  };

  return (
    <section id="pokemon-list">
      {pokemons.map((pokemon) => {
        return (
          <PokemonBox
            {...pokemon}
            key={pokemon.name}
            onClick={() => handleClick(pokemon)}
          />
        );
      })}
    </section>
  );
}
