// Enums
export enum AssetType {
  REAL_ESTATE = 'Real Estate',
  VEHICLE = 'Vehicle',
  MACHINERY = 'Machinery',
}

export enum AmortizationSystem {
  SAC = 'SAC',
  PRICE = 'PRICE',
}

// Data Models
export interface MarketRates {
  selic: number;
  ipca: number;
  appreciationRate: number; // Valorização do bem
  depreciationRate: number; // Depreciação (se aplicável)
  financingRate: number; // Taxa de juros anual
  consortiumAdminFee: number; // Taxa adm total
  consortiumReserveFund: number; // Fundo de reserva
}

export interface SimulationParams {
  assetType: AssetType;
  assetValue: number;
  opportunityCost: number; // Taxa livre de risco mensal (CDI)
  
  // Financing
  downPayment: number;
  termMonths: number;
  amortization: AmortizationSystem;
  financingRateYear: number;
  
  // Consortium
  consortiumLetterValue: number;
  consortiumTermMonths: number;
  consortiumAdminFeeTotal: number;
  consortiumBid: number; // Lance
  consortiumBidType: 'own_resource' | 'embedded';
  
  // Asset
  appreciationRateYear: number;
}

// Calculation Results
export interface MonthlyFlow {
  month: number;
  year: number;
  
  // Cash/Investment Scenario
  cashNetWorth: number; // Value of asset + leftover cash invested
  
  // Financing Scenario
  financingPayment: number;
  financingBalance: number;
  financingNetWorth: number; // Asset Value - Debt
  
  // Consortium Scenario
  consortiumPayment: number;
  consortiumBalance: number;
  consortiumNetWorth: number; // Asset Value - Debt
}

export interface SimulationResult {
  summary: {
    totalPaidFinancing: number;
    totalPaidConsortium: number;
    finalNetWorthCash: number;
    finalNetWorthFinancing: number;
    finalNetWorthConsortium: number;
  };
  flows: MonthlyFlow[];
}
