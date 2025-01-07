import Navigation from "./components/Navigation";
import "./globals.css";

export const metadata = {
  title: "Pokedex",
  description: "Moja wersja pokedexu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
