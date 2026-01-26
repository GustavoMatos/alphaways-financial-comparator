import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { SimulationForm } from './components/SimulationForm';
import { ResultsPanel } from './components/ResultsPanel';
import { SimulationParams } from './types';
import { INITIAL_PARAMS } from './constants';

function App() {
  const [view, setView] = useState<'dashboard' | 'simulation'>('dashboard');
  const [params, setParams] = useState<SimulationParams>(INITIAL_PARAMS);

  if (view === 'dashboard') {
    return <Dashboard onStart={() => setView('simulation')} />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-[#051F25]">
      {/* Sidebar / Inputs */}
      <div className="w-full md:w-[400px] flex-shrink-0 h-[40vh] md:h-full overflow-y-auto border-r border-[#0B2D36]">
        <div className="flex items-center justify-between p-6 pb-0 md:hidden">
            <span className="font-bold text-white">ALPHAWAYS</span>
            <button onClick={() => setView('dashboard')} className="text-[#D4B483] text-xs">VOLTAR</button>
        </div>
        <SimulationForm params={params} setParams={setParams} />
      </div>
      
      {/* Main Content / Charts */}
      <main className="flex-1 h-[60vh] md:h-full relative">
        <div className="hidden md:block absolute top-6 right-6 z-10">
            <button onClick={() => setView('dashboard')} className="text-[#2C5E6B] hover:text-[#D4B483] text-sm font-bold uppercase transition-colors">
                &larr; Voltar ao Início
            </button>
        </div>
        <ResultsPanel params={params} />
      </main>
    </div>
  );
}

export default App;
