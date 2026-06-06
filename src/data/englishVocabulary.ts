export interface Flashcard {
  id: string;
  wordEs: string;
  wordEn: string;
  category: "caracteristicas" | "alimentacion" | "relacion" | "desplazamiento" | "nacimiento";
  example: string;
  icon: string;
}

export const englishVocabulary: Flashcard[] = [
  // Características
  { id: "e1", wordEs: "pico", wordEn: "beak", category: "caracteristicas", example: "A bird has a beak.", icon: "🐦" },
  { id: "e2", wordEs: "pelo", wordEn: "fur / hair", category: "caracteristicas", example: "A cat has fur.", icon: "🐈" },
  { id: "e3", wordEs: "patas", wordEn: "legs", category: "caracteristicas", example: "A cow has four legs.", icon: "🐄" },
  { id: "e4", wordEs: "plumas", wordEn: "feathers", category: "caracteristicas", example: "A bird has feathers.", icon: "🪶" },
  { id: "e5", wordEs: "cola", wordEn: "tail", category: "caracteristicas", example: "A dog has a tail.", icon: "🐕" },
  { id: "e6", wordEs: "alas", wordEn: "wings", category: "caracteristicas", example: "A butterfly has wings.", icon: "🦋" },
  { id: "e7", wordEs: "aletas", wordEn: "fins", category: "caracteristicas", example: "A fish has fins.", icon: "🐬" },
  { id: "e8", wordEs: "escamas", wordEn: "scales", category: "caracteristicas", example: "A snake has scales.", icon: "🐍" },
  
  // Alimentación
  { id: "e9", wordEs: "carnívoro", wordEn: "carnivore", category: "alimentacion", example: "A lion is a carnivore.", icon: "🥩" },
  { id: "e10", wordEs: "herbívoro", wordEn: "herbivore", category: "alimentacion", example: "A cow is a herbivore.", icon: "🌿" },
  { id: "e11", wordEs: "omnívoro", wordEn: "omnivore", category: "alimentacion", example: "A pig is an omnivore.", icon: "🍎" },

  // Relación
  { id: "e12", wordEs: "doméstico", wordEn: "domestic", category: "relacion", example: "A dog is a domestic animal.", icon: "🏠" },
  { id: "e13", wordEs: "salvaje", wordEn: "wild", category: "relacion", example: "A tiger is a wild animal.", icon: "🌲" },

  // Desplazamiento
  { id: "e14", wordEs: "caminar", wordEn: "walk", category: "desplazamiento", example: "A horse can walk.", icon: "🚶" },
  { id: "e15", wordEs: "volar", wordEn: "fly", category: "desplazamiento", example: "A bird can fly.", icon: "🦅" },
  { id: "e16", wordEs: "nadar", wordEn: "swim", category: "desplazamiento", example: "A fish can swim.", icon: "🐟" },
  { id: "e17", wordEs: "reptar", wordEn: "crawl", category: "desplazamiento", example: "A snake can crawl.", icon: "🐛" },

  // Nacimiento
  { id: "e18", wordEs: "huevo", wordEn: "egg", category: "nacimiento", example: "A chicken comes from an egg.", icon: "🥚" },
  { id: "e19", wordEs: "vientre", wordEn: "womb", category: "nacimiento", example: "Mammals grow in a womb.", icon: "🤰" },
  { id: "e20", wordEs: "ovíparo", wordEn: "oviparous", category: "nacimiento", example: "A frog is oviparous.", icon: "🐸" },
  { id: "e21", wordEs: "vivíparo", wordEn: "viviparous", category: "nacimiento", example: "A bear is viviparous.", icon: "🐻" },
];
