export type TextCategorySlug =
  | "umwelt"
  | "bildung"
  | "arbeit"
  | "gesundheit"
  | "reisen"
  | "technologie";

export interface TextCategory {
  slug: TextCategorySlug;
  title: string;
  descriptionUz: string;
  icon: string;
}

export interface TextEntry {
  id: string;
  category: TextCategorySlug;
  title: string;
  level: "B1" | "B2";
  readingTimeMinutes: number;
  content: string;
}

export const textCategories: TextCategory[] = [
  { slug: "umwelt", title: "Umwelt", descriptionUz: "Atrof-muhit va ekologiya mavzulari", icon: "🌿" },
  { slug: "bildung", title: "Bildung", descriptionUz: "Ta'lim va o'qish tizimi mavzulari", icon: "📚" },
  { slug: "arbeit", title: "Arbeit", descriptionUz: "Ish, kasb va ish hayoti mavzulari", icon: "💼" },
  { slug: "gesundheit", title: "Gesundheit", descriptionUz: "Sog'liq va sog'lom turmush mavzulari", icon: "🩺" },
  { slug: "reisen", title: "Reisen", descriptionUz: "Sayohat va turizm mavzulari", icon: "✈️" },
  { slug: "technologie", title: "Technologie", descriptionUz: "Raqamli hayot va texnologiya mavzulari", icon: "💻" },
];

