import Link from "next/link";
import { notFound } from "next/navigation";

import { textCategories, textEntries } from "@/data/textLibrary";

interface CategoryTextsPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryTextsPage({ params }: CategoryTextsPageProps) {
  const { category } = await params;
  const categoryData = textCategories.find((item) => item.slug === category);

  if (!categoryData) {
    notFound();
  }

  const entries = textEntries.filter((entry) => entry.category === categoryData.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/texts" className="mb-5 inline-block text-sm font-semibold text-indigo-700 hover:underline">
        ← Kategoriyalarga qaytish
      </Link>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{categoryData.title}</h1>
        <p className="mt-2 text-slate-700">Matnni tanlang va detail sahifaga kiring.</p>
      </header>

      <section className="space-y-4">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href={`/texts/${categoryData.slug}/${entry.id}`}
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">{entry.title}</h2>
            <p className="mt-2 text-sm text-slate-700">
              Niveau {entry.level} • {entry.readingTimeMinutes} min
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
