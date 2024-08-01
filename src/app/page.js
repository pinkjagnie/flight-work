import SearchBox from "./components/SearchBox";
import ScrollToTopButton from "./components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-8 text-stone-950 bg-stone-50">
      <SearchBox />
      <ScrollToTopButton />
    </main>
  );
}
