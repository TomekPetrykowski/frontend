"use client";

import { parseName } from "@/app/utils/utils";
import { MdStar, MdStarBorder } from "react-icons/md";
import { useState } from "react";
import { isFav, getFavs, removeFromFavs, addToFavs } from "@/app/utils/utils";

export function PokemonBox({ id, name, sprites, _, onClick }) {
  const dreamWorldFront = sprites.other.dream_world.front_default;
  const officialFront = sprites.other["official-artwork"].front_default;
  const favourites = getFavs();
  let [favourite, setFavourite] = useState(isFav(favourites, id));
  let [classname, setClassname] = useState("");

  const handleMouseEnter = () => {
    if (favourite) {
      setClassname("remove");
    } else {
      setClassname("add");
    }
  };

  const handleMouseLeft = () => {
    setClassname("");
  };

  const handleStarClick = (event, pokemonId) => {
    event.stopPropagation();

    if (favourite) {
      removeFromFavs(favourites, pokemonId);
      setFavourite(false);
    } else {
      addToFavs(favourites, pokemonId);
      setFavourite(true);
    }
  };

  return (
    <div className="fade-in pokemon-list__item" onClick={onClick}>
      <div className="image">
        <img src={dreamWorldFront || officialFront} alt={name + " image"} />
      </div>
      <div className="info">
        <h2>{parseName(name)}</h2>
        <span>#{id}</span>
        <div
          className="star"
          data-hover-text={
            favourite ? "Usuń z ulubionych" : "Dodaj do ulubionych"
          }
          onClick={(event) => {
            handleStarClick(event, id);
          }}>
          {favourite ? (
            <MdStar
              className={classname}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeft}
            />
          ) : (
            <MdStarBorder
              className={classname}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeft}
            />
          )}
        </div>
      </div>
    </div>
  );
}
