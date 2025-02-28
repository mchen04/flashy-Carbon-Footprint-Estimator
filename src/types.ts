export interface CarbonActivity {
  type: 'transport' | 'diet' | 'energy' | 'waste';
  description: string;
  emissions: number;
  icon: string;
}

export interface CarbonResult {
  totalEmissions: number;
  activities: CarbonActivity[];
  breakdown: {
    transport: number;
    diet: number;
    energy: number;
    waste: number;
  };
  suggestions: string[];
  ecoScore: number;
}

export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}