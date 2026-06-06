import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { lessonsData } from '../data/lessons';
import { useSpeech } from '../hooks/useSpeech';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft, Volume2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Lessons() {
  const navigate = useNavigate();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const { speak, stop } = useSpeech();
  const { addStars } = useProgress();

  const handleLessonSelect = (id: string) => {
    setSelectedLessonId(id);
    stop();
  };

  const handleBack = () => {
    if (selectedLessonId) {
      setSelectedLessonId(null);
      stop();
    } else {
      navigate('/');
      stop();
    }
  };

  if (selectedLessonId) {
    const lesson = lessonsData.find(l => l.id === selectedLessonId)!;
    return (
      <div className="min-h-[100dvh] bg-green-50 p-4 flex flex-col items-center">
        <div className="w-full max-w-3xl flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={handleBack} icon={ChevronLeft}>Volver</Button>
          <Button variant="ghost" onClick={() => speak(lesson.explanation + ' ' + lesson.examples.join('. '))} icon={Volume2}>Escuchar</Button>
        </div>
        
        <Card className="max-w-3xl w-full">
          <div className="text-center mb-6 text-7xl">{lesson.image}</div>
          <h2 className="text-4xl font-bold text-center text-green-800 mb-8">{lesson.title}</h2>
          
          <div className="bg-green-100 rounded-2xl p-6 mb-8 text-2xl font-medium text-gray-800 leading-relaxed border-4 border-green-200">
            {lesson.explanation}
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-2xl font-bold text-gray-700">Ejemplos:</h3>
            {lesson.examples.map((ex, i) => (
              <div key={i} className="flex items-center text-xl text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <span className="text-green-500 mr-3">✔️</span>
                {ex}
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 rounded-3xl p-8 border-4 border-yellow-200 text-center">
            <h3 className="text-3xl font-bold text-yellow-800 mb-6">{lesson.miniQuestion.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.miniQuestion.options.map((opt, i) => (
                <Button 
                  key={i} 
                  variant="ghost" 
                  className="bg-white text-2xl min-h-[80px]"
                  onClick={() => {
                    if (opt === lesson.miniQuestion.correctAnswer) {
                      speak("¡Correcto!");
                      confetti({ particleCount: 50, spread: 60, colors: ['#facc15'] });
                      addStars(5);
                      setTimeout(() => handleBack(), 2000);
                    } else {
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
    <div className="min-h-[100dvh] bg-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={handleBack} icon={ChevronLeft} className="mb-8">Volver</Button>
        <h1 className="text-5xl font-bold text-green-800 text-center mb-12">Lecciones</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {lessonsData.map(lesson => (
            <Card key={lesson.id} onClick={() => handleLessonSelect(lesson.id)} className="flex items-center hover:bg-green-100 border-x-4 border-transparent hover:border-green-400">
              <span className="text-6xl mr-6">{lesson.image}</span>
              <h2 className="text-3xl font-bold text-gray-800">{lesson.title}</h2>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
