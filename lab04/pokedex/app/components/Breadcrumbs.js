import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { parseName } from "../utils/utils";

export default function Breadcrumbs() {
  const segments = {
    favourites: "Ulubione",
    pokemon: "Pokemony",
    comparison: "Porównanie",
  };

  const path = usePathname()
    .split("/")
    .filter((item) => item);

  const breadcrumbItems = path.map((segment, index) => {
    const href = "/" + path.slice(0, index + 1).join("/");

    return (
      <span key={href} className="flex items-center">
        <MdKeyboardArrowRight className="mr-1" />
        <Link href={href} className="hover:text-blue-900">
          {segments[segment] || parseName(segment)}
        </Link>
      </span>
    );
  });

  return (
    <nav className="flex gap-1 text-sm">
      <Link href="/" className="hover:text-blue-900">
        Strona główna
      </Link>
      {breadcrumbItems}
    </nav>
  );
}
