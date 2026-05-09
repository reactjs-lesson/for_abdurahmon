"use client";

import { useMemo, useState } from "react";

import type { WordGame as WordGameType } from "@/types/lesson";

interface WordGameProps {
  games: WordGameType[];
}

export function WordGame({ games }: WordGameProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let total = 0;
    let correct = 0;

    for (const game of games) {
      for (const question of game.questions) {
        total += 1;
        if (answers[question.id] === question.correctAnswer) {
          correct += 1;
        }
      }
    }

    return { total, correct };
  }, [answers, games]);

  return (
    <section className="rounded-3xl border border-amber-100 bg-linear-to-br from-white via-amber-50/50 to-orange-50/50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎮</span>
          <h2 className="text-2xl font-bold text-slate-900">Wortspiele</h2>
        </div>
        <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-amber-700">
          Interaktiv
        </span>
      </div>

      <div className="space-y-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="rounded-2xl border border-amber-200/80 bg-white/90 p-5 shadow-xs transition hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800">{game.title}</h3>
            <p className="mb-4 text-sm text-slate-700">{game.descriptionUz}</p>

            <div className="space-y-4">
              {game.questions.map((question) => {
                const selected = answers[question.id];
                const isRight = selected === question.correctAnswer;

                return (
                  <div key={question.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                    <p className="mb-3 font-medium text-slate-800">{question.prompt}</p>
                    <div className="flex flex-wrap gap-2">
                      {question.options.map((option) => (
                        <button
                          key={`${question.id}-${option}`}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [question.id]: option }))
                          }
                          className={`cursor-pointer rounded-full border bg-white px-3 py-1 text-sm text-slate-900 transition duration-200 hover:scale-105 ${
                            selected === option
                              ? "border-amber-500 ring-1 ring-amber-200"
                              : "border-slate-300 hover:border-slate-400"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {submitted && (
                      <div
                        className={`mt-3 rounded-lg p-3 text-sm ${
                          !selected
                            ? "bg-amber-100/70 text-amber-900"
                            : isRight
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-rose-100 text-rose-900"
                        }`}
                      >
                        {!selected && (
                          <p>
                            Javob belgilanmagan. To&apos;g&apos;ri javob:{" "}
                            <span className="font-semibold">{question.correctAnswer}</span>
                          </p>
                        )}
                        {selected && isRight && <p>To&apos;g&apos;ri! Juda yaxshi.</p>}
                        {selected && !isRight && (
                          <div className="space-y-1">
                            <p>Siz xato qildingiz.</p>
                            <p>
                              Sizning javobingiz: <span className="font-semibold">{selected}</span>
                            </p>
                            <p>
                              To&apos;g&apos;ri javob:{" "}
                              <span className="font-semibold">{question.correctAnswer}</span>
                            </p>
                            <p>Hint: {question.hintUz}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-amber-600"
        >
          Natijani ko&apos;rish
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Qaytadan boshlash
        </button>
        {submitted && (
          <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200">
            Ball: {score.correct}/{score.total}
          </p>
        )}
      </div>
    </section>
  );
}
