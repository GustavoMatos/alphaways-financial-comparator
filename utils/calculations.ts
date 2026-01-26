import { SimulationParams, MonthlyFlow, SimulationResult, AmortizationSystem } from '../types';

export const calculateSimulation = (params: SimulationParams): SimulationResult => {
  const flows: MonthlyFlow[] = [];
  
  // -- Common Constants --
  const monthlyAppreciation = Math.pow(1 + params.appreciationRateYear / 100, 1 / 12) - 1;
  const monthlyOpportunityCost = params.opportunityCost / 100;
  
  // -- Financing Setup --
  const financingRateMonthly = Math.pow(1 + params.financingRateYear / 100, 1 / 12) - 1;
  let financingBalance = params.assetValue - params.downPayment;
  const financingPrincipal = financingBalance;
  
  // -- Consortium Setup --
  // Simplified: Linear Fee distribution + Yearly Adjustment on Credit & Payment
  const consortiumTotalRate = (params.consortiumAdminFeeTotal) / 100;
  const consortiumMonths = params.consortiumTermMonths;
  let consortiumLetter = params.consortiumLetterValue;
  
  // Bid Logic
  let consortiumBalance = consortiumLetter * (1 + consortiumTotalRate); // Total debt to pay
  let consortiumMonthlyPayment = consortiumBalance / consortiumMonths;
  let consortiumDebt = consortiumBalance; 
  
  // Handling Bid (Lance)
  // If Bid is Own Resource: Pay upfront, reduce debt term or value. Assuming reduce term (Prazo) for simplicity here usually preferred.
  // Actually, usually bid reduces balance.
  if (params.consortiumBidType === 'own_resource') {
     consortiumDebt -= params.consortiumBid;
     // Recalculate payment or term. Let's keep payment constant and reduce term? 
     // Standard practice: Bid reduces number of installments (inverse order) or amount.
     // Let's assume Bid reduces Outstanding Balance, thus reducing remaining months if payment stays same, or reducing payment.
     // For comparison sake, let's say it reduces the Outstanding Balance.
  } else {
     // Embedded: Reduces letter value net received, but you pay for full letter.
     // For the math of Net Worth, the Debt is full, but Asset acquired is Letter - Bid.
     // This is complex. Let's simplify: Asset Value = Letter Value. Bid must be own resource for this calculation engine to align with Asset Value input.
  }
  
  // -- Cash Scenario Setup --
  // "Cash" scenario here assumes:
  // 1. You buy the asset at T=0 using cash (AssetValue).
  // 2. We compare the "Opportunity Cost" of that cash vs Keeping it invested.
  // BUT the visual graph usually requests:
  // "Investimento": If I DIDN'T buy the asset and just invested the money.
  // vs "Financiamento": Bought asset, paying debt.
  // The PRD says: "Compra à Vista (Capital investido rendendo juros compostos - Depreciação + Valorização)"
  // This means: Net Worth = Asset Value + (Virtual Fund of Monthly Savings vs Financing).
  
  // Let's normalize to "Net Worth Calculation".
  // All scenarios start with the same initial capital availability (Down Payment).
  // If Financing requires 100k down, and Cash requires 500k, we must assume the user HAS 500k for the Cash scenario?
  // Or do we compare "If I have 100k, Financing lets me buy NOW. Cash strategy means I invest 100k until I reach 500k"?
  // PRD Item 5.1: "Custo de Oportunidade... quanto o dinheiro da entrada (e das parcelas economizadas) renderia".
  
  // STRATEGY: 
  // Base Comparison: The cost of the most expensive monthly flow (usually Financing).
  // Surplus cash in cheaper scenarios is invested.
  
  let currentAssetValue = params.assetValue;
  
  // State Variables
  let accumulatedCashInv = params.downPayment; // For "Pure Investment" benchmark (User didn't buy, just invested downpayment)
  
  // Scenario A: Buying Cash (Assuming User HAD full money, what is the cost?)
  // This is often confusing. Let's stick to the PRD Graphic 1 definition:
  // "Compra à Vista (Capital investido rendendo juros compostos - Depreciação do bem + Valorização do bem)"
  // This implies: I used my capital to buy. My Net Worth is the Asset. 
  // BUT, I lost the opportunity to earn interest.
  // To make the graph comparable, we usually plot "Total Net Worth".
  // Cash Scenario NW = CurrentAssetValue.
  // Financing Scenario NW = CurrentAssetValue - Debt + (Invested difference between Cash Price and Down Payment? No).
  
  // REVISED STRATEGY FOR GRAPH VISUALIZATION:
  // We simulate the flow over the Financing Term (usually longest).
  const maxMonths = Math.max(params.termMonths, params.consortiumTermMonths);
  
  let finBalance = financingPrincipal;
  let consBalance = consortiumBalance;
  if(params.consortiumBidType === 'own_resource') consBalance -= params.consortiumBid;

  // Accumulated "Opportunity Fund" for each scenario based on cash flow differences
  // We need a baseline monthly payment to see who saves money.
  // However, usually "Cash Purchase" implies paying everything upfront.
  // Let's implement the specific logic requested:
  // Series 1 (Green - Cash/Invested): Logic: The user Invests the DownPayment + would-be monthly payments. 
  // (Wait, PRD says "Compra à Vista" line. This usually means the Asset Value path without debt).
  // Let's interpret "Green Line" as: The alternative investment strategy. "If I took the Down Payment and invested it, plus the monthly amount I WOULD have paid in financing, how much money would I have?"
  // vs Blue Line: "I bought the asset via Financing. Net Worth = Asset - Debt".
  
  let investmentFund = params.downPayment; // Scenario: Don't buy, Invest.
  
  let totalPaidFinancing = params.downPayment;
  let totalPaidConsortium = params.downPayment + (params.consortiumBidType === 'own_resource' ? params.consortiumBid : 0);
  
  for (let m = 1; m <= maxMonths; m++) {
    // 1. Asset Appreciation
    currentAssetValue = currentAssetValue * (1 + monthlyAppreciation);
    
    // 2. Financing Calculation (SAC or PRICE)
    let finPayment = 0;
    if (m <= params.termMonths && finBalance > 0) {
      if (params.amortization === AmortizationSystem.SAC) {
        const amort = financingPrincipal / params.termMonths;
        const interest = finBalance * financingRateMonthly;
        finPayment = amort + interest + 25; // +25 admin fee estimation
        finBalance -= amort;
      } else {
        // Price
        const payment = financingPrincipal * (financingRateMonthly * Math.pow(1 + financingRateMonthly, params.termMonths)) / (Math.pow(1 + financingRateMonthly, params.termMonths) - 1);
        const interest = finBalance * financingRateMonthly;
        const amort = payment - interest;
        finPayment = payment + 25;
        finBalance -= amort;
      }
    }
    if (finBalance < 0) finBalance = 0;
    
    // 3. Consortium Calculation
    // Simplified: Fixed payment adjusted annually by IPCA (approx to INCC/IGPM for generic)
    // In month 12, 24, 36... adjust letter and payment.
    let consPayment = consortiumMonthlyPayment;
    if (m <= params.consortiumTermMonths && consBalance > 0) {
        // Annual adjustment logic could go here. Keeping linear for MVP stability.
        // Assuming Bid Reduced Term for "Own Resource" or just reduces balance
        // If "Own Resource" bid, we paid a chunk.
        // Simplified:
        const monthlyAmortCons = (params.consortiumLetterValue * (1+consortiumTotalRate)) / params.consortiumTermMonths;
        consPayment = monthlyAmortCons; 
        
        consBalance -= monthlyAmortCons;
    }
    if (consBalance < 0) consBalance = 0;

    // 4. Investment Scenario (The "Green Line" - Opportunity Cost)
    // Logic: If I didn't buy, I have the Down Payment invested.
    // AND I add the amount I would have spent on Financing (the most common alternative) to this investment.
    // This allows comparing "Buying vs Renting/Investing".
    // However, the PRD calls it "Compra à Vista".
    // Let's output "Cash Net Worth" as if you bought it Cash:
    // NW = AssetValue. (You have the asset, no debt).
    // BUT, to be fair, you paid full price at T=0. 
    // The "Opportunity Cost" comes from the money you DON'T have anymore.
    
    // Let's stick to the most valuable comparison for investors:
    // Green (Investimento): Returns on Cash if NOT buying.
    // Blue (Financiamento): Asset Value - Debt.
    // Yellow (Consórcio): Asset Value - Debt.
    
    // Re-reading PRD 5.1: "quanto o dinheiro da entrada renderia" -> This supports the "Don't Buy" baseline.
    // Update Investment Fund:
    // Interest on previous balance
    investmentFund = investmentFund * (1 + monthlyOpportunityCost);
    // Add the monthly effort (using Financing as the 'budget' baseline)
    if (m <= params.termMonths) {
        investmentFund += finPayment;
    }

    // Accumulate Totals
    if (m <= params.termMonths) totalPaidFinancing += finPayment;
    if (m <= params.consortiumTermMonths) totalPaidConsortium += consPayment;

    flows.push({
      month: m,
      year: Math.ceil(m / 12),
      cashNetWorth: investmentFund, // Naming it 'cash' but strictly it's the "Investment Alternative"
      financingPayment: finPayment,
      financingBalance: finBalance,
      financingNetWorth: currentAssetValue - finBalance,
      consortiumPayment: consPayment,
      consortiumBalance: consBalance,
      consortiumNetWorth: currentAssetValue - consBalance
    });
  }

  return {
    summary: {
      totalPaidFinancing,
      totalPaidConsortium,
      finalNetWorthCash: flows[flows.length - 1].cashNetWorth,
      finalNetWorthFinancing: flows[flows.length - 1].financingNetWorth,
      finalNetWorthConsortium: flows[flows.length - 1].consortiumNetWorth
    },
    flows
  };
};
