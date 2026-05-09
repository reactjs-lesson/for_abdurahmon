"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { SpeedReadingGame as SpeedReadingGameType } from "@/types/lesson";

interface SpeedReadingGameProps {
  game: SpeedReadingGameType;
}

const BEST_WPM_KEY = "speed-reading-best-wpm";
const SPEED_ANIMALS = [
  { icon: "🐢", name: "Toshbaqa", value: 150 },
  { icon: "🐇", name: "Quyon", value: 280 },
  { icon: "🦅", name: "Burgut", value: 420 },
] as const;

export function SpeedReadingGame({ game }: SpeedReadingGameProps) {
  const [durationSec, setDurationSec] = useState(game.durationOptionsSec[1] ?? 60);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [shownWordCount, setShownWordCount] = useState(0);
  const [bestWpm, setBestWpm] = useState<number>(0);

  const targetWpm = SPEED_ANIMALS[speedIndex].value;
  const words = useMemo(() => game.textGerman.trim().split(/\s+/).filter(Boolean), [game.textGerman]);
  const chunkSize = 1;
  const chunks = useMemo(() => {
    const parts: string[] = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      parts.push(words.slice(i, i + chunkSize).join(" "));
    }
    return parts;
  }, [chunkSize, words]);
  const flashDelayMs = Math.max(Math.round(60000 / targetWpm), 90);
  const elapsedSec = durationSec - timeLeft;
  const elapsedMinutes = Math.max(elapsedSec / 60, 1 / 60);
  const currentWpm = Math.round(shownWordCount / elapsedMinutes);
  const progress = Math.min((elapsedSec / durationSec) * 100, 100);

  const readBestWpm = () => Number(window.localStorage.getItem(BEST_WPM_KEY) ?? 0);

  const completeRun = useCallback((finalTimeLeft: number) => {
    setIsRunning(false);
    setIsFinished(true);
    setTimeLeft(finalTimeLeft);

    const finalElapsedSec = durationSec - finalTimeLeft;
    const finalElapsedMinutes = Math.max(finalElapsedSec / 60, 1 / 60);
    const finalWpm = Math.round(shownWordCount / finalElapsedMinutes);

    const currentBest = Math.max(bestWpm, readBestWpm());
    if (finalWpm > currentBest) {
      setBestWpm(finalWpm);
      window.localStorage.setItem(BEST_WPM_KEY, String(finalWpm));
    } else {
      setBestWpm(currentBest);
    }
  }, [bestWpm, durationSec, shownWordCount]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          completeRun(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [completeRun, isRunning]);

  useEffect(() => {
    if (!isRunning || chunks.length === 0) {
      return;
    }

    const flashIntervalId = window.setInterval(() => {
      setChunkIndex((prev) => {
        const next = prev + 1;
        if (next >= chunks.length) {
          return 0;
        }
        return next;
      });
      setShownWordCount((prev) => prev + chunkSize);
    }, flashDelayMs);

    return () => window.clearInterval(flashIntervalId);
  }, [chunkSize, chunks.length, flashDelayMs, isRunning]);

  const currentChunk = chunks[chunkIndex] ?? "Bereit?";
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isAnswerCorrect = selectedAnswer === game.comprehension.correctAnswer;

  return (
    <section className="rounded-2xl border border-fuchsia-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">⚡</span>
        <h2 className="text-2xl font-bold text-slate-900">Speed Reading</h2>
      </div>

      <h3 className="text-lg font-semibold text-slate-800">{game.title}</h3>
      <p className="mb-4 mt-1 text-sm text-slate-700">{game.guidanceUz}</p>

      <div className="mb-3 flex flex-wrap gap-2">
        {game.durationOptionsSec.map((sec) => (
          <button
            key={sec}
            type="button"
            disabled={isRunning}
            onClick={() => {
              setDurationSec(sec);
              setTimeLeft(sec);
              setIsFinished(false);
              setSelectedAnswer(null);
              setChunkIndex(0);
              setShownWordCount(0);
            }}
            className={`rounded-full border bg-slate-50 px-4 py-1 text-sm font-semibold text-slate-900 transition ${
              durationSec === sec
                ? "border-fuchsia-500 ring-1 ring-fuchsia-200"
                : "border-slate-300 hover:border-slate-400"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {sec}s
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Tezlik boshqaruvi (hayvonlar)
        </p>
        <div className="mb-2 flex flex-wrap gap-2">
          {SPEED_ANIMALS.map((animal, index) => (
          <button
            key={animal.name}
            type="button"
            onClick={() => {
              setSpeedIndex(index);
            }}
            className={`rounded-lg border bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 transition ${
              speedIndex === index
                ? "border-indigo-500 ring-1 ring-indigo-200"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <span className="mr-2 text-lg">{animal.icon}</span>
            {animal.name} ({animal.value} WPM)
          </button>
        ))}
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={speedIndex}
          onChange={(event) => {
            setSpeedIndex(Number(event.target.value));
          }}
          className="w-full accent-indigo-500"
        />
      </div>

      <div className="mb-4 rounded-xl border border-fuchsia-100 bg-fuchsia-50/60 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-700">
          Flash Card Reader
        </div>
        <div className="flex h-28 items-center justify-center rounded-lg bg-white text-center text-3xl font-extrabold tracking-wide text-slate-900 sm:text-4xl">
          {isRunning ? currentChunk : "Start tugmasini bosing"}
        </div>
        <p className="mt-3 text-xs text-slate-600">
          Matn bo&apos;laklari avtomatik almashadi. Ko&apos;z bilan tez ushlashga harakat qiling.
        </p>
      </div>

      <div className="mb-4 h-2 w-full rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-linear-to-r from-fuchsia-400 to-indigo-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">Zeit</p>
          <p className="text-lg font-bold text-slate-900">
            {minutes}:{seconds}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">WPM</p>
          <p className="text-lg font-bold text-slate-900">{isRunning || isFinished ? currentWpm : 0}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">Personal Best</p>
          <p className="text-lg font-bold text-slate-900">{bestWpm}</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            if (isFinished) {
              setTimeLeft(durationSec);
              setIsFinished(false);
              setSelectedAnswer(null);
              setChunkIndex(0);
              setShownWordCount(0);
            }
            setBestWpm(readBestWpm());
            setIsRunning(true);
          }}
          className="rounded-full bg-fuchsia-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-fuchsia-700"
        >
          Start
        </button>
        <button
          type="button"
          onClick={() => setIsRunning(false)}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Pause
        </button>
        <button
          type="button"
          onClick={() => {
            completeRun(0);
          }}
          className="rounded-full border border-fuchsia-300 px-5 py-2 text-sm font-semibold text-fuchsia-700 transition hover:scale-105 hover:bg-fuchsia-50"
        >
          Finish
        </button>
        <button
          type="button"
          onClick={() => {
            setIsRunning(false);
            setIsFinished(false);
            setSelectedAnswer(null);
            setTimeLeft(durationSec);
            setChunkIndex(0);
            setShownWordCount(0);
          }}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      {isFinished && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">Quick comprehension check</p>
          <p className="mb-3 text-sm text-slate-700">{game.comprehension.question}</p>
          <div className="flex flex-col gap-2">
            {game.comprehension.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedAnswer(option)}
                className={`rounded-lg border bg-white px-3 py-2 text-left text-sm text-slate-900 transition ${
                  selectedAnswer === option
                    ? "border-indigo-500 ring-1 ring-indigo-200"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <p className={`mt-3 text-sm font-semibold ${isAnswerCorrect ? "text-emerald-700" : "text-rose-700"}`}>
              {isAnswerCorrect
                ? "Ajoyib! Tez o'qib ham mazmunni to'g'ri tushundingiz."
                : "Javob noto'g'ri. Yana bir marta matnni tez va diqqat bilan o'qib ko'ring."}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
