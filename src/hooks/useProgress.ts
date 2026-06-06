import { useState, useEffect } from 'react';

export interface ProgressData {
  stars: number;
  unlockedAnimals: string[];
  medals: string[];
  completedExercisesByWorld: Record<string, number>;
  totalCorrect: number;
  totalIncorrect: number;
}

const defaultProgress: ProgressData = {
  stars: 0,
  unlockedAnimals: [],
  medals: [],
  completedExercisesByWorld: {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    'english': 0
  },
  totalCorrect: 0,
  totalIncorrect: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const stored = localStorage.getItem('animalia_progress');
      return stored ? JSON.parse(stored) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem('animalia_progress', JSON.stringify(progress));
  }, [progress]);

  const addStars = (amount: number) => {
    setProgress(prev => ({ ...prev, stars: prev.stars + amount }));
  };

  const unlockAnimal = (animalId: string) => {
    setProgress(prev => {
      if (prev.unlockedAnimals.includes(animalId)) return prev;
      return { ...prev, unlockedAnimals: [...prev.unlockedAnimals, animalId] };
    });
  };

  const awardMedal = (medalId: string) => {
    setProgress(prev => {
      if (prev.medals.includes(medalId)) return prev;
      return { ...prev, medals: [...prev.medals, medalId] };
    });
  };

  const logExerciseResult = (world: string, correct: boolean) => {
    setProgress(prev => {
      const newCompleted = { ...prev.completedExercisesByWorld };
      if (correct) {
        newCompleted[world] = (newCompleted[world] || 0) + 1;
      }
      return {
        ...prev,
        completedExercisesByWorld: newCompleted,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        totalIncorrect: prev.totalIncorrect + (!correct ? 1 : 0),
      };
    });
  };

  const resetProgress = () => setProgress(defaultProgress);

  return {
    progress,
    addStars,
    unlockAnimal,
    awardMedal,
    logExerciseResult,
    resetProgress
  };
}
