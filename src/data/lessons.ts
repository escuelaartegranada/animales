export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
  image: string; // Emoji representing the lesson
  miniQuestion: {
    question: string;
    options: string[];
    correctAnswer: string;
  };
}

export const lessonsData: Lesson[] = [
  {
    id: "caracteristicas",
    title: "Características de los animales",
    explanation: "Los animales tienen cuerpos diferentes. Algunos tienen pico, otros pelo, otros plumas, otros escamas, otros alas, otros aletas, otros patas y otros cola.",
    examples: [
      "El pájaro tiene pico, alas y plumas.",
      "El pez tiene aletas y escamas.",
      "El perro tiene pelo, patas y cola.",
      "La serpiente tiene escamas y repta."
    ],
    image: "🐾",
    miniQuestion: {
      question: "¿Qué animal tiene alas y plumas?",
      options: ["El perro", "El pájaro", "El pez"],
      correctAnswer: "El pájaro"
    }
  },
  {
    id: "desplazamiento",
    title: "Cómo se desplazan",
    explanation: "Los animales se mueven de diferentes formas. Algunos caminan, otros vuelan, otros nadan y otros reptan.",
    examples: [
      "El perro camina.",
      "El pájaro vuela.",
      "El pez nada.",
      "La serpiente repta.",
      "La rana puede saltar y nadar."
    ],
    image: "🏃‍♀️",
    miniQuestion: {
      question: "¿Cómo se mueve una serpiente?",
      options: ["Vuela", "Nada", "Repta"],
      correctAnswer: "Repta"
    }
  },
  {
    id: "nacimiento",
    title: "Cómo nacen",
    explanation: "Algunos animales nacen del vientre de su madre. Se llaman vivíparos. Otros animales nacen de huevos. Se llaman ovíparos.",
    examples: [
      "El perro es vivíparo.",
      "El gato es vivíparo.",
      "La gallina es ovípara.",
      "El pájaro es ovíparo.",
      "La tortuga es ovípara."
    ],
    image: "🥚",
    miniQuestion: {
      question: "¿Cómo llamamos a los animales que nacen de huevos?",
      options: ["Vivíparos", "Ovíparos", "Divertidos"],
      correctAnswer: "Ovíparos"
    }
  },
  {
    id: "alimentacion",
    title: "Qué comen",
    explanation: "Los animales comen cosas diferentes.\n- Carnívoros: comen otros animales.\n- Herbívoros: comen plantas, frutos o semillas.\n- Omnívoros: comen plantas y también otros animales.",
    examples: [
      "El león es carnívoro.",
      "La vaca es herbívora.",
      "El cerdo es omnívoro.",
      "La gallina es omnívora.",
      "El conejo es herbívoro."
    ],
    image: "🍃",
    miniQuestion: {
      question: "Si una vaca come hierba, ¿qué es?",
      options: ["Carnívora", "Herbívora", "Omnívora"],
      correctAnswer: "Herbívora"
    }
  },
  {
    id: "relacion",
    title: "Domésticos y salvajes",
    explanation: "Algunos animales viven cerca de las personas y pueden recibir cuidados. Son domésticos. Otros animales viven en la naturaleza. Son salvajes.",
    examples: [
      "El perro es doméstico.",
      "El gato es doméstico.",
      "La vaca es doméstica.",
      "El tigre es salvaje.",
      "El león es salvaje.",
      "La jirafa es salvaje."
    ],
    image: "🏡",
    miniQuestion: {
      question: "¿Qué animal es un animal salvaje?",
      options: ["El perro", "El gato", "El león"],
      correctAnswer: "El león"
    }
  }
];
