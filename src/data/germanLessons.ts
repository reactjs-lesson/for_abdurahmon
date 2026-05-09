import type {
  ArticleText,
  Exercise,
  SpeedReadingGame,
  SpeakingPrompt,
  VocabularyItem,
  WordScrambleGame,
  WordGame,
} from "@/types/lesson";

export const lessonArticle: ArticleText = {
  id: "leben-stadt-land-b1",
  title: "Leben in der Stadt und auf dem Land",
  level: "B1",
  category: "Umwelt",
  readingTimeMinutes: 5,
  content:
    "Viele Menschen fragen sich: Ist das Leben in der <strong>Stadt</strong> besser oder auf dem <strong>Land</strong>? In der Stadt gibt es oft mehr <strong>Arbeitsplaetze</strong>, viele Geschaefte und gute Bus- oder Bahnverbindungen. Man kann schnell ins Kino gehen oder Freunde treffen. Ausserdem sind Schulen und Krankenhaeuser meistens nah. Aber das Leben in der Stadt kann auch stressig sein. Es gibt viel Verkehr, Laerm und die Miete ist oft teuer.\n\nAuf dem Land ist das Leben oft ruhiger. Die Luft ist frischer, es gibt mehr Natur und weniger Hektik. Viele Familien moegen die Ruhe und den Platz. Kinder koennen oft sicher draussen spielen. Trotzdem hat das Land auch Nachteile: Es gibt weniger Arbeitsmoeglichkeiten, und ohne Auto ist der Alltag manchmal schwierig. Auch der Weg zur Schule oder zur Arbeit ist oft laenger. Deshalb waehlen viele Menschen einen Mix: Sie arbeiten in der Stadt, wohnen aber lieber auf dem Land.",
};

export const vocabularyItems: VocabularyItem[] = [
  {
    id: "stadt",
    german: "die Stadt",
    uzbek: "shahar",
    exampleSentence:
      "In der Stadt gibt es viele Cafes und Geschaefte.",
  },
  {
    id: "land",
    german: "das Land",
    uzbek: "qishloq hududi",
    exampleSentence:
      "Auf dem Land ist es oft ruhiger als in der Stadt.",
  },
  {
    id: "arbeitsplatz",
    german: "der Arbeitsplatz",
    uzbek: "ish o'rni",
    exampleSentence:
      "Mein Bruder sucht einen neuen Arbeitsplatz in Taschkent.",
  },
  {
    id: "miete",
    german: "die Miete",
    uzbek: "ijara puli",
    exampleSentence:
      "Die Miete in der Innenstadt ist sehr hoch.",
  },
  {
    id: "arbeitsmoeglichkeit",
    german: "die Arbeitsmoeglichkeit",
    uzbek: "ishlash imkoniyati",
    exampleSentence:
      "In kleinen Doerfern gibt es weniger Arbeitsmoeglichkeiten.",
  },
];

export const lessonExercise: Exercise = {
  id: "exercise-main",
  title: "Interessante Uebung: Richtige Aussage",
  question: "Welche Aussage passt zum Text?",
  options: [
    {
      id: "a",
      label: "Online-Lernen ist immer perfekt und ohne Probleme.",
    },
    {
      id: "b",
      label: "Ein Mix aus Online und Schule ist oft eine gute Loesung.",
    },
    {
      id: "c",
      label: "In Zukunft lernen alle nur noch im Klassenzimmer.",
    },
  ],
  correctOptionId: "b",
  explanationUz:
    "Matnga ko'ra eng yaxshi yechim aralash model: onlayn va oflayn darslarni birlashtirish.",
};

