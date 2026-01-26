import { AssetType, AmortizationSystem, SimulationParams } from './types';

export const COLORS = {
  petrolDeep: '#051F25',
  petrolSurface: '#0B2D36',
  petrolLight: '#16424D',
  petrolBorder: '#2C5E6B',
  goldPrime: '#D4B483',
  goldHover: '#EACF9F',
  goldMuted: '#8C7350',
  silverMetallic: '#B0BEC5',
  techBlue: '#2563EB',
  emerald: '#10B981',
  error: '#E11D48',
};

export const INITIAL_PARAMS: SimulationParams = {
  assetType: AssetType.REAL_ESTATE,
  assetValue: 500000,
  opportunityCost: 0.85, // 0.85% ao mês (approx 100% CDI)
  
  downPayment: 100000,
  termMonths: 360,
  amortization: AmortizationSystem.SAC,
  financingRateYear: 9.5,
  
  consortiumLetterValue: 500000,
  consortiumTermMonths: 200,
  consortiumAdminFeeTotal: 16,
  consortiumBid: 0,
  consortiumBidType: 'own_resource',
  
  appreciationRateYear: 5.0,
};
