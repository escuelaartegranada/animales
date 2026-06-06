import { animals, Animal } from './animals';
import { englishVocabulary } from './englishVocabulary';

export type ExerciseType = 'multiple-choice' | 'true-false' | 'odd-one-out';

export interface Exercise {
  id: string;
  world: string;
  type: ExerciseType;
  question: string;
  image?: string; 
  options: string[]; 
  correctAnswer: string;
  explanation: string;
  difficulty: "fácil" | "medio" | "reto";
  points: number;
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function getRandomAnimals(count: number, condition?: (a: Animal) => boolean): Animal[] {
  let filtered = condition ? animals.filter(condition) : animals;
  return shuffle([...filtered]).slice(0, count);
}

let exerciseIdCounter = 0;
function nextId() { return `ex_${++exerciseIdCounter}`; }

export function generateWorld1Exercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const parts = ['pico', 'pelo', 'patas', 'plumas', 'cola', 'alas', 'aletas', 'escamas'];
  
  for (let i = 0; i < 100; i++) {
    const part = parts[i % parts.length];
    const withPart = getRandomAnimals(1, a => a.caracteristicas.includes(part as any))[0];
    const withoutPart = getRandomAnimals(2, a => !a.caracteristicas.includes(part as any));
    if (!withPart || withoutPart.length < 2) continue;

    exercises.push({
      id: nextId(),
      world: '1',
      type: 'multiple-choice',
      question: `¿Qué animal tiene ${part}?`,
      options: shuffle([withPart.nombre, withoutPart[0].nombre, withoutPart[1].nombre]),
      correctAnswer: withPart.nombre,
      explanation: withPart.explicacionInfantil,
      difficulty: 'fácil',
      points: 10
    });
  }
  return exercises;
}

export function generateWorld2Exercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const movements = ['camina', 'vuela', 'nada', 'repta', 'salta'];
  
  for (let i = 0; i < 100; i++) {
    const move = movements[i % movements.length];
    const matching = getRandomAnimals(1, a => a.desplazamiento.includes(move as any))[0];
    const nonMatching = getRandomAnimals(2, a => !a.desplazamiento.includes(move as any));
    if (!matching || nonMatching.length < 2) continue;

    exercises.push({
      id: nextId(),
      world: '2',
      type: 'multiple-choice',
      question: `¿Qué animal ${move}?`,
      options: shuffle([matching.nombre, nonMatching[0].nombre, nonMatching[1].nombre]),
      correctAnswer: matching.nombre,
      explanation: matching.explicacionInfantil,
      difficulty: 'fácil',
      points: 10
    });
  }
  return exercises;
}

export function generateWorld3Exercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const births = ['ovíparo', 'vivíparo'];
  
  for (let i = 0; i < 100; i++) {
    const type = births[i % births.length];
    const questionText = type === 'ovíparo' ? 'nace de un huevo (es ovíparo)' : 'nace del vientre de su madre (es vivíparo)';
    const animal = getRandomAnimals(1, a => a.nacimiento === type)[0];
    const others = getRandomAnimals(2, a => a.nacimiento !== type);
    if (!animal || others.length < 2) continue;

    exercises.push({
      id: nextId(),
      world: '3',
      type: 'multiple-choice',
      question: `¿Qué animal ${questionText}?`,
      options: shuffle([animal.nombre, others[0].nombre, others[1].nombre]),
      correctAnswer: animal.nombre,
      explanation: animal.explicacionInfantil,
      difficulty: 'medio',
      points: 10
    });
  }
  return exercises;
}

export function generateWorld4Exercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const diets = ['carnívoro', 'herbívoro', 'omnívoro'];
  
  for (let i = 0; i < 100; i++) {
    const type = diets[i % diets.length];
    let foodText = '';
    if (type === 'carnívoro') foodText = 'carne (otros animales)';
    if (type === 'herbívoro') foodText = 'plantas o hierba';
    if (type === 'omnívoro') foodText = 'de todo (plantas y animales)';

    const animal = getRandomAnimals(1, a => a.alimentacion === type)[0];
    const others = getRandomAnimals(2, a => a.alimentacion !== type);
    if (!animal || others.length < 2) continue;

    exercises.push({
      id: nextId(),
      world: '4',
      type: 'multiple-choice',
      question: `¿Qué animal come ${foodText}? (${type})`,
      options: shuffle([animal.nombre, others[0].nombre, others[1].nombre]),
      correctAnswer: animal.nombre,
      explanation: animal.explicacionInfantil,
      difficulty: 'medio',
      points: 10
    });
  }
  return exercises;
}

export function generateWorld5Exercises(): Exercise[] {
  const exercises: Exercise[] = [];
  const roles = ['doméstico', 'salvaje'];
  
  for (let i = 0; i < 100; i++) {
    const role = roles[i % roles.length];
    const text = role === 'doméstico' ? 'puede vivir con nosotros o en una granja (doméstico)' : 'vive libre en la naturaleza (salvaje)';
    const animal = getRandomAnimals(1, a => a.relacion === role)[0];
    const others = getRandomAnimals(2, a => a.relacion !== role);
    if (!animal || others.length < 2) continue;

    exercises.push({
      id: nextId(),
      world: '5',
      type: 'multiple-choice',
      question: `¿Qué animal ${text}?`,
      options: shuffle([animal.nombre, others[0].nombre, others[1].nombre]),
      correctAnswer: animal.nombre,
      explanation: animal.explicacionInfantil,
      difficulty: 'fácil',
      points: 10
    });
  }
  return exercises;
}

export function generateEnglishExercises(): Exercise[] {
  const exercises: Exercise[] = [];
  for (let i = 0; i < 100; i++) {
    const word = englishVocabulary[i % englishVocabulary.length];
    const others = shuffle(englishVocabulary.filter(w => w.id !== word.id)).slice(0, 3);
    
    // Mix questions (English to Spanish, Spanish to English)
    if (i % 2 === 0) {
      exercises.push({
        id: nextId(),
        world: 'english',
        type: 'multiple-choice',
        question: `¿Qué significa "${word.wordEn}"?`,
        options: shuffle([word.wordEs, others[0].wordEs, others[1].wordEs, others[2].wordEs]),
        correctAnswer: word.wordEs,
        explanation: `${word.example} (${word.wordEs})`,
        image: word.icon,
        difficulty: 'medio',
        points: 10
      });
    } else {
      exercises.push({
        id: nextId(),
        world: 'english',
        type: 'multiple-choice',
        question: `¿Cómo se dice "${word.wordEs}" en inglés?`,
        options: shuffle([word.wordEn, others[0].wordEn, others[1].wordEn, others[2].wordEn]),
        correctAnswer: word.wordEn,
        explanation: `${word.example} (${word.wordEs})`,
        image: word.icon,
        difficulty: 'medio',
        points: 10
      });
    }
  }
  return exercises;
}

export const allExercises = {
  world1: generateWorld1Exercises(),
  world2: generateWorld2Exercises(),
  world3: generateWorld3Exercises(),
  world4: generateWorld4Exercises(),
  world5: generateWorld5Exercises(),
  english: generateEnglishExercises(),
};
