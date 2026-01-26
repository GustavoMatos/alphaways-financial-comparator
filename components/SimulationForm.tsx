import React, { useState } from 'react';
import { AssetType, AmortizationSystem, SimulationParams } from '../types';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { fetchMarketRates } from '../services/geminiService';

interface SimulationFormProps {
  params: SimulationParams;
  setParams: React.Dispatch<React.SetStateAction<SimulationParams>>;
}

export const SimulationForm: React.FC<SimulationFormProps> = ({ params, setParams }) => {
  const [loadingAI, setLoadingAI] = useState(false);

  const handleAssetChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAsset = e.target.value as AssetType;
    setParams(prev => ({ ...prev, assetType: newAsset }));
    
    // Auto-trigger AI
    setLoadingAI(true);
    const rates = await fetchMarketRates(newAsset);
    setParams(prev => ({
      ...prev,
      assetType: newAsset,
      appreciationRateYear: rates.appreciationRate,
      financingRateYear: rates.financingRate,
      consortiumAdminFeeTotal: rates.consortiumAdminFee,
    }));
    setLoadingAI(false);
  };

  const handleChange = (field: keyof SimulationParams, value: string) => {
    setParams(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#0B2D36] border-r border-[#16424D] h-full overflow-y-auto">
      <div>
        <h2 className="text-2xl font-bold text-[#D4B483] mb-1">Configuração</h2>
        <p className="text-sm text-[#B0BEC5]">Defina os parâmetros da aquisição.</p>
      </div>

      {/* Basic Asset Info */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[#2C5E6B] uppercase border-b border-[#16424D] pb-1">Premissas Gerais</h3>
        <Select 
          label="Tipo de Bem"
          value={params.assetType}
          onChange={handleAssetChange}
          options={[
            { label: 'Imóvel', value: AssetType.REAL_ESTATE },
            { label: 'Veículo', value: AssetType.VEHICLE },
            { label: 'Maquinário / Pesados', value: AssetType.MACHINERY },
          ]}
        />
        {loadingAI && <p className="text-xs text-[#D4B483] animate-pulse">Consultando taxas de mercado com IA...</p>}
        
        <Input 
          label="Valor de Mercado (R$)"
          value={params.assetValue}
          onChange={(e) => handleChange('assetValue', e.target.value)}
          type="number"
        />
        <div className="grid grid-cols-2 gap-4">
           <Input 
            label="Valorização Anual (%)"
            value={params.appreciationRateYear}
            onChange={(e) => handleChange('appreciationRateYear', e.target.value)}
            type="number" step="0.1"
            suffix="a.a."
          />
          <Input 
            label="Custo Oportunidade (Mês)"
            value={params.opportunityCost}
            onChange={(e) => handleChange('opportunityCost', e.target.value)}
            type="number" step="0.01"
            suffix="%"
          />
        </div>
      </section>

      {/* Financing */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[#2563EB] uppercase border-b border-[#16424D] pb-1">Financiamento</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Entrada (R$)"
            value={params.downPayment}
            onChange={(e) => handleChange('downPayment', e.target.value)}
            type="number"
          />
          <Input 
            label="Prazo (Meses)"
            value={params.termMonths}
            onChange={(e) => handleChange('termMonths', e.target.value)}
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Taxa de Juros"
            value={params.financingRateYear}
            onChange={(e) => handleChange('financingRateYear', e.target.value)}
            type="number" step="0.1"
            suffix="a.a."
          />
           <Select 
            label="Amortização"
            value={params.amortization}
            onChange={(e) => setParams(prev => ({ ...prev, amortization: e.target.value as AmortizationSystem }))}
            options={[
              { label: 'SAC (Decrescente)', value: AmortizationSystem.SAC },
              { label: 'PRICE (Fixa)', value: AmortizationSystem.PRICE },
            ]}
          />
        </div>
      </section>

      {/* Consortium */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[#D4B483] uppercase border-b border-[#16424D] pb-1">Consórcio</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Prazo Grupo (Meses)"
            value={params.consortiumTermMonths}
            onChange={(e) => handleChange('consortiumTermMonths', e.target.value)}
            type="number"
          />
          <Input 
            label="Taxa Adm. Total (%)"
            value={params.consortiumAdminFeeTotal}
            onChange={(e) => handleChange('consortiumAdminFeeTotal', e.target.value)}
            type="number"
          />
        </div>
        <Input 
            label="Lance (R$)"
            value={params.consortiumBid}
            onChange={(e) => handleChange('consortiumBid', e.target.value)}
            type="number"
        />
        <Select 
            label="Tipo de Lance"
            value={params.consortiumBidType}
            onChange={(e) => setParams(prev => ({ ...prev, consortiumBidType: e.target.value as any }))}
            options={[
              { label: 'Recurso Próprio (Do Bolso)', value: 'own_resource' },
              { label: 'Embutido (Da Carta)', value: 'embedded' },
            ]}
        />
      </section>

      <div className="pt-4">
        <Button onClick={() => window.print()} variant="outline" fullWidth>
          Gerar Relatório PDF
        </Button>
      </div>
    </div>
  );
};
