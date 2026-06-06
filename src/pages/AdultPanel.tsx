import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useProgress } from '../hooks/useProgress';
import { ChevronLeft, Download, RotateCcw, Printer } from 'lucide-react';

export function AdultPanel() {
  const navigate = useNavigate();
  const { progress, resetProgress } = useProgress();

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo el progreso? Esta acción no se puede deshacer.')) {
      resetProgress();
      alert('Progreso reiniciado.');
    }
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "progreso_animalia.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const totalExercises = Object.values(progress.completedExercisesByWorld).reduce((acc, curr) => acc + curr, 0);
  const totalAnswers = progress.totalCorrect + progress.totalIncorrect;
  const accuracy = totalAnswers > 0 ? Math.round((progress.totalCorrect / totalAnswers) * 100) : 0;

  return (
    <div className="min-h-[100dvh] bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Button className="print:hidden mb-8" variant="ghost" onClick={() => navigate('/')} icon={ChevronLeft}>Volver al Inicio</Button>
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-gray-200 pb-4">Zona Adulto: Panel de Progreso</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-l-8 border-yellow-400">
            <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-2">Estrellas</h3>
            <p className="text-5xl font-extrabold text-yellow-500">{progress.stars}</p>
          </Card>
          <Card className="bg-white border-l-8 border-blue-400">
            <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-2">Ejercicios</h3>
            <p className="text-5xl font-extrabold text-blue-500">{totalExercises}</p>
          </Card>
          <Card className="bg-white border-l-8 border-green-400">
            <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-2">Precisión</h3>
            <p className="text-5xl font-extrabold text-green-500">{accuracy}%</p>
          </Card>
        </div>

        <Card className="mb-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detalle por mundo</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 rounded-tl-xl font-bold hidden md:table-cell">ID</th>
                  <th className="p-4 font-bold">Mundo</th>
                  <th className="p-4 rounded-tr-xl md:rounded-tr-none font-bold text-right">Ejercicios Resueltos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: '1', name: 'Características del cuerpo' },
                  { id: '2', name: 'Desplazamiento' },
                  { id: '3', name: 'Nacimiento (Ovíparo/Vivíparo)' },
                  { id: '4', name: 'Alimentación' },
                  { id: '5', name: 'Domésticos / Salvajes' },
                  { id: 'english', name: 'English Corner' },
                ].map(w => (
                  <tr key={w.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-400 font-mono hidden md:table-cell">#{w.id}</td>
                    <td className="p-4 font-semibold text-gray-700">{w.name}</td>
                    <td className="p-4 text-right font-bold text-blue-600">{progress.completedExercisesByWorld[w.id] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-wrap gap-4 print:hidden">
          <Button variant="secondary" icon={Download} onClick={exportJSON}>Exportar Datos</Button>
          <Button variant="ghost" icon={Printer} onClick={handlePrint} className="bg-white">Imprimir Reporte</Button>
          <div className="flex-1"></div>
          <Button variant="danger" icon={RotateCcw} onClick={handleReset}>Reiniciar Progreso</Button>
        </div>

      </div>
    </div>
  );
}
