import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/ArticleCard";
import { textCategories, textEntries } from "@/data/textLibrary";

interface TextDetailPageProps {
  params: Promise<{ category: string; textId: string }>;
}

export default async function TextDetailPage({ params }: TextDetailPageProps) {
  const { category, textId } = await params;
  const categoryData = textCategories.find((item) => item.slug === category);
  const text = textEntries.find((entry) => entry.category === category && entry.id === textId);

  if (!categoryData || !text) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={`/texts/${categoryData.slug}`}
        className="mb-5 inline-block text-sm font-semibold text-indigo-700 hover:underline"
      >
        ← {categoryData.title} matnlariga qaytish
      </Link>

      <ArticleCard
        article={{
          id: text.id,
          title: text.title,
          level: text.level,
          category: categoryData.title,
          readingTimeMinutes: text.readingTimeMinutes,
          content: text.content,
        }}
      />
    </main>
  );
}
