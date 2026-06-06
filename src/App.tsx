/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Lessons } from './pages/Lessons';
import { Games } from './pages/Games';
import { EnglishCorner } from './pages/EnglishCorner';
import { Medals } from './pages/Medals';
import { FinalReview } from './pages/FinalReview';
import { AdultPanel } from './pages/AdultPanel';

function OrientationOverlay() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerHeight < 600);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-green-400 text-white flex flex-col items-center justify-center p-8 text-center overscroll-none">
      <div className="text-8xl mb-6 animate-bounce">📱🔄</div>
      <h1 className="text-4xl font-bold mb-4 leading-tight">¡Gira la tablet!</h1>
      <p className="text-2xl">Por favor, gira la pantalla para seguir jugando en vertical.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="relative">
      <OrientationOverlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/games" element={<Games />} />
          <Route path="/english" element={<EnglishCorner />} />
          <Route path="/medals" element={<Medals />} />
          <Route path="/review" element={<FinalReview />} />
          <Route path="/adult" element={<AdultPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
