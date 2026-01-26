import { GoogleGenAI, Type } from "@google/genai";
import { AssetType, MarketRates } from "../types";

// NOTE: In a real app, do not log API keys. This expects process.env.API_KEY to be available.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const fetchMarketRates = async (assetType: AssetType): Promise<MarketRates> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning default values.");
    return {
      selic: 10.75,
      ipca: 4.5,
      appreciationRate: 5.0,
      depreciationRate: 0,
      financingRate: 9.9,
      consortiumAdminFee: 15,
      consortiumReserveFund: 2
    };
  }

  try {
    const prompt = `
      Provide current average market rates in Brazil for purchasing: ${assetType}.
      Return a JSON object with:
      - selic: current Selic rate (annual %)
      - ipca: current inflation expectation (annual %)
      - appreciationRate: expected annual appreciation of the asset (positive number) or depreciation (negative number for vehicles)
      - depreciationRate: expected annual depreciation (0 for real estate, positive for vehicles)
      - financingRate: average annual effective interest rate for this asset type
      - consortiumAdminFee: average total administration fee (%) for full term
      - consortiumReserveFund: average reserve fund (%)
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            selic: { type: Type.NUMBER },
            ipca: { type: Type.NUMBER },
            appreciationRate: { type: Type.NUMBER },
            depreciationRate: { type: Type.NUMBER },
            financingRate: { type: Type.NUMBER },
            consortiumAdminFee: { type: Type.NUMBER },
            consortiumReserveFund: { type: Type.NUMBER },
          },
          required: ['selic', 'financingRate', 'consortiumAdminFee'],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      
      // Normalize data logic specifically for vehicles vs real estate
      let appreciation = data.appreciationRate;
      if (assetType !== AssetType.REAL_ESTATE && data.depreciationRate > 0) {
        appreciation = -Math.abs(data.depreciationRate); 
      }

      return {
        selic: data.selic,
        ipca: data.ipca,
        appreciationRate: appreciation,
        depreciationRate: data.depreciationRate || 0,
        financingRate: data.financingRate,
        consortiumAdminFee: data.consortiumAdminFee,
        consortiumReserveFund: data.consortiumReserveFund || 1,
      };
    }
    
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Failed to fetch market rates via AI:", error);
    // Fallback defaults
    return {
      selic: 10.5,
      ipca: 4.0,
      appreciationRate: assetType === AssetType.REAL_ESTATE ? 6.0 : -10.0,
      depreciationRate: assetType === AssetType.REAL_ESTATE ? 0 : 10.0,
      financingRate: 10.0,
      consortiumAdminFee: 16.0,
      consortiumReserveFund: 2.0
    };
  }
};
