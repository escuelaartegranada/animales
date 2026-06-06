import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { allExercises, Exercise } from '../data/exerciseGenerators';
import { englishVocabulary } from '../data/englishVocabulary';
import { useProgress } from '../hooks/useProgress';
import { KahootRenderer } from '../components/KahootRenderer';
import { useSpeech } from '../hooks/useSpeech';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EnglishCorner() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'menu' | 'flashcards' | 'games'>('menu');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [exercises] = useState<Exercise[]>(allExercises.english);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  const { progress, addStars, logExerciseResult, awardMedal } = useProgress();
  const { speak } = useSpeech();

  const handleFlashcards = () => setMode('flashcards');
  const handleGames = () => setMode('games');
  const handleBack = () => {
    if (mode === 'menu') navigate('/');
    else setMode('menu');
  };

  const handleComplete = (isFirstTry: boolean) => {
    addStars(isFirstTry ? 10 : 5);
    logExerciseResult('english', true);
    
    // Check medals
    const countCompleted = (progress.completedExercisesByWorld['english'] || 0) + 1;
    if (countCompleted === 10) awardMedal('english-10');
    if (countCompleted === 50) awardMedal('english-50');
    if (countCompleted === 100) awardMedal('english-100');

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setCurrentExerciseIndex(0);
    }
  };

  if (mode === 'flashcards') {
    const card = englishVocabulary[currentFlashcardIndex];
    return (
      <div className="min-h-[100dvh] bg-purple-50 p-4 flex flex-col items-center">
        <div className="w-full max-w-2xl flex justify-between mb-8">
          <Button variant="ghost" onClick={handleBack} icon={ChevronLeft}>Volver</Button>
          <div className="text-xl font-bold text-purple-800">{currentFlashcardIndex + 1} / {englishVocabulary.length}</div>
        </div>

        <div className="flex-1 w-full max-w-2xl flex flex-col justify-center relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={card.id}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               className="bg-white rounded-[3rem] shadow-2xl p-12 text-center border-[6px] border-purple-200"
             >
               <span className="text-9xl mb-8 block">{card.icon}</span>
               <h2 className="text-6xl font-extrabold text-gray-800 mb-2">{card.wordEn}</h2>
               <p className="text-3xl text-gray-500 mb-12">{card.wordEs}</p>
               
               <p className="text-2xl text-purple-700 font-medium mb-8 bg-purple-50 p-6 rounded-2xl">
                 "{card.example}"
               </p>

               <Button size="lg" variant="secondary" onClick={() => speak(card.wordEn, 'en-US')} icon={Volume2}>
                 Escuchar en Inglés
               </Button>
             </motion.div>
           </AnimatePresence>
        </div>

        <div className="w-full max-w-2xl flex gap-4 mt-8">
           <Button 
             variant="ghost" 
             fullWidth 
             disabled={currentFlashcardIndex === 0} 
             onClick={() => setCurrentFlashcardIndex(prev => prev - 1)}
           >
             Anterior
           </Button>
           <Button 
             variant="primary" 
             fullWidth 
             disabled={currentFlashcardIndex === englishVocabulary.length - 1} 
             onClick={() => setCurrentFlashcardIndex(prev => prev + 1)}
           >
             Siguiente
           </Button>
        </div>
      </div>
    );
  }

  if (mode === 'games') {
    return (
      <div className="min-h-[100dvh] bg-purple-50 p-4 md:p-8 flex flex-col">
        <div className="flex justify-between items-center mb-8 max-w-5xl mx-auto w-full relative z-10">
          <Button variant="ghost" onClick={handleBack} icon={ChevronLeft}>Volver</Button>
          <div className="bg-white/80 px-6 py-2 rounded-full font-bold text-gray-700 shadow-sm border-2 border-white">
            Ejercicios resueltos: {progress.completedExercisesByWorld['english'] || 0}/100
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full relative z-10">
           <KahootRenderer exercise={exercises[currentExerciseIndex]} onComplete={handleComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-purple-50 p-4">
      <div className="max-w-4xl mx-auto flex flex-col h-full">
        <Button variant="ghost" onClick={handleBack} icon={ChevronLeft} className="mb-8 self-start">Inicio</Button>
        <h1 className="text-5xl font-bold text-purple-800 text-center mb-12 flex items-center justify-center gap-4">
          <span className="text-6xl">🇬🇧</span> English Corner
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 content-center">
          <Card onClick={handleFlashcards} className="bg-white border-4 border-indigo-200 hover:border-indigo-400 p-12 text-center h-[300px] flex flex-col items-center justify-center">
            <span className="text-7xl mb-4 text-indigo-500">🎴</span>
            <h2 className="text-4xl font-bold text-indigo-800 mb-2">Flashcards</h2>
            <p className="text-xl text-indigo-600">Aprende nuevas palabras</p>
          </Card>

          <Card onClick={handleGames} className="bg-white border-4 border-fuchsia-200 hover:border-fuchsia-400 p-12 text-center h-[300px] flex flex-col items-center justify-center">
            <span className="text-7xl mb-4 text-fuchsia-500">🎮</span>
            <h2 className="text-4xl font-bold text-fuchsia-800 mb-2">Juegos en Inglés</h2>
            <p className="text-xl text-fuchsia-600">Practica lo que sabes</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
