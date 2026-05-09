export type LessonLevel = "B1" | "B2";

export type LessonCategory =
  | "Umwelt"
  | "Bildung"
  | "Arbeit"
  | "Gesundheit"
  | "Reisen"
  | "Technologie";

export interface ArticleText {
  id: string;
  title: string;
  level: LessonLevel;
  category: LessonCategory;
  readingTimeMinutes: number;
  content: string;
}

export interface VocabularyItem {
  id: string;
  german: string;
  uzbek: string;
  exampleSentence: string;
}

export interface ExerciseOption {
  id: string;
  label: string;
}

export interface Exercise {
  id: string;
  title: string;
  question: string;
  options: ExerciseOption[];
  correctOptionId: string;
  explanationUz: string;
}

export type WordGameType = "article" | "synonym" | "meaning" | "grammar";

export interface WordGameQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  hintUz: string;
}

export interface WordGame {
  id: string;
  title: string;
  descriptionUz: string;
  type: WordGameType;
  questions: WordGameQuestion[];
}

export interface SpeakingPrompt {
  id: string;
  promptGerman: string;
  guidanceUz: string;
  sampleIdeasGerman: string[];
  suggestedDurationSec: number;
}

export interface SpeedReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SpeedReadingGame {
  id: string;
  title: string;
  textGerman: string;
  guidanceUz: string;
  durationOptionsSec: number[];
  comprehension: SpeedReadingQuestion;
}

export interface WordScrambleGame {
  id: string;
  title: string;
  guidanceUz: string;
  words: string[];
  durationOptionsSec: number[];
}
