import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { ExerciseRenderer } from '../components/ExerciseRenderer';
import { allExercises, Exercise } from '../data/exerciseGenerators';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FinalReview() {
  const navigate = useNavigate();
  const [reviewExercises, setReviewExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { addStars } = useProgress();

  useEffect(() => {
    // Generate 20 questions mix: 4 from each world 1-5
    const getSample = (arr: Exercise[], num: number) => {
      const copy = [...arr].sort(() => 0.5 - Math.random());
      return copy.slice(0, num);
    };

    const mix = [
      ...getSample(allExercises.world1, 4),
      ...getSample(allExercises.world2, 4),
      ...getSample(allExercises.world3, 4),
      ...getSample(allExercises.world4, 4),
      ...getSample(allExercises.world5, 4),
    ];
    setReviewExercises(mix.sort(() => 0.5 - Math.random()));
  }, []);

  const handleComplete = (isFirstTry: boolean) => {
    if (isFirstTry) {
      setCorrectAnswers(prev => prev + 1);
      addStars(10);
    } else {
      addStars(5);
    }

    if (currentIndex < reviewExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      if (correctAnswers > 15) {
        confetti({ particleCount: 300, spread: 200, colors: ['#facc15', '#4ade80', '#60a5fa'] });
      } else {
        confetti({ particleCount: 100, spread: 100 });
      }
    }
  };

  if (isFinished) {
    let message = "";
    if (correctAnswers === 20) message = "¡Eres una Súper Experta en Animales! ¡Perfecto!";
    else if (correctAnswers >= 15) message = "¡Lo has hecho genial! Estás súper preparada.";
    else if (correctAnswers >= 10) message = "¡Muy bien! Repasa un poquito y serás experta.";
    else message = "¡Buen esfuerzo! Vuelve a leer las lecciones para mejorar.";

    return (
      <div className="min-h-[100dvh] bg-blue-50 p-4 flex flex-col items-center justify-center">
        <Card className="max-w-2xl w-full text-center p-12">
          <div className="text-8xl mb-8">🏆</div>
          <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Repaso Finalizado</h1>
          <p className="text-2xl font-bold text-gray-700 mb-8">
            Has acertado a la primera: <span className="text-green-500 text-4xl block mt-2">{correctAnswers} / 20</span>
          </p>
          <div className="bg-blue-100 p-6 rounded-2xl mb-8 text-xl text-blue-800 font-medium border-4 border-blue-200">
            {message}
          </div>
          <Button size="lg" fullWidth onClick={() => navigate('/')}>Volver al Inicio</Button>
        </Card>
      </div>
    );
  }

  if (reviewExercises.length === 0) return <div>Cargando...</div>;

  return (
    <div className="min-h-[100dvh] bg-blue-50 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto w-full">
        <Button variant="ghost" onClick={() => navigate('/')} icon={ChevronLeft}>Salir del Repaso</Button>
        <div className="bg-white/80 px-6 py-2 rounded-full font-bold text-blue-700 shadow-sm border-2 border-white">
          Pregunta: {currentIndex + 1} / 20
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
         <ExerciseRenderer exercise={reviewExercises[currentIndex]} onComplete={handleComplete} />
      </div>
    </div>
  );
}
