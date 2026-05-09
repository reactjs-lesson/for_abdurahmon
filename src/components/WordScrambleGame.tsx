"use client";

import { useEffect, useMemo, useState } from "react";

import type { WordScrambleGame as WordScrambleGameType } from "@/types/lesson";

interface WordScrambleGameProps {
  game: WordScrambleGameType;
}

function shuffleWord(word: string, seed: number) {
  const chars = word.split("");
  // Deterministic pseudo-random shuffle for SSR/client consistency.
  let state = seed + word.length * 97;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  const shuffled = chars.join("");
  return shuffled.toLowerCase() === word.toLowerCase() ? word.split("").reverse().join("") : shuffled;
}

export function WordScrambleGame({ game }: WordScrambleGameProps) {
  const [durationSec, setDurationSec] = useState(game.durationOptionsSec[1] ?? 45);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  const speedAnimals = [
    { icon: "🐢", name: "Toshbaqa", multiplier: 1 },
    { icon: "🐇", name: "Quyon", multiplier: 1.3 },
    { icon: "🦅", name: "Burgut", multiplier: 1.6 },
  ] as const;

  const currentWord = game.words[wordIndex % game.words.length];
  const scrambledWord = useMemo(
    () => shuffleWord(currentWord, wordIndex + speedIndex * 31),
    [currentWord, speedIndex, wordIndex]
  );
  const elapsedSec = durationSec - timeLeft;
  const elapsedMin = Math.max(elapsedSec / 60, 1 / 60);
  const wpm = Math.round((typedChars / 5) / elapsedMin);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">⌨️</span>
        <h2 className="text-2xl font-bold text-slate-900">Word Scramble</h2>
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
              setCorrectCount(0);
              setTypedChars(0);
              setWordIndex(0);
              setInputValue("");
            }}
            className={`rounded-full border bg-slate-50 px-4 py-1 text-sm font-semibold text-slate-900 transition ${
              durationSec === sec
                ? "border-rose-500 ring-1 ring-rose-200"
                : "border-slate-300 hover:border-slate-400"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {sec}s
          </button>
        ))}
      </div>

      <div className="mb-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Tezlik boshqaruvi (hayvonlar)
        </p>
        <div className="mb-2 flex gap-2">
          {speedAnimals.map((animal, index) => (
            <button
              key={animal.name}
              type="button"
              disabled={isRunning}
              onClick={() => setSpeedIndex(index)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                speedIndex === index
                  ? "border-rose-500 bg-white text-slate-900 ring-1 ring-rose-200"
                  : "border-slate-300 bg-white text-slate-800 hover:border-slate-400"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              <span className="mr-2 text-lg">{animal.icon}</span>
              {animal.name}
            </button>
          ))}
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          disabled={isRunning}
          value={speedIndex}
          onChange={(event) => setSpeedIndex(Number(event.target.value))}
          className="w-full accent-rose-500"
        />
      </div>

      <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50/60 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-rose-700">
          Aralash so&apos;z
        </p>
        <p className="text-3xl font-extrabold tracking-widest text-slate-900">{scrambledWord}</p>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">Zeit</p>
          <p className="text-lg font-bold text-slate-900">
            {minutes}:{seconds}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">Richtig</p>
          <p className="text-lg font-bold text-slate-900">{correctCount}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 text-sm">
          <p className="text-slate-500">WPM</p>
          <p className="text-lg font-bold text-slate-900">{isRunning || isFinished ? wpm : 0}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          disabled={!isRunning}
          placeholder="So'zni tez yozing..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-rose-500"
        />
        <button
          type="button"
          disabled={!isRunning}
          onClick={() => {
            const normalizedInput = inputValue.trim().toLowerCase();
            const normalizedWord = currentWord.toLowerCase();
            if (normalizedInput === normalizedWord) {
              const boost = speedAnimals[speedIndex].multiplier;
              setCorrectCount((prev) => prev + Math.max(1, Math.round(boost)));
              setTypedChars((prev) => prev + currentWord.length);
            }
            setWordIndex((prev) => prev + 1);
            setInputValue("");
          }}
          className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
        >
          Tasdiqlash
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            if (isFinished) {
              setTimeLeft(durationSec);
              setIsFinished(false);
              setCorrectCount(0);
              setTypedChars(0);
              setWordIndex(0);
              setInputValue("");
            }
            setIsRunning(true);
          }}
          className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-700"
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
            setIsRunning(false);
            setIsFinished(false);
            setTimeLeft(durationSec);
            setCorrectCount(0);
            setTypedChars(0);
            setWordIndex(0);
            setInputValue("");
          }}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Reset
        </button>
      </div>

      {isFinished && (
        <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          Vaqt tugadi. Natija: {correctCount} ta to&apos;g&apos;ri so&apos;z, {wpm} WPM.
        </p>
      )}
    </section>
  );
}
