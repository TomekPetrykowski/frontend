import Image from "next/image";

export default function Loading() {
  return (
    <div className="loading">
      <Image
        src="/pokeball.svg"
        alt="loading animation"
        width={120}
        height={120}
      />
      <p>Łapanie pokemonów...</p>
    </div>
  );
}
