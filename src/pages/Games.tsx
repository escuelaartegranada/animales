import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { allExercises, Exercise } from '../data/exerciseGenerators';
import { useProgress } from '../hooks/useProgress';
import { ExerciseRenderer } from '../components/ExerciseRenderer';
import { ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const worlds = [
  { id: '1', title: 'Detectives del cuerpo', color: 'bg-blue-100', text: 'text-blue-800' },
  { id: '2', title: 'Carrera de movimientos', color: 'bg-green-100', text: 'text-green-800' },
  { id: '3', title: 'Huevos y vientres', color: 'bg-yellow-100', text: 'text-yellow-800' },
  { id: '4', title: 'El menú animal', color: 'bg-orange-100', text: 'text-orange-800' },
  { id: '5', title: 'Casa o naturaleza', color: 'bg-purple-100', text: 'text-purple-800' },
];

export function Games() {
  const navigate = useNavigate();
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { progress, addStars, logExerciseResult, awardMedal } = useProgress();

  const handleWorldSelect = (worldId: string) => {
    setSelectedWorld(worldId);
    setExercises(allExercises[`world${worldId}` as keyof typeof allExercises]);
    setCurrentExerciseIndex(0);
  };

  const handleComplete = (isFirstTry: boolean) => {
    addStars(isFirstTry ? 10 : 5);
    logExerciseResult(selectedWorld!, true);
    
    const countCompleted = (progress.completedExercisesByWorld[selectedWorld!] || 0) + 1;
    
    if (countCompleted === 10) {
      awardMedal(`medalla-peq-${selectedWorld}`);
      confetti({ particleCount: 200, spread: 100 });
    } else if (countCompleted === 50) {
      awardMedal(`medalla-gra-${selectedWorld}`);
      confetti({ particleCount: 200, spread: 100 });
    } else if (countCompleted === 100) {
      awardMedal(`insignia-${selectedWorld}`);
      confetti({ particleCount: 300, spread: 160 });
    }

    // Go to next exercise
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Loop or stop
      setCurrentExerciseIndex(0);
    }
  };

  if (selectedWorld) {
    const currentExercise = exercises[currentExerciseIndex];
    const worldInfo = worlds.find(w => w.id === selectedWorld);
    const exercisesCompleted = progress.completedExercisesByWorld[selectedWorld] || 0;

    return (
      <div className={`min-h-[100dvh] ${worldInfo?.color} p-4 flex flex-col`}>
        <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
          <Button variant="ghost" onClick={() => setSelectedWorld(null)} icon={ChevronLeft}>Volver</Button>
          <div className="bg-white/80 px-6 py-2 rounded-full font-bold text-gray-700 shadow-sm border-2 border-white">
            Ejercicios resueltos: {exercisesCompleted}/100
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
           <h1 className={`text-4xl font-bold text-center mb-12 ${worldInfo?.text}`}>{worldInfo?.title}</h1>
           <ExerciseRenderer exercise={currentExercise} onComplete={handleComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} icon={ChevronLeft} className="mb-8">Inicio</Button>
        <h1 className="text-5xl font-bold text-orange-800 text-center mb-12">Juegos y ejercicios</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worlds.map(w => (
            <Card key={w.id} onClick={() => handleWorldSelect(w.id)} className={`${w.color} border-4 border-transparent hover:border-orange-300 flex flex-col items-center justify-center p-12`}>
              <h2 className={`text-3xl font-extrabold ${w.text} text-center`}>{w.title}</h2>
              <p className="mt-4 font-bold text-gray-700 opacity-70 border-t pt-4 border-gray-300 border-opacity-30">
                {progress.completedExercisesByWorld[w.id] || 0} resueltos
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
