import { useState } from "react";

export function useComparison() {
  const prevComparison = localStorage.getItem("comparison");
  const comp = prevComparison
    ? JSON.parse(prevComparison)
    : { pokemon1: null, pokemon2: null };

  const [comparison, setComparison] = useState(comp);

  const handleComparisonToggle = (data) => {
    const { id } = data;
    const updatedComparison = { ...comparison };
    if (updatedComparison.pokemon1 && updatedComparison.pokemon1.id === id) {
      updatedComparison.pokemon1 = null;
    } else if (
      updatedComparison.pokemon2 &&
      updatedComparison.pokemon2.id === id
    ) {
      updatedComparison.pokemon2 = null;
    } else if (!updatedComparison.pokemon1) {
      updatedComparison.pokemon1 = data;
    } else if (!updatedComparison.pokemon2) {
      updatedComparison.pokemon2 = data;
    }

    setComparison(updatedComparison);

    localStorage.setItem("comparison", JSON.stringify(updatedComparison));
  };

  return [comparison, handleComparisonToggle];
}
