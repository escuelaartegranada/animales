import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, AnimalCard } from '../components/ui';
import { lessonsData } from '../data/lessons';
import { animals } from '../data/animals';
import { useSpeech } from '../hooks/useSpeech';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft, Volume2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playErrorSound, playPopSound } from '../utils/audio';

export function Lessons() {
  const navigate = useNavigate();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const { speak, stop } = useSpeech();
  const { addStars } = useProgress();

  const handleLessonSelect = (id: string) => {
    playPopSound();
    setSelectedLessonId(id);
  };

  const handleBack = () => {
    playPopSound();
    if (selectedLessonId) {
      setSelectedLessonId(null);
      stop();
    } else {
      navigate('/');
      stop();
    }
  };

  useEffect(() => {
    if (selectedLessonId) {
      const lesson = lessonsData.find(l => l.id === selectedLessonId)!;
      // Auto-play spoken lesson logic
      // Adding a small delay to ensure transition is complete
      const timeoutId = setTimeout(() => {
        speak(lesson.title + ". " + lesson.explanation + " Ejemplos: " + lesson.examples.join('. '));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedLessonId, speak]);

  if (selectedLessonId) {
    const lesson = lessonsData.find(l => l.id === selectedLessonId)!;
    const lessonAnimals = lesson.exampleAnimals.map(id => animals.find(a => a.id === id)).filter(Boolean) as typeof animals;

    return (
      <div className="min-h-[100dvh] bg-green-50 p-4 flex flex-col items-center">
        <div className="w-full max-w-3xl flex justify-between items-center mb-8 pt-safe">
          <Button variant="ghost" onClick={handleBack} icon={ChevronLeft}>Volver</Button>
          <Button variant="primary" onClick={() => speak(lesson.title + ". " + lesson.explanation + " Ejemplos: " + lesson.examples.join('. '))} icon={Volume2}>
            Escuchar de nuevo
          </Button>
        </div>
        
        <Card className="max-w-3xl w-full mb-12">
          <div className="text-center mb-6 text-8xl drop-shadow-md">{lesson.image}</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-8">{lesson.title}</h2>
          
          <div className="bg-green-100 rounded-3xl p-8 mb-8 text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed border-4 border-green-300 shadow-inner">
            {lesson.explanation}
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-3xl font-bold text-gray-700 mb-6">Ejemplos:</h3>
            {lesson.examples.map((ex, i) => (
              <div key={i} className="flex items-center text-xl md:text-2xl text-gray-700 bg-white p-6 rounded-2xl shadow-sm border-2 border-green-100">
                <span className="text-green-500 mr-4 text-3xl">✔️</span>
                {ex}
              </div>
            ))}
          </div>

          {/* Visual section for animals */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-700 mb-6">Los animales de la lección:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lessonAnimals.map(animal => (
                <AnimalCard 
                  key={animal.id} 
                  emoji={animal.emoji} 
                  name={animal.nombre} 
                  className="bg-green-50 border-green-200"
                />
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-[2rem] p-8 md:p-10 border-8 border-yellow-200 text-center shadow-lg">
            <h3 className="text-3xl md:text-4xl font-extrabold text-yellow-800 mb-8">{lesson.miniQuestion.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.miniQuestion.options.map((opt, i) => (
                <Button 
                  key={i} 
                  variant="ghost" 
                  className="bg-white text-3xl min-h-[100px] border-4 border-gray-100 shadow-md hover:border-yellow-400"
                  onClick={() => {
                    if (opt === lesson.miniQuestion.correctAnswer) {
                      playSuccessSound();
                      speak("¡Correcto!");
                      confetti({ particleCount: 150, spread: 80, colors: ['#facc15', '#4ade80'] });
                      addStars(5);
                      setTimeout(() => handleBack(), 2500);
                    } else {
                      playErrorSound();
                      speak("Esa no es. Inténtalo otra vez.");
                    }
                  }}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto pt-safe">
        <Button variant="ghost" onClick={handleBack} icon={ChevronLeft} className="mb-8">Inicio</Button>
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 text-center mb-12">Lecciones</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {lessonsData.map(lesson => (
            <Card key={lesson.id} onClick={() => handleLessonSelect(lesson.id)} className="flex items-center hover:bg-green-100 border-x-8 border-transparent hover:border-green-400 cursor-pointer transition-colors">
              <span className="text-7xl mr-8 drop-shadow-sm">{lesson.image}</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{lesson.title}</h2>
                <p className="text-xl text-green-700">Aprender sobre {lesson.title.toLowerCase()}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