export const textEntries: TextEntry[] = [
  {
    id: "stadt-land-leben",
    category: "umwelt",
    title: "Leben in der Stadt und auf dem Land",
    level: "B1",
    readingTimeMinutes: 5,
    content:
      "Viele Menschen fragen sich, wo man besser leben kann: in der Stadt oder auf dem Land. In der Stadt gibt es mehr Verkehr, aber auch mehr Arbeitsplaetze. Auf dem Land ist die Luft oft sauberer und die Natur naeher. Viele Familien wuenschen sich Ruhe, aber sie brauchen auch gute Schulen und Krankenhaeuser. Deshalb ziehen manche Menschen an den Stadtrand.\n\nFuer die Zukunft ist wichtig, dass beide Regionen nachhaltig werden. In der Stadt braucht man mehr Gruenflaechen und weniger Autos. Auf dem Land braucht man bessere Busse und digitale Angebote. Wenn Politik und Gesellschaft zusammenarbeiten, kann die Lebensqualitaet in beiden Regionen steigen.",
  },
  {
    id: "muell-trennung-alltag",
    category: "umwelt",
    title: "Muelltrennung im Alltag",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "In vielen Haushalten ist Muelltrennung heute normal. Papier, Plastik, Glas und Restmuell kommen in verschiedene Tonnen. Das spart Ressourcen und hilft der Umwelt. Trotzdem machen viele Menschen noch Fehler, weil sie nicht genau wissen, welcher Abfall wohin gehoert.\n\nSchulen und Gemeinden bieten deshalb Informationskampagnen an. Dort lernt man mit einfachen Beispielen, wie Recycling funktioniert. Experten sagen, dass klare Regeln und gute Beschriftungen besonders wichtig sind. So koennen auch Kinder frueh lernen, verantwortungsvoll mit der Umwelt umzugehen.",
  },
  {
    id: "online-lernen-effektiv",
    category: "bildung",
    title: "Online lernen: effektiv oder schwierig?",
    level: "B1",
    readingTimeMinutes: 5,
    content:
      "Viele Lernende nutzen heute Online-Kurse. Sie koennen flexibel lernen und Zeit sparen. Besonders praktisch ist das fuer Menschen, die arbeiten oder Familie haben. Man kann Videos mehrfach anschauen und Aufgaben in eigenem Tempo loesen.\n\nAber es gibt auch Probleme. Nicht alle Lernenden haben gutes Internet oder einen ruhigen Arbeitsplatz. Ausserdem fehlt manchmal der direkte Kontakt zu Lehrkraeften. Deshalb empfehlen viele Schulen ein gemischtes Modell: ein Teil online, ein Teil im Klassenraum.",
  },
  {
    id: "sprachen-lernen-tipps",
    category: "bildung",
    title: "Sprachen lernen mit System",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Wer eine neue Sprache lernen moechte, braucht klare Ziele. Jeden Tag zehn bis fuenfzehn Minuten sind oft besser als einmal pro Woche zwei Stunden. Wichtig sind auch verschiedene Methoden: lesen, hoeren, sprechen und schreiben.\n\nViele Lernende machen gute Fortschritte, wenn sie ein Lerntagebuch fuehren. Dort notieren sie neue Woerter, Fehler und kleine Erfolge. So bleibt die Motivation hoch und man sieht, dass sich regelmaessiges Ueben lohnt.",
  },
  {
    id: "homeoffice-alltag",
    category: "arbeit",
    title: "Homeoffice und Produktivitaet",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Seit einigen Jahren ist Homeoffice in vielen Berufen normal geworden. Mitarbeitende sparen Zeit, weil sie nicht pendeln muessen. Unternehmen koennen flexibler arbeiten und digitale Werkzeuge besser nutzen.\n\nGleichzeitig sind klare Strukturen wichtig. Wer zu Hause arbeitet, sollte feste Arbeitszeiten und Pausen planen. Auch der Austausch im Team darf nicht fehlen. Regelmaessige Videokonferenzen helfen, Aufgaben besser zu koordinieren.",
  },
  {
    id: "bewerbung-gespraech",
    category: "arbeit",
    title: "Das Bewerbungsgespraech",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Ein Bewerbungsgespraech ist fuer viele Menschen stressig. Gute Vorbereitung hilft, sicherer zu wirken. Bewerberinnen und Bewerber sollten Informationen ueber die Firma sammeln und typische Fragen ueben.\n\nWichtig sind auch klare Beispiele aus der eigenen Erfahrung. Wer konkrete Situationen beschreibt, wirkt glaubwuerdig. Nach dem Gespraech kann eine kurze Dankesmail einen positiven Eindruck hinterlassen.",
  },
  {
    id: "gesunde-routine",
    category: "gesundheit",
    title: "Gesunde Routine im Alltag",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Viele Menschen moechten gesuender leben, wissen aber nicht, wo sie anfangen sollen. Kleine Schritte sind oft am besten: mehr Wasser trinken, regelmaessig spazieren gehen und genug schlafen.\n\nAuch psychische Gesundheit spielt eine wichtige Rolle. Kurze Pausen, weniger Stress und Zeit mit Freunden helfen, sich besser zu fuehlen. Experten empfehlen, auf den eigenen Koerper zu hoeren und realistische Ziele zu setzen.",
  },
  {
    id: "sport-und-motivation",
    category: "gesundheit",
    title: "Sport und Motivation",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Sport ist gut fuer den Koerper und den Kopf. Trotzdem faellt es vielen schwer, regelmaessig zu trainieren. Ein realistischer Plan hilft: zwei- bis dreimal pro Woche reicht oft aus.\n\nWer mit Freunden trainiert, bleibt haeufig motivierter. Auch kleine Ziele wie zehn Minuten Bewegung pro Tag koennen langfristig grosse Effekte haben. Wichtig ist, dass man eine Sportart findet, die wirklich Freude macht.",
  },
  {
    id: "nachhaltig-reisen",
    category: "reisen",
    title: "Nachhaltig reisen",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Reisen erweitert den Horizont, kann aber die Umwelt belasten. Deshalb achten immer mehr Menschen auf nachhaltige Optionen. Zugreisen sind oft klimafreundlicher als Kurzstreckenfluege. Auch lokale Unterkuenfte und regionale Produkte sind sinnvoll.\n\nViele Touristinnen und Touristen informieren sich heute vor der Reise ueber umweltfreundliche Angebote. So kann man neue Orte entdecken und gleichzeitig Verantwortung uebernehmen.",
  },
  {
    id: "reiseplanung-smart",
    category: "reisen",
    title: "Reiseplanung mit Apps",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Digitale Apps erleichtern die Reiseplanung. Man kann Fluege vergleichen, Hotels buchen und Routen speichern. Ausserdem helfen Uebersetzungs-Apps im Ausland bei einfachen Gespraechen.\n\nTrotz aller Technik sollte man wichtige Dokumente auch offline haben. Bei schlechtem Internet sind gespeicherte Tickets und Karten sehr hilfreich. Gute Vorbereitung spart Zeit und reduziert Stress.",
  },
  {
    id: "ki-im-alltag",
    category: "technologie",
    title: "Kuenstliche Intelligenz im Alltag",
    level: "B1",
    readingTimeMinutes: 5,
    content:
      "Kuenstliche Intelligenz wird in vielen Bereichen genutzt. Sie hilft bei Uebersetzungen, Navigation und personalisierten Empfehlungen. Auch in Schulen und Unternehmen spielen intelligente Systeme eine wachsende Rolle.\n\nTrotz vieler Vorteile gibt es offene Fragen zum Datenschutz und zur Fairness. Fachleute fordern deshalb klare Regeln. Nutzerinnen und Nutzer sollten verstehen, wie solche Systeme funktionieren.",
  },
  {
    id: "digitale-sicherheit",
    category: "technologie",
    title: "Digitale Sicherheit fuer alle",
    level: "B1",
    readingTimeMinutes: 4,
    content:
      "Im Internet teilen viele Menschen taeglich persoenliche Daten. Deshalb ist digitale Sicherheit sehr wichtig. Starke Passwoerter und Zwei-Faktor-Authentifizierung koennen Konten besser schuetzen.\n\nAuch Aufklaerung ist zentral. Wer Phishing-Nachrichten erkennt und vorsichtig mit Links umgeht, reduziert Risiken deutlich. Schulen und Firmen sollten regelmaessig Sicherheitstrainings anbieten.",
  },
];
