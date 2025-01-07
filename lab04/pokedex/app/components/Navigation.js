import Link from "next/link";

export default function Navigation() {
  return (
    <header>
      <div className="font-bold">GameDex</div>
      <nav>
        <ul className="flex space-x-4 text-sm items-center">
          <li>
            <Link href="/" className="hover:underline hover:opacity-85">
              Strona główna
            </Link>
          </li>
          <li>
            <Link href="/pokemon" className="hover:underline hover:opacity-85">
              Pokemony
            </Link>
          </li>
          <li>
            <Link
              href="/favourites"
              className="hover:underline hover:opacity-85">
              Ulubione
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
