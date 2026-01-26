import React from 'react';
import { Button } from './ui/Button';

interface DashboardProps {
  onStart: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#051F25] p-6 text-center">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white tracking-tight">ALPHAWAYS</h1>
            <p className="text-[#D4B483] font-mono tracking-widest uppercase">Financial Intelligence</p>
        </div>
        
        <p className="text-[#B0BEC5] text-lg leading-relaxed">
          Comparador avançado de aquisição de ativos. Analise o impacto no seu patrimônio líquido entre compra à vista, financiamento e consórcio com projeções de longo prazo.
        </p>
        
        <div className="flex justify-center pt-8">
          <Button onClick={onStart} className="text-lg px-12 py-4">
            + Nova Simulação
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left opacity-70">
            <div className="p-4 border border-[#2C5E6B] rounded bg-[#0B2D36]">
                <span className="text-[#2563EB] text-2xl">01.</span>
                <p className="mt-2 text-sm text-gray-300">Inteligência Artificial para preencher taxas de mercado.</p>
            </div>
            <div className="p-4 border border-[#2C5E6B] rounded bg-[#0B2D36]">
                <span className="text-[#D4B483] text-2xl">02.</span>
                <p className="mt-2 text-sm text-gray-300">Cálculo de VPL e Patrimônio Líquido Real.</p>
            </div>
            <div className="p-4 border border-[#2C5E6B] rounded bg-[#0B2D36]">
                <span className="text-[#10B981] text-2xl">03.</span>
                <p className="mt-2 text-sm text-gray-300">Visualização de dados premium e comparativa.</p>
            </div>
        </div>
      </div>
    </div>
  );
};
