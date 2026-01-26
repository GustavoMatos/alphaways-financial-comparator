import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { SimulationParams } from '../types';
import { calculateSimulation } from '../utils/calculations';
import { COLORS } from '../constants';

interface ResultsPanelProps {
  params: SimulationParams;
}

const KPICard: React.FC<{ title: string; value: string; subtext?: string; color?: string }> = ({ title, value, subtext, color = 'text-white' }) => (
  <div className="bg-[#0B2D36] p-4 rounded-lg border border-[#16424D] shadow-sm">
    <h4 className="text-xs text-[#B0BEC5] uppercase tracking-wider mb-2">{title}</h4>
    <p className={`text-xl md:text-2xl font-mono font-bold ${color}`}>{value}</p>
    {subtext && <p className="text-xs text-[#B0BEC5] mt-1">{subtext}</p>}
  </div>
);

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#051F25] border border-[#2C5E6B] p-3 rounded shadow-xl">
        <p className="text-[#B0BEC5] mb-2 font-mono text-sm">Mês {label}</p>
        {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-xs text-white">{entry.name}: </span>
                <span className="text-xs font-mono font-bold text-[#EACF9F]">
                    {formatCurrency(entry.value)}
                </span>
            </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ params }) => {
  const result = useMemo(() => calculateSimulation(params), [params]);

  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto space-y-8 bg-[#051F25]">
      
      <header className="flex justify-between items-end border-b border-[#16424D] pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white">Análise Patrimonial</h2>
           <p className="text-[#B0BEC5] text-sm mt-1">Comparativo de Eficiência Financeira em {Math.floor(Math.max(params.termMonths, params.consortiumTermMonths)/12)} anos</p>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard 
          title="Consórcio (Patrimônio)" 
          value={formatCurrency(result.summary.finalNetWorthConsortium)} 
          subtext={`Total Pago: ${formatCurrency(result.summary.totalPaidConsortium)}`}
          color="text-[#D4B483]"
        />
        <KPICard 
          title="Financiamento (Patrimônio)" 
          value={formatCurrency(result.summary.finalNetWorthFinancing)}
          subtext={`Total Pago: ${formatCurrency(result.summary.totalPaidFinancing)}`}
          color="text-[#2563EB]"
        />
        <KPICard 
          title="Investimento Alternativo" 
          value={formatCurrency(result.summary.finalNetWorthCash)} 
          subtext="Se investisse a entrada + parcelas"
          color="text-[#10B981]"
        />
      </div>

      {/* CHART 1: Net Worth Evolution */}
      <div className="bg-[#0B2D36] p-4 rounded-xl border border-[#16424D]">
        <h3 className="text-sm font-bold text-white mb-6 pl-2">Evolução do Patrimônio Líquido (R$)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.flows} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorConsortium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.goldPrime} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.goldPrime} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFinancing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.techBlue} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.techBlue} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#16424D" vertical={false} />
              <XAxis dataKey="month" stroke="#2C5E6B" tick={{fill: '#B0BEC5', fontSize: 12}} />
              <YAxis stroke="#2C5E6B" tick={{fill: '#B0BEC5', fontSize: 12}} tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              
              <Area type="monotone" dataKey="consortiumNetWorth" name="Consórcio" stroke={COLORS.goldPrime} fillOpacity={1} fill="url(#colorConsortium)" strokeWidth={3} />
              <Area type="monotone" dataKey="financingNetWorth" name="Financiamento" stroke={COLORS.techBlue} fillOpacity={1} fill="url(#colorFinancing)" strokeWidth={2} />
              <Area type="monotone" dataKey="cashNetWorth" name="Investimento (Bench)" stroke={COLORS.emerald} fill="none" strokeDasharray="5 5" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: Cash Flow (Parcelas) */}
      <div className="bg-[#0B2D36] p-4 rounded-xl border border-[#16424D]">
        <h3 className="text-sm font-bold text-white mb-6 pl-2">Fluxo de Caixa Mensal (R$)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={result.flows} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#16424D" vertical={false} />
              <XAxis dataKey="month" stroke="#2C5E6B" />
              <YAxis stroke="#2C5E6B" tick={{fill: '#B0BEC5', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line type="stepAfter" dataKey="consortiumPayment" name="Parcela Consórcio" stroke={COLORS.goldPrime} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="financingPayment" name="Parcela Financiamento" stroke={COLORS.techBlue} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
