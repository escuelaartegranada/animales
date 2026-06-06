import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Exercise } from '../data/exerciseGenerators';
import { Button, Card } from './ui';
import { useSpeech } from '../hooks/useSpeech';
import confetti from 'canvas-confetti';
import { Volume2 } from 'lucide-react';
import { playSuccessSound, playErrorSound, playPopSound } from '../utils/audio';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export function ExerciseRenderer({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const { speak } = useSpeech();

  const handleSelect = (option: string) => {
    if (isCorrect) return; // Already solved
    
    setSelected(option);
    
    if (option === exercise.correctAnswer) {
      setIsCorrect(true);
      playSuccessSound();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#3b82f6', '#facc15', '#a855f7']
      });
      speak("¡Muy bien!");
      setTimeout(() => {
        onComplete(attempts === 0);
        resetState();
      }, 2500);
    } else {
      setHasError(true);
      setAttempts(prev => prev + 1);
      playErrorSound();
      speak("Prueba otra vez, estás muy cerca.");
      setTimeout(() => {
        setHasError(false);
        setSelected(null);
      }, 1500);
    }
  };

  const resetState = () => {
    setSelected(null);
    setHasError(false);
    setAttempts(0);
    setIsCorrect(false);
  };

  const readAloud = () => {
    playPopSound();
    const lang = exercise.world === 'english' ? (exercise.question.includes('What does') ? 'en-US' : 'es-ES') : 'es-ES';
    speak(exercise.question, lang);
  };

  return (
    <motion.div 
      animate={{ x: hasError ? [-10, 10, -10, 10, 0] : 0 }} 
      transition={{ duration: 0.4 }}
      className="w-full flex justify-center"
    >
      <Card className="w-full max-w-2xl mx-auto flex flex-col items-center relative overflow-hidden">
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 2 }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          </motion.div>
        )}
        {hasError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full bg-red-500"></div>
          </motion.div>
        )}

        <div className="w-full flex justify-end mb-4 relative z-10">
           <button onClick={readAloud} className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 active:scale-95 transition-transform">
             <Volume2 className="w-8 h-8" />
           </button>
        </div>

        {exercise.image && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl mb-6 relative z-10 drop-shadow-md">
            {exercise.image}
          </motion.div>
        )}

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 leading-snug relative z-10">
          {exercise.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full relative z-10">
          {exercise.options.map((option, i) => {
            const isSelected = selected === option;
            let btnVariant: any = 'ghost';
            if (isSelected) {
              btnVariant = isCorrect ? 'success' : 'danger';
            }

            return (
              <Button 
                key={i} 
                variant={btnVariant as any} 
                onClick={() => {
                  if (!isSelected && selected === null) playPopSound();
                  handleSelect(option);
                }}
                disabled={selected !== null && !isCorrect && isSelected}
                className={`min-h-[80px] text-2xl bg-gray-50 border-gray-200 border-4 shadow-none ${isCorrect && !isSelected ? 'opacity-30' : ''}`}
              >
                {option}
              </Button>
            );
          })}
        </div>

        <AnimatePresence>
          {isCorrect && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-8 p-6 bg-green-100 rounded-2xl w-full text-center border-4 border-green-300 relative z-10 shadow-lg"
            >
              <div className="text-5xl mb-2">✨</div>
              <p className="text-2xl font-bold text-green-800 mb-2">¡Genial!</p>
              <p className="text-xl text-green-700 font-medium">{exercise.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
