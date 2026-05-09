import Link from "next/link";

import { textCategories, textEntries } from "@/data/textLibrary";

export default function TextCategoriesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 rounded-2xl border border-white/70 bg-white/85 p-6 shadow-sm backdrop-blur-xs">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Texte nach Kategorien
        </h1>
        <p className="mt-2 text-base font-medium text-slate-800">
          Kategoriyani tanlang. Keyingi sahifada shu kategoriya bo&apos;yicha matnlar chiqadi.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {textCategories.map((category) => {
          const count = textEntries.filter((entry) => entry.category === category.slug).length;
          return (
            <Link
              key={category.slug}
              href={`/texts/${category.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="mb-2 text-2xl">{category.icon}</p>
              <h2 className="text-xl font-semibold text-slate-900">{category.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{category.descriptionUz}</p>
              <p className="mt-3 text-xs font-semibold text-indigo-700">{count} ta matn</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
