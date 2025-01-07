"use client";

import { useState } from "react";
import {
  isFav,
  getFavs,
  removeFromFavs,
  addToFavs,
  parseName,
} from "@/app/utils/utils";
import { BaseIcon } from "./Icon/BaseIcon";
import { MdStar, MdStarBorder } from "react-icons/md";
import { FaScaleUnbalanced } from "react-icons/fa6";

export function PokemonBox({
  id,
  name,
  sprites,
  types,
  stats,
  onClick,
  favourites,
  comparison,
  onFavouriteToggle,
  onComparisonToggle,
}) {
  const dreamWorldFront = sprites.other.dream_world.front_default;
  const officialFront = sprites.other["official-artwork"].front_default;

  const checkComparision = ({ pokemon1, pokemon2 }) => {
    const [id1, id2] = [pokemon1?.id, pokemon2?.id];
    return id === id1 || id === id2;
  };

  const favourite = favourites.has(id);
  const inComparision = checkComparision(comparison);

  return (
    <div className="fade-in pokemon-list__item" onClick={onClick}>
      <div className="image">
        <img src={dreamWorldFront || officialFront} alt={name + " image"} />
      </div>
      <div className="info">
        <h2>{parseName(name)}</h2>
        <span>#{id}</span>
        <BaseIcon
          icon={FaScaleUnbalanced}
          className={inComparision ? "compare gold" : "compare"}
          hoverText={inComparision ? "Usuń z porównania" : "Porównaj"}
          hoverCondition={inComparision}
          onClick={(e) => {
            e.stopPropagation();
            onComparisonToggle({ id, name, types, sprites, stats });
          }}
        />
        <BaseIcon
          icon={favourite ? MdStar : MdStarBorder}
          className={"star"}
          hoverText={favourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          hoverCondition={favourite}
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteToggle(id);
          }}
        />
      </div>
    </div>
  );
}
