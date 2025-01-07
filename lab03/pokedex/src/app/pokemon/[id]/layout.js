"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function PokemonLayout({ children }) {
  return (
    <>
      <div id="breadcrumbs">
        <Breadcrumbs />
      </div>
      {children}
    </>
  );
}
