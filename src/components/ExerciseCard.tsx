"use client";

import { useState } from "react";

import type { Exercise } from "@/types/lesson";

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedId === exercise.correctOptionId;

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🧠</span>
        <h2 className="text-2xl font-bold text-slate-900">Interessante Übung</h2>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-800">{exercise.title}</h3>
      <p className="mb-4 text-slate-700">{exercise.question}</p>

      <div className="space-y-3">
        {exercise.options.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            className={`w-full cursor-pointer rounded-xl border px-4 py-3 text-left text-sm text-slate-900 transition duration-200 hover:scale-[1.01] ${
              selectedId === option.id
                ? "border-emerald-500 ring-1 ring-emerald-200"
                : "border-slate-200 bg-slate-50 hover:border-slate-300"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsSubmitted(true)}
          disabled={!selectedId}
          className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
        >
          Antwort prüfen
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedId(null);
            setIsSubmitted(false);
          }}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Neu starten
        </button>
      </div>

      {isSubmitted && selectedId && (
        <div
          className={`mt-4 rounded-xl p-4 text-sm ${
            isCorrect
              ? "bg-emerald-100 text-emerald-900"
              : "bg-rose-100 text-rose-900"
          }`}
        >
          <p className="font-semibold">
            {isCorrect ? "Sehr gut! Richtige Antwort." : "Fast! Bitte noch einmal versuchen."}
          </p>
          <p className="mt-1">{exercise.explanationUz}</p>
        </div>
      )}
    </section>
  );
}
