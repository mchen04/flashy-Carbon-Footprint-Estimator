import { CarbonResult } from '../types';

// This is a mock LLM response for development purposes
// In a real app, this would be replaced with an actual API call to OpenAI/Gemini
export const analyzeCarbonFootprint = async (input: string): Promise<CarbonResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple keyword matching for demo purposes
  const lowerInput = input.toLowerCase();
  
  const result: CarbonResult = {
    totalEmissions: 0,
    activities: [],
    breakdown: {
      transport: 0,
      diet: 0,
      energy: 0,
      waste: 0
    },
    suggestions: [],
    ecoScore: 0
  };
  
  // Transport detection
  if (lowerInput.includes('drove') || lowerInput.includes('car') || lowerInput.includes('miles')) {
    const emissions = Math.random() * 10 + 5;
    result.activities.push({
      type: 'transport',
      description: 'Driving a car',
      emissions: emissions,
      icon: '🚗'
    });
    result.breakdown.transport += emissions;
  }
  
  if (lowerInput.includes('flight') || lowerInput.includes('flew') || lowerInput.includes('plane')) {
    const emissions = Math.random() * 50 + 80;
    result.activities.push({
      type: 'transport',
      description: 'Taking a flight',
      emissions: emissions,
      icon: '✈️'
    });
    result.breakdown.transport += emissions;
  }
  
  // Diet detection
  if (lowerInput.includes('meat') || lowerInput.includes('burger') || lowerInput.includes('beef')) {
    const emissions = Math.random() * 5 + 3;
    result.activities.push({
      type: 'diet',
      description: 'Consuming meat',
      emissions: emissions,
      icon: '🍔'
    });
    result.breakdown.diet += emissions;
  }
  
  if (lowerInput.includes('vegetarian') || lowerInput.includes('vegan') || lowerInput.includes('plant-based')) {
    const emissions = Math.random() * 1 + 0.5;
    result.activities.push({
      type: 'diet',
      description: 'Plant-based meal',
      emissions: emissions,
      icon: '🥗'
    });
    result.breakdown.diet += emissions;
  }
  
  // Energy detection
  if (lowerInput.includes('electricity') || lowerInput.includes('charged') || lowerInput.includes('power')) {
    const emissions = Math.random() * 3 + 1;
    result.activities.push({
      type: 'energy',
      description: 'Electricity usage',
      emissions: emissions,
      icon: '🔋'
    });
    result.breakdown.energy += emissions;
  }
  
  if (lowerInput.includes('heating') || lowerInput.includes('air conditioning') || lowerInput.includes('ac')) {
    const emissions = Math.random() * 8 + 4;
    result.activities.push({
      type: 'energy',
      description: 'Heating/Cooling',
      emissions: emissions,
      icon: '🔥'
    });
    result.breakdown.energy += emissions;
  }
  
  // Waste detection
  if (lowerInput.includes('trash') || lowerInput.includes('waste') || lowerInput.includes('garbage')) {
    const emissions = Math.random() * 2 + 1;
    result.activities.push({
      type: 'waste',
      description: 'Waste disposal',
      emissions: emissions,
      icon: '🗑️'
    });
    result.breakdown.waste += emissions;
  }
  
  if (lowerInput.includes('recycle') || lowerInput.includes('recycling')) {
    const emissions = Math.random() * 0.5 + 0.2;
    result.activities.push({
      type: 'waste',
      description: 'Recycling',
      emissions: emissions,
      icon: '♻️'
    });
    result.breakdown.waste += emissions;
  }
  
  // Calculate total emissions
  result.totalEmissions = Object.values(result.breakdown).reduce((sum, val) => sum + val, 0);
  
  // If no activities were detected, add a default one
  if (result.activities.length === 0) {
    const defaultEmissions = Math.random() * 5 + 2;
    result.activities.push({
      type: 'energy',
      description: 'Daily activities',
      emissions: defaultEmissions,
      icon: '🏠'
    });
    result.breakdown.energy += defaultEmissions;
    result.totalEmissions = defaultEmissions;
  }
  
  // Generate suggestions based on highest emission category
  const highestCategory = Object.entries(result.breakdown)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  switch (highestCategory) {
    case 'transport':
      result.suggestions.push('Consider using public transportation or carpooling');
      result.suggestions.push('Try biking or walking for short distances');
      break;
    case 'diet':
      result.suggestions.push('Try incorporating more plant-based meals into your diet');
      result.suggestions.push('Consider reducing red meat consumption');
      break;
    case 'energy':
      result.suggestions.push('Use energy-efficient appliances and LED lighting');
      result.suggestions.push('Reduce standby power consumption by unplugging devices');
      break;
    case 'waste':
      result.suggestions.push('Implement a comprehensive recycling system');
      result.suggestions.push('Consider composting organic waste');
      break;
  }
  
  // Add a general suggestion
  result.suggestions.push('Track your carbon footprint regularly to identify improvement areas');
  
  // Calculate eco score (0-100)
  // Lower emissions = higher score
  const maxEmissions = 100;
  result.ecoScore = Math.max(0, Math.min(100, 100 - (result.totalEmissions / maxEmissions * 100)));
  
  return result;
};