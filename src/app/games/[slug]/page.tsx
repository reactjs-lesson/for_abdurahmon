import Link from "next/link";
import { notFound } from "next/navigation";

import { SpeedReadingGame } from "@/components/SpeedReadingGame";
import { SpeakingGame } from "@/components/SpeakingGame";
import { WordGame } from "@/components/WordGame";
import { WordScrambleGame } from "@/components/WordScrambleGame";
import {
  speedReadingGame,
  speakingPrompt,
  wordGames,
  wordScrambleGame,
} from "@/data/germanLessons";

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/games" className="mb-5 inline-block text-sm font-semibold text-indigo-700 hover:underline">
        ← Spiele ro&apos;yxatiga qaytish
      </Link>

      {slug === "wortspiele" && <WordGame games={wordGames} />}
      {slug === "word-scramble" && <WordScrambleGame game={wordScrambleGame} />}
      {slug === "speed-reading" && <SpeedReadingGame game={speedReadingGame} />}
      {slug === "sprechspiel" && <SpeakingGame prompt={speakingPrompt} />}

      {!["wortspiele", "word-scramble", "speed-reading", "sprechspiel"].includes(slug) && notFound()}
    </main>
  );
}
