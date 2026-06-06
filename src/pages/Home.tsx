import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { useFullscreen } from '../hooks/useFullscreen';
import { Maximize2, Minimize2, BookOpen, Gamepad2, Globe2, Award, UserCheck, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-sky-200 to-green-200 p-4 md:p-8 flex flex-col pt-safe px-safe">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button 
          onClick={toggleFullscreen}
          className="p-3 bg-white/80 backdrop-blur rounded-full text-gray-700 shadow-lg"
          aria-label="Pantalla completa"
        >
          {isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </button>
      </div>

      <header className="text-center mt-8 mb-8">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-800 drop-shadow-md mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Animalia:<br/>Misión Animales
          </h1>
        </motion.div>
        <p className="text-2xl font-bold text-gray-700">Aprende jugando con Mía y Uli</p>
      </header>

      <div className="flex justify-center gap-6 mb-12">
        <motion.div 
          className="bg-yellow-100 border-4 border-yellow-400 px-6 py-3 rounded-full flex items-center shadow-lg"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-3xl mr-2">⭐</span>
          <span className="text-2xl font-bold text-yellow-700">{progress.stars} Estrellas</span>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto flex-1 content-start"
      >
        <Card onClick={() => navigate('/lessons')} className="bg-gradient-to-br from-green-100 to-green-50 flex items-center p-8 border-green-300">
          <BookOpen className="w-16 h-16 text-green-600 mr-6" />
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">Lecciones</h2>
            <p className="text-xl text-green-700">Aprende los secretos</p>
          </div>
        </Card>

        <Card onClick={() => navigate('/games')} className="bg-gradient-to-br from-orange-100 to-orange-50 flex items-center p-8 border-orange-300">
          <Gamepad2 className="w-16 h-16 text-orange-600 mr-6" />
          <div>
            <h2 className="text-3xl font-bold text-orange-800 mb-2">Juegos y ejercicios</h2>
            <p className="text-xl text-orange-700">¡Consigue estrellas!</p>
          </div>
        </Card>

        <Card onClick={() => navigate('/english')} className="bg-gradient-to-br from-purple-100 to-purple-50 flex items-center p-8 border-purple-300">
          <Globe2 className="w-16 h-16 text-purple-600 mr-6" />
          <div>
            <h2 className="text-3xl font-bold text-purple-800 mb-2">English Corner</h2>
            <p className="text-xl text-purple-700">Aprende en inglés</p>
          </div>
        </Card>

        <Card onClick={() => navigate('/medals')} className="bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center p-8 border-yellow-300">
          <Award className="w-16 h-16 text-yellow-600 mr-6" />
          <div>
            <h2 className="text-3xl font-bold text-yellow-800 mb-2">Mis medallas</h2>
            <p className="text-xl text-yellow-700">Tus premios</p>
          </div>
        </Card>

        <Card onClick={() => navigate('/review')} className="bg-gradient-to-br from-blue-100 to-blue-50 flex items-center p-8 border-blue-300 md:col-span-2 relative overflow-hidden">
          <PlayCircle className="w-16 h-16 text-blue-600 mr-6 z-10" />
          <div className="z-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Repaso final</h2>
            <p className="text-xl text-blue-700">Preparados para el examen</p>
          </div>
          <span className="absolute -right-8 -bottom-8 text-9xl opacity-20">🦁</span>
        </Card>

      </motion.div>

      <div className="mt-12 text-center pb-8">
        <button 
          onClick={() => navigate('/adult')}
          className="text-gray-500 font-bold items-center inline-flex px-4 py-2 hover:bg-white/50 rounded-full transition"
        >
          <UserCheck className="w-5 h-5 mr-2" />
          Zona adulto
        </button>
      </div>
    </div>
  );
}
