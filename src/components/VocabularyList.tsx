import type { VocabularyItem } from "@/types/lesson";

interface VocabularyListProps {
  items: VocabularyItem[];
}

export function VocabularyList({ items }: VocabularyListProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-xl">📘</span>
        <h2 className="text-2xl font-bold text-slate-900">Schwierige Wörter</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-violet-100 bg-violet-50/50 p-4 transition duration-300 hover:scale-[1.02] hover:bg-violet-100/70"
          >
            <p className="text-lg font-semibold text-slate-900">{item.german}</p>
            <p className="mb-2 text-sm font-medium text-violet-700">{item.uzbek}</p>
            <p className="text-sm text-slate-700">{item.exampleSentence}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