export const wordGames: WordGame[] = [
  {
    id: "game-article",
    title: "Der / Die / Das",
    descriptionUz: "To'g'ri artiklni tanlang.",
    type: "article",
    questions: [
      {
        id: "artikel-1",
        prompt: "__ Austausch",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Der",
        hintUz: "Bu so'z maskulin.",
      },
      {
        id: "artikel-2",
        prompt: "__ Flexibilitaet",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Die",
        hintUz: "Bu so'z feminin.",
      },
      {
        id: "artikel-3",
        prompt: "__ Internet",
        options: ["Der", "Die", "Das"],
        correctAnswer: "Das",
        hintUz: "Bu so'z neytral.",
      },
    ],
  },
  {
    id: "game-synonym",
    title: "Synonym finden",
    descriptionUz: "So'zga eng yaqin ma'noni tanlang.",
    type: "synonym",
    questions: [
      {
        id: "syn-1",
        prompt: "praktisch",
        options: ["nutzlos", "nuetzlich", "langweilig"],
        correctAnswer: "nuetzlich",
        hintUz: "Kundalik hayotda foydali degan ma'no.",
      },
      {
        id: "syn-2",
        prompt: "foerdern",
        options: ["unterstuetzen", "verhindern", "vergessen"],
        correctAnswer: "unterstuetzen",
        hintUz: "Yordam berish, rivojlantirish ma'nosi.",
      },
      {
        id: "syn-3",
        prompt: "ruhig",
        options: ["laut", "still", "schnell"],
        correctAnswer: "still",
        hintUz: "Shovqinsiz, tinch degan ma'no.",
      },
    ],
  },
  {
    id: "game-meaning",
    title: "Wort und Bedeutung",
    descriptionUz: "Nemischa so'zning to'g'ri ma'nosini toping.",
    type: "meaning",
    questions: [
      {
        id: "mean-1",
        prompt: "Was bedeutet 'sparen'?",
        options: ["kam ishlatmoq", "ko'paytirmoq", "yo'qotmoq"],
        correctAnswer: "kam ishlatmoq",
        hintUz: "Masalan: Zeit sparen.",
      },
      {
        id: "mean-2",
        prompt: "Was bedeutet 'teilnehmen'?",
        options: ["qatnashmoq", "boshlamoq", "tugatmoq"],
        correctAnswer: "qatnashmoq",
        hintUz: "Kurs yoki uchrashuvga borish ma'nosi.",
      },
      {
        id: "mean-3",
        prompt: "Was bedeutet 'Angebot'?",
        options: ["imkoniyat/taklif", "muammo", "savol"],
        correctAnswer: "imkoniyat/taklif",
        hintUz: "Kurs taklifi, chegirma taklifi kabi.",
      },
    ],
  },
  {
    id: "game-grammar",
    title: "Satzbau Spiel",
    descriptionUz: "Gapga mos so'zni tanlab, to'g'ri jumla tuzing.",
    type: "grammar",
    questions: [
      {
        id: "gram-1",
        prompt: "Ich ___ jeden Abend online Deutsch.",
        options: ["lerne", "lernen", "lernst"],
        correctAnswer: "lerne",
        hintUz: "Ich bilan fe'l odatda -e bilan keladi.",
      },
      {
        id: "gram-2",
        prompt: "Wir ___ morgen am Kurs teil.",
        options: ["nehmt", "nehme", "nehmen"],
        correctAnswer: "nehmen",
        hintUz: "Wir shakli uchun ko'plik fe'l ishlatiladi.",
      },
      {
        id: "gram-3",
        prompt: "Zu Hause ist es manchmal ___ laut.",
        options: ["sehr", "viel", "viele"],
        correctAnswer: "sehr",
        hintUz: "Sifat oldidan ko'pincha 'sehr' keladi.",
      },
    ],
  },
];

export const speakingPrompt: SpeakingPrompt = {
  id: "speaking-online-lernen",
  promptGerman:
    "Sprechen Sie ueber Online-Lernen. Was finden Sie gut und was ist schwierig?",
  guidanceUz:
    "Avval qisqa fikr ayting, keyin 1-2 ta yaxshi va 1-2 ta qiyin tomonni oddiy gaplarda tushuntiring.",
  sampleIdeasGerman: [
    "Online-Lernen spart Zeit.",
    "Zu Hause ist es manchmal zu laut.",
    "Ein Mix aus online und Schule ist fuer mich gut.",
    "Ich kann morgens oder abends flexibel lernen.",
    "Im Klassenzimmer kann ich schneller Fragen stellen.",
  ],
  suggestedDurationSec: 60,
};

export const speedReadingGame: SpeedReadingGame = {
  id: "speed-reading-stadt-land",
  title: "Speed Reading Pro: Stadt oder Land",
  textGerman:
    "Viele junge Menschen ziehen zuerst in die Stadt, weil es dort mehr Arbeit und viele Angebote gibt. In der Stadt kann man schnell einkaufen, Freunde treffen und verschiedene Kurse besuchen. Gleichzeitig ist das Leben oft teuer und laut. Auf dem Land ist es ruhiger, und die Natur ist nah. Viele Menschen fuehlen sich dort entspannter. Aber es gibt oft weniger Busse, und man braucht haeufig ein Auto. Deshalb waehlen manche Familien einen Kompromiss: Sie wohnen am Stadtrand oder in einem Dorf in der Naehe der Stadt. So nutzen sie die Vorteile von beiden Seiten.",
  guidanceUz:
    "Vaqtni tanlang, matnni maksimal tezlikda o'qing va tugagach Finish ni bosing. Maqsad: tezlik + tushunish.",
  durationOptionsSec: [45, 60, 90],
  comprehension: {
    id: "speed-q1",
    question: "Warum wohnen manche Familien am Stadtrand?",
    options: [
      "Weil sie nur Ruhe wollen und nie in die Stadt fahren.",
      "Weil sie Vorteile von Stadt und Land kombinieren moechten.",
      "Weil es dort keine Verkehrsmittel gibt.",
    ],
    correctAnswer: "Weil sie Vorteile von Stadt und Land kombinieren moechten.",
  },
};

export const wordScrambleGame: WordScrambleGame = {
  id: "word-scramble-stadt-land",
  title: "Word Scramble: Schnell tippen",
  guidanceUz:
    "Aralash harflarni to'g'ri so'zga aylantiring. Vaqtni o'zingiz tanlang va iloji boricha tez yozing.",
  words: [
    "Stadt",
    "Land",
    "Wohnung",
    "Mietpreis",
    "Nachbarschaft",
    "Arbeitsplatz",
    "Verkehr",
    "Bushaltestelle",
    "Krankenhaus",
    "Einkaufszentrum",
    "Umwelt",
    "Luftverschmutzung",
    "Erholung",
    "Sicherheit",
    "Gemeinschaft",
  ],
  durationOptionsSec: [30, 45, 60],
};
