import Link from "next/link";

const gameCards = [
  {
    slug: "wortspiele",
    title: "Wortspiele",
    description: "Artikel, synonym, ma'no va grammatika bo'yicha mashqlar.",
    icon: "🎮",
  },
  {
    slug: "word-scramble",
    title: "Word Scramble",
    description: "Aralash harflarni tez yozib, typing tezligingizni oshiring.",
    icon: "⌨️",
  },
  {
    slug: "speed-reading",
    title: "Speed Reading",
    description: "Flash card o'qish rejimida tezlik va tushunishni rivojlantiring.",
    icon: "⚡",
  },
  {
    slug: "sprechspiel",
    title: "Sprechspiel",
    description: "Nemischa speaking prompt bilan gapirish ko'nikmasini mashq qiling.",
    icon: "🎤",
  },
];

export default function GamesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Spiele</h1>
        <p className="mt-2 text-slate-700">O&apos;yinni tanlang va ichiga kirib mashqni boshlang.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {gameCards.map((game) => (
          <Link
            key={game.slug}
            href={`/games/${game.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <p className="mb-2 text-2xl">{game.icon}</p>
            <h2 className="text-xl font-semibold text-slate-900">{game.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{game.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
