import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Exercise } from '../data/exerciseGenerators';
import { useSpeech } from '../hooks/useSpeech';
import confetti from 'canvas-confetti';
import { Volume2 } from 'lucide-react';
import { playSuccessSound, playErrorSound, playPopSound } from '../utils/audio';

interface Props {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const SHAPES = [
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-16 md:h-16"><polygon points="12,2 22,22 2,22" /></svg>,
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-16 md:h-16"><polygon points="12,2 22,12 12,22 2,12" /></svg>,
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-16 md:h-16"><circle cx="12" cy="12" r="10" /></svg>,
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-16 md:h-16"><rect x="3" y="3" width="18" height="18" /></svg>
];

const COLORS = [
  'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:bg-red-700 shadow-red-900',
  'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 shadow-blue-900',
  'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:bg-yellow-600 shadow-yellow-800',
  'bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-700 shadow-green-900'
];

export function KahootRenderer({ exercise, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimeout, setIsTimeout] = useState(false);
  const { speak } = useSpeech();

  useEffect(() => {
    setTimeLeft(20);
    setIsTimeout(false);
    setSelected(null);
    setHasError(false);
    setAttempts(0);
    setIsCorrect(false);
  }, [exercise]);

  // Handle timer
  useEffect(() => {
    if (isCorrect || hasError || isTimeout) return;
    
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isCorrect, hasError, isTimeout]);

  const handleTimeout = () => {
    setIsTimeout(true);
    playErrorSound();
    speak("Se acabó el tiempo.");
    setTimeout(() => {
      onComplete(false);
    }, 3000);
  };

  const handleSelect = (option: string) => {
    if (isCorrect || isTimeout) return;
    
    setSelected(option);
    
    if (option === exercise.correctAnswer) {
      setIsCorrect(true);
      playSuccessSound();
      confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.5 },
        colors: ['#26890C', '#1368CE', '#D89E00', '#E21B3C']
      });
      speak("¡Correcto!");
      setTimeout(() => {
        onComplete(attempts === 0);
      }, 3000); // Give user enough time to see the answer and effect
    } else {
      setHasError(true);
      setAttempts(prev => prev + 1);
      playErrorSound();
      speak("Prueba otra vez, no pasa nada.");
      setTimeout(() => {
        setHasError(false);
        setSelected(null);
      }, 1500);
    }
  };

  const readAloud = () => {
    playPopSound();
    const lang = exercise.question.includes('mean') ? 'en-US' : 'es-ES';
    speak(exercise.question, lang);
  };

  return (
    <motion.div 
      className="w-full flex-1 flex flex-col justify-between"
      animate={{ x: hasError ? [-15, 15, -15, 15, 0] : 0 }} 
      transition={{ duration: 0.4 }}
    >
      {/* Question Header */}
      <div className="bg-white rounded-[2rem] p-6 md:p-12 mb-6 shadow-xl flex flex-col items-center relative z-10 border-8 border-gray-100 min-h-[160px] justify-center overflow-hidden">
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 2 }}
            className="absolute inset-0 bg-green-500 rounded-full z-0 pointer-events-none"
          />
        )}
        
        <div className={`absolute top-4 left-4 ${timeLeft <= 5 ? 'bg-red-600 border-red-800 animate-pulse' : 'bg-purple-600 border-purple-800'} text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center font-extrabold text-2xl md:text-3xl shadow-lg border-4 z-20 transition-colors`}>
          {timeLeft}
        </div>

        <button onClick={readAloud} className="absolute top-4 right-4 p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-300 active:scale-95 transition-transform z-20">
           <Volume2 className="w-8 h-8" />
        </button>
        {exercise.image && (
          <div className="text-8xl mb-6 bg-gray-50 rounded-full w-40 h-40 flex items-center justify-center border-4 border-gray-200 shadow-inner z-10 relative">
            {exercise.image}
          </div>
        )}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center text-gray-800 leading-snug z-10 relative px-12 mt-8 md:mt-2">
          {exercise.question}
        </h2>
      </div>

      {/* 4-Square Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
        {exercise.options.map((option, i) => {
          const isSelected = selected === option;
          const isWaiting = selected !== null && !isCorrect && !isSelected;
          
          return (
            <motion.button
              key={i}
              whileTap={!selected ? { scale: 0.95 } : undefined}
              className={`
                relative flex items-center px-6 py-8 md:py-12 rounded-3xl shadow-[0_8px_0_var(--tw-shadow-color)] transition-all
                ${COLORS[i % COLORS.length]} text-white border-4 border-black/10 overflow-hidden
                ${isWaiting ? 'opacity-50 grayscale pointer-events-none' : ''}
                ${isCorrect && !isSelected ? 'opacity-30 grayscale pointer-events-none' : ''}
                ${isCorrect && isSelected ? 'ring-8 ring-white scale-[1.02] z-20' : ''}
              `}
              onClick={() => {
                if (!selected) playPopSound();
                handleSelect(option);
              }}
              disabled={selected !== null}
            >
              <div className="mr-6 shrink-0 opacity-90 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                {SHAPES[i % SHAPES.length]}
              </div>
              <span className="text-3xl md:text-5xl font-extrabold text-left leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex-1 break-words">
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Screen Overlay for Feedback */}
      <AnimatePresence>
        {isTimeout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-purple-600/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <div className="text-[10rem] text-white leading-none drop-shadow-2xl">⏳</div>
            <h2 className="text-5xl md:text-7xl text-white font-extrabold mt-4 text-center px-4 drop-shadow-xl">¡Se acabó el tiempo!</h2>
          </motion.div>
        )}
        {hasError && !isTimeout && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-red-600/90 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <div className="text-[15rem] text-white leading-none drop-shadow-2xl">✖</div>
            <h2 className="text-5xl md:text-7xl text-white font-extrabold mt-4 text-center px-4 drop-shadow-xl">¡Ayyy!</h2>
          </motion.div>
        )}
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-green-500/95 flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <div className="text-[15rem] text-white leading-none drop-shadow-2xl">✔</div>
            <h2 className="text-5xl md:text-7xl text-white font-extrabold mt-4 text-center px-4 drop-shadow-xl">¡Correcto!</h2>
            <p className="text-3xl md:text-4xl text-green-50 font-bold mt-8 px-12 text-center bg-black/20 py-6 rounded-[2rem] max-w-4xl mx-auto shadow-inner">{exercise.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
