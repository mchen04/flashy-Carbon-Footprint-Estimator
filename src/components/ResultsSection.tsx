import React, { useEffect, useRef } from 'react';
import { CarbonResult } from '../types';
import gsap from 'gsap';
import { Award, Leaf, Info } from 'lucide-react';

interface ResultsSectionProps {
  result: CarbonResult | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  const gaugeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (result && gaugeRef.current) {
      // Animate the gauge based on eco score
      gsap.to(gaugeRef.current, {
        width: `${result.ecoScore}%`,
        duration: 2,
        ease: 'elastic.out(1, 0.3)'
      });
    }
  }, [result]);
  
  if (!result) return null;
  
  // Highly distinct colors with strong contrast for better visibility
  const COLORS = ['#FF3B30', '#34C759', '#007AFF', '#FF9500'];
  
  const getEcoScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Poor';
    return 'Critical';
  };
  
  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-green-400';
    if (score >= 40) return 'bg-yellow-400';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header with total emissions */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-8 shadow-2xl border border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Your Carbon Footprint</h2>
            <div className="flex items-center">
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                {result.totalEmissions.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-300">kg CO₂e</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Eco Score</span>
              <span className="text-sm font-medium text-white">{result.ecoScore.toFixed(0)}/100 - {getEcoScoreLabel(result.ecoScore)}</span>
            </div>
            <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden">
              <div 
                ref={gaugeRef}
                className={`h-full ${getEcoScoreColor(result.ecoScore)} transition-all duration-1000 ease-out`}
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carbon Footprint Breakdown */}
      <div className="mb-8 bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-700">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Carbon Footprint Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { name: 'Transport', value: result.breakdown.transport, color: '#FF3B30', icon: '🚗' },
            { name: 'Diet', value: result.breakdown.diet, color: '#34C759', icon: '🍔' },
            { name: 'Energy', value: result.breakdown.energy, color: '#007AFF', icon: '⚡' },
            { name: 'Waste', value: result.breakdown.waste, color: '#FF9500', icon: '♻️' }
          ].map((category, index) => {
            // Calculate percentage of total
            const percentage = (category.value / result.totalEmissions) * 100;
            
            return (
              <div
                key={category.name}
                className="bg-black bg-opacity-40 rounded-lg p-5 border border-gray-700 flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div
                  className="text-5xl mb-3"
                  style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
                >
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{category.name}</h4>
                
                <div className="w-full bg-gray-800 rounded-full h-4 mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1500 ease-out"
                    style={{ backgroundColor: category.color, width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex justify-between w-full">
                  <span className="text-gray-400 text-sm">{percentage.toFixed(0)}%</span>
                  <span className="text-white font-bold">
                    {category.value.toFixed(2)} kg
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Total Emissions Counter */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 mb-6 border border-gray-700 text-center">
          <h4 className="text-lg text-gray-400 mb-2">Total Carbon Footprint</h4>
          <div className="flex items-center justify-center">
            <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {result.totalEmissions.toFixed(2)}
            </span>
            <span className="ml-2 text-2xl text-gray-300">kg CO₂e</span>
          </div>
        </div>
        
        {/* Eco Score Gauge */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between mb-2">
            <h4 className="text-lg text-white">Eco Score</h4>
            <span className="text-lg font-medium text-white">{result.ecoScore.toFixed(0)}/100</span>
          </div>
          
          <div className="relative h-8 w-full bg-gray-700 rounded-full overflow-hidden mb-2">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-2000 ease-out"
              style={{
                background: `linear-gradient(90deg,
                  ${result.ecoScore < 20 ? '#FF3B30' :
                    result.ecoScore < 40 ? '#FF9500' :
                    result.ecoScore < 60 ? '#FFCC00' :
                    result.ecoScore < 80 ? '#34C759' : '#00C7BE'}
                  ,
                  ${result.ecoScore < 20 ? '#FF9500' :
                    result.ecoScore < 40 ? '#FFCC00' :
                    result.ecoScore < 60 ? '#34C759' :
                    result.ecoScore < 80 ? '#00C7BE' : '#007AFF'})`,
                width: `${result.ecoScore}%`
              }}
            />
            
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
              <span className="text-white font-bold text-sm drop-shadow-lg">
                {result.ecoScore < 20 ? 'Critical' :
                 result.ecoScore < 40 ? 'Poor' :
                 result.ecoScore < 60 ? 'Average' :
                 result.ecoScore < 80 ? 'Good' : 'Excellent'}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Critical</span>
            <span>Poor</span>
            <span>Average</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>
      
      {/* Activities list */}
      <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Your Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.activities.map((activity, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mr-4">{activity.icon}</div>
              <div>
                <div className="text-white font-medium">{activity.description}</div>
                <div className="text-gray-400 text-sm">{activity.emissions.toFixed(2)} kg CO₂e</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6 mb-8 shadow-xl border border-green-700">
        <div className="flex items-center mb-4">
          <Leaf className="text-green-400 mr-2" size={24} />
          <h3 className="text-xl font-bold text-white">Improvement Suggestions</h3>
        </div>
        <div className="space-y-3">
          {result.suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="bg-black bg-opacity-30 rounded-lg p-3 border border-green-800 flex items-start hover:bg-opacity-40 transition-colors duration-300"
            >
              <Info className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <p className="text-gray-200">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badges section */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-700">
        <div className="flex items-center mb-4">
          <Award className="text-yellow-400 mr-2" size={24} />
          <h3 className="text-xl font-bold text-white">Your Eco Badges</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.ecoScore > 50 ? 'border-yellow-500' : 'border-gray-700'} text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className={`text-4xl mb-2 ${result.ecoScore > 50 ? 'text-yellow-400' : 'text-gray-600'}`}>🌱</div>
            <div className={`font-medium ${result.ecoScore > 50 ? 'text-white' : 'text-gray-500'}`}>Eco Warrior</div>
            <div className="text-xs text-gray-400">{result.ecoScore > 50 ? 'Unlocked!' : 'Score > 50 to unlock'}</div>
          </div>
          
          <div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.breakdown.transport < 10 ? 'border-yellow-500' : 'border-gray-700'} text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className={`text-4xl mb-2 ${result.breakdown.transport < 10 ? 'text-yellow-400' : 'text-gray-600'}`}>🚲</div>
            <div className={`font-medium ${result.breakdown.transport < 10 ? 'text-white' : 'text-gray-500'}`}>Low Carbon Traveler</div>
            <div className="text-xs text-gray-400">{result.breakdown.transport < 10 ? 'Unlocked!' : 'Reduce transport emissions'}</div>
          </div>
          
          <div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.breakdown.diet < 5 ? 'border-yellow-500' : 'border-gray-700'} text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className={`text-4xl mb-2 ${result.breakdown.diet < 5 ? 'text-yellow-400' : 'text-gray-600'}`}>🥗</div>
            <div className={`font-medium ${result.breakdown.diet < 5 ? 'text-white' : 'text-gray-500'}`}>Plant Power</div>
            <div className="text-xs text-gray-400">{result.breakdown.diet < 5 ? 'Unlocked!' : 'Reduce diet emissions'}</div>
          </div>
          
          <div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.ecoScore > 80 ? 'border-yellow-500' : 'border-gray-700'} text-center hover:scale-105 transition-transform duration-300`}
          >
            <div className={`text-4xl mb-2 ${result.ecoScore > 80 ? 'text-yellow-400' : 'text-gray-600'}`}>🌍</div>
            <div className={`font-medium ${result.ecoScore > 80 ? 'text-white' : 'text-gray-500'}`}>Earth Guardian</div>
            <div className="text-xs text-gray-400">{result.ecoScore > 80 ? 'Unlocked!' : 'Score > 80 to unlock'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;