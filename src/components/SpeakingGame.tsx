"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { SpeakingPrompt } from "@/types/lesson";

interface SpeakingGameProps {
  prompt: SpeakingPrompt;
}

export function SpeakingGame({ prompt }: SpeakingGameProps) {
  const [timeLeft, setTimeLeft] = useState(prompt.suggestedDurationSec);
  const [isRunning, setIsRunning] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [isRecordingReady, setIsRecordingReady] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const audioUrlRef = useRef<string | null>(null);

  const stopAndReleaseMedia = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    mediaRecorderRef.current = null;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  const finishSession = useCallback(() => {
    setIsRunning(false);
    stopAndReleaseMedia();
  }, [stopAndReleaseMedia]);

  const startSession = async () => {
    try {
      setRecordingError(null);
      setIsRecordingReady(false);

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      recordedChunksRef.current = [];
      if (timeLeft <= 0) {
        setTimeLeft(prompt.suggestedDurationSec);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setIsRecordingReady(true);
        }
      };

      recorder.start();
      setIsRunning(true);
    } catch {
      setRecordingError("Mikrofonga ruxsat berilmadi yoki recording ochilmadi.");
      stopAndReleaseMedia();
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          finishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [finishSession, isRunning, timeLeft]);

  useEffect(() => {
    audioUrlRef.current = audioUrl;
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      stopAndReleaseMedia();
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, [stopAndReleaseMedia]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="rounded-2xl border border-cyan-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🎤</span>
        <h2 className="text-2xl font-bold text-slate-900">Sprechspiel</h2>
      </div>

      <p className="mb-3 rounded-xl bg-cyan-50 p-4 font-medium text-slate-800">
        {prompt.promptGerman}
      </p>
      <p className="mb-4 text-sm text-slate-700">{prompt.guidanceUz}</p>

      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Sample Ideen
      </h3>
      <ul className="mb-5 space-y-2">
        {prompt.sampleIdeasGerman.map((idea) => (
          <li
            key={idea}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:translate-x-1 hover:bg-slate-50"
          >
            {idea}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={startSession}
          disabled={isRunning}
          className="rounded-full bg-cyan-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-cyan-700"
        >
          Start speaking
        </button>
        <button
          type="button"
          onClick={finishSession}
          disabled={!isRunning}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Finish
        </button>
        <button
          type="button"
          onClick={() => {
            finishSession();
            setTimeLeft(prompt.suggestedDurationSec);
            setRecordingError(null);
            setIsRecordingReady(false);
            if (audioUrl) {
              URL.revokeObjectURL(audioUrl);
            }
            setAudioUrl(null);
          }}
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:bg-slate-100"
        >
          Reset
        </button>
        <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Zeit: {minutes}:{seconds}
        </p>
      </div>

      {recordingError && (
        <p className="mt-3 rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700">
          {recordingError}
        </p>
      )}

      {isRecordingReady && audioUrl && (
        <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <p className="mb-2 text-sm font-semibold text-cyan-900">Sizning recording tayyor:</p>
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </section>
  );
}
