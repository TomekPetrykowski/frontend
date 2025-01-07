import { useState } from "react";
import { getFavs, saveFavs } from "@/app/utils/utils";

export function useFavourites() {
  const [favourites, setFavourites] = useState(new Set(getFavs()));

  const handleFavouriteToggle = (id) => {
    const updatedFavs = new Set(favourites);
    if (updatedFavs.has(id)) {
      updatedFavs.delete(id);
    } else {
      updatedFavs.add(id);
    }
    setFavourites(updatedFavs);
    saveFavs(updatedFavs);
  };

  return [favourites, handleFavouriteToggle];
}
