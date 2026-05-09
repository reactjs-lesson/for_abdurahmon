import type { ArticleText } from "@/types/lesson";

interface ArticleCardProps {
  article: ArticleText;
}

function renderStrongText(text: string) {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);

  return parts.map((part, index) => {
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      const strongValue = part.replace("<strong>", "").replace("</strong>", "");
      return (
        <strong key={`${strongValue}-${index}`} className="font-bold text-slate-900">
          {strongValue}
        </strong>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
}

export function ArticleCard({ article }: ArticleCardProps) {
  const paragraphs = article.content.split("\n\n");

  return (
    <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 transition hover:scale-105">
          Niveau {article.level}
        </span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:scale-105">
          {article.category}
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 transition hover:scale-105">
          {article.readingTimeMinutes} min
        </span>
      </div>
      <h2 className="mb-3 text-2xl font-bold text-slate-900">Prüfungstext</h2>
      <h3 className="mb-4 text-lg font-semibold text-slate-800">{article.title}</h3>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={`${article.id}-${index}`} className="leading-8 text-slate-700">
            {renderStrongText(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
}
