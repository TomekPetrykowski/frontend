"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { handleEnter, handleBackspace } from "../utils/utils";

export default function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [types, setTypes] = useState([]);

  const searchValue = searchParams.get("search") || "";
  const typeValue = searchParams.get("type") || "";
  const limitValue = searchParams.get("limit") || "12";
  const [currentSearch, setCurrentSearch] = useState(searchValue);
  const [currentType, setCurrentType] = useState(typeValue);
  const [currentLimit, setCurrentLimit] = useState(limitValue);

  const search = () => {
    const currentParams = new URLSearchParams(searchParams);
    const params = {
      search: currentSearch,
      type: currentType,
      limit: currentLimit,
    };

    Object.keys(params).reduce((_, key) => {
      if (params[key]) {
        currentParams.set(key, params[key]);
      } else {
        currentParams.delete(key);
      }
    }, {});
    router.push(`/pokemon?${currentParams.toString()}`);
  };

  useEffect(() => {
    async function fetchTypes() {
      try {
        const result = await fetch("https://pokeapi.co/api/v2/type");
        const resTypes = await result.json();

        setTypes(resTypes.results);
      } catch (error) {
        console.error("Nie pobrano typów");
      }
    }

    fetchTypes();
  }, []);

  return (
    <section id="search">
      <div className="flex sm:gap-2 gap-4 flex-col sm:flex-row">
        <input
          type="text"
          id="search__field"
          placeholder="Nazwa pokemona"
          onChange={(e) => setCurrentSearch(e.target.value)}
          onKeyDown={(e) => {
            handleEnter(e, search);
          }}
          onKeyUp={(e) => {
            handleBackspace(e, currentSearch, search);
          }}
          value={currentSearch}
        />
        <select
          id="search__select"
          onChange={(e) => setCurrentType(e.target.value)}
          value={currentType}>
          <option value="">Wybierz typ</option>
          {types &&
            types.map(({ name, _ }) => {
              return (
                <option value={name} key={name}>
                  {name}
                </option>
              );
            })}
        </select>
        <button
          id="search__btn"
          onClick={() => {
            search();
          }}>
          Szukaj
        </button>
      </div>
      <div className="flex justify-start items-center">
        <label htmlFor="search__limit">Liczba wyników:</label>
        <input
          className="w-10 ml-2"
          type="number"
          id="search__limit"
          placeholder="12"
          onChange={(e) => setCurrentLimit(e.target.value)}
          onKeyDown={(e) => {
            handleEnter(e, search);
          }}
          onKeyUp={(e) => {
            handleBackspace(e, currentLimit, search);
          }}
          value={currentLimit}
        />
      </div>
    </section>
  );
}
