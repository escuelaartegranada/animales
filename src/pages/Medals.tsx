import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft } from 'lucide-react';

const allMedalsList = [
  { id: 'medalla-peq-1', name: 'Detective Aprendiz', emoji: '🔍', desc: 'Resueltos 10 de características' },
  { id: 'medalla-gra-1', name: 'Detective Jefe', emoji: '🔎', desc: 'Resueltos 50 de características' },
  { id: 'insignia-1', name: 'Experta en Cuerpos', emoji: '👑', desc: 'Resueltos 100 de características' },
  
  { id: 'medalla-peq-2', name: 'Corredor', emoji: '👟', desc: 'Resueltos 10 de movimiento' },
  { id: 'medalla-gra-2', name: 'Atleta', emoji: '🏅', desc: 'Resueltos 50 de movimiento' },
  { id: 'insignia-2', name: 'Experta en Movimiento', emoji: '🚀', desc: 'Resueltos 100 de movimiento' },

  { id: 'medalla-peq-3', name: 'Cuidadora de huevos', emoji: '🥚', desc: 'Resueltos 10 de nacimientos' },
  { id: 'medalla-gra-3', name: 'Protectora', emoji: '🐣', desc: 'Resueltos 50 de nacimientos' },
  { id: 'insignia-3', name: 'Experta en Vida', emoji: '🌟', desc: 'Resueltos 100 de nacimientos' },

  { id: 'medalla-peq-4', name: 'Ayudante de cocina', emoji: '🥕', desc: 'Resueltos 10 de alimentación' },
  { id: 'medalla-gra-4', name: 'Chef Animal', emoji: '🧑‍🍳', desc: 'Resueltos 50 de alimentación' },
  { id: 'insignia-4', name: 'Experta en Comida', emoji: '🍎', desc: 'Resueltos 100 de alimentación' },

  { id: 'medalla-peq-5', name: 'Amiga', emoji: '🐕', desc: 'Resueltos 10 de hábitat' },
  { id: 'medalla-gra-5', name: 'Granjera', emoji: '🚜', desc: 'Resueltos 50 de hábitat' },
  { id: 'insignia-5', name: 'Exploradora Salvaje', emoji: '🏕️', desc: 'Resueltos 100 de hábitat' },

  { id: 'english-10', name: 'English Starter', emoji: '🇬🇧', desc: '10 words learned' },
  { id: 'english-50', name: 'English Speaker', emoji: '💬', desc: '50 words learned' },
  { id: 'english-100', name: 'English Master', emoji: '🎓', desc: '100 words mastered' },
];

export function Medals() {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div className="min-h-[100dvh] bg-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/')} icon={ChevronLeft} className="mb-8">Inicio</Button>
        <div className="text-center mb-12">
           <h1 className="text-5xl font-bold text-yellow-800 mb-4">Mis Medallas</h1>
           <p className="text-2xl text-yellow-700 font-bold">Total Estrellas: ⭐ {progress.stars}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allMedalsList.map(medal => {
            const hasMedal = progress.medals.includes(medal.id);
            return (
              <div 
                key={medal.id} 
                className={`bg-white rounded-3xl p-6 text-center border-4 ${hasMedal ? 'border-yellow-400 shadow-xl' : 'border-gray-200 opacity-60 grayscale'}`}
              >
                <div className={`text-6xl mb-4 ${hasMedal ? '' : 'opacity-30'}`}>{medal.emoji}</div>
                <h3 className="font-bold text-gray-800 mb-2 leading-tight">{medal.name}</h3>
                <p className="text-sm text-gray-500 leading-tight">{medal.desc}</p>
                {hasMedal && <div className="mt-4 text-xs font-bold text-green-500 uppercase tracking-widest">Desbloqueada</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
