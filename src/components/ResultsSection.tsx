import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CarbonResult } from '../types';
import gsap from 'gsap';
import { Award, Leaf, AlertTriangle, Info } from 'lucide-react';

interface ResultsSectionProps {
  result: CarbonResult | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
    
    if (result && containerRef.current) {
      // Animate the entire container
      gsap.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
      
      // Animate children elements with stagger
      gsap.from(containerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });
    }
  }, [result]);
  
  if (!result) return null;
  
  // Brighter, more distinct colors for better visibility
  const COLORS = ['#00A3FF', '#FF6B00', '#FFD700', '#00E676'];
  
  const pieData = [
    { name: 'Transport', value: result.breakdown.transport },
    { name: 'Diet', value: result.breakdown.diet },
    { name: 'Energy', value: result.breakdown.energy },
    { name: 'Waste', value: result.breakdown.waste }
  ];
  
  const barData = [
    { name: 'Transport', emissions: result.breakdown.transport, fill: '#00A3FF' },
    { name: 'Diet', emissions: result.breakdown.diet, fill: '#FF6B00' },
    { name: 'Energy', emissions: result.breakdown.energy, fill: '#FFD700' },
    { name: 'Waste', emissions: result.breakdown.waste, fill: '#00E676' }
  ];
  
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
    <motion.div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with total emissions */}
      <motion.div 
        className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-8 shadow-2xl border border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
      </motion.div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div 
          className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-700"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Emissions by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={300}
                  strokeWidth={2}
                  stroke="#121212"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)} kg CO₂e`, 'Emissions']}
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: '#444', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-700"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Emissions Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)} kg CO₂e`, 'Emissions']}
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: '#444', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                  formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
                />
                <Bar 
                  dataKey="emissions" 
                  name="CO₂ Emissions (kg)" 
                  animationDuration={1500}
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Activities list */}
      <motion.div 
        className="bg-gray-900 rounded-lg p-6 mb-8 shadow-xl border border-gray-700"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Your Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.activities.map((activity, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-3xl mr-4">{activity.icon}</div>
              <div>
                <div className="text-white font-medium">{activity.description}</div>
                <div className="text-gray-400 text-sm">{activity.emissions.toFixed(2)} kg CO₂e</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Suggestions */}
      <motion.div 
        className="bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6 mb-8 shadow-xl border border-green-700"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center mb-4">
          <Leaf className="text-green-400 mr-2" size={24} />
          <h3 className="text-xl font-bold text-white">Improvement Suggestions</h3>
        </div>
        <div className="space-y-3">
          {result.suggestions.map((suggestion, index) => (
            <motion.div 
              key={index}
              className="bg-black bg-opacity-30 rounded-lg p-3 border border-green-800 flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <Info className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={18} />
              <p className="text-gray-200">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Badges section */}
      <motion.div 
        className="bg-gray-900 rounded-lg p-6 shadow-xl border border-gray-700"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center mb-4">
          <Award className="text-yellow-400 mr-2" size={24} />
          <h3 className="text-xl font-bold text-white">Your Eco Badges</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.ecoScore > 50 ? 'border-yellow-500' : 'border-gray-700'} text-center`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl mb-2 ${result.ecoScore > 50 ? 'text-yellow-400' : 'text-gray-600'}`}>🌱</div>
            <div className={`font-medium ${result.ecoScore > 50 ? 'text-white' : 'text-gray-500'}`}>Eco Warrior</div>
            <div className="text-xs text-gray-400">{result.ecoScore > 50 ? 'Unlocked!' : 'Score > 50 to unlock'}</div>
          </motion.div>
          
          <motion.div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.breakdown.transport < 10 ? 'border-yellow-500' : 'border-gray-700'} text-center`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl mb-2 ${result.breakdown.transport < 10 ? 'text-yellow-400' : 'text-gray-600'}`}>🚲</div>
            <div className={`font-medium ${result.breakdown.transport < 10 ? 'text-white' : 'text-gray-500'}`}>Low Carbon Traveler</div>
            <div className="text-xs text-gray-400">{result.breakdown.transport < 10 ? 'Unlocked!' : 'Reduce transport emissions'}</div>
          </motion.div>
          
          <motion.div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.breakdown.diet < 5 ? 'border-yellow-500' : 'border-gray-700'} text-center`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl mb-2 ${result.breakdown.diet < 5 ? 'text-yellow-400' : 'text-gray-600'}`}>🥗</div>
            <div className={`font-medium ${result.breakdown.diet < 5 ? 'text-white' : 'text-gray-500'}`}>Plant Power</div>
            <div className="text-xs text-gray-400">{result.breakdown.diet < 5 ? 'Unlocked!' : 'Reduce diet emissions'}</div>
          </motion.div>
          
          <motion.div 
            className={`bg-gray-800 rounded-lg p-4 border ${result.ecoScore > 80 ? 'border-yellow-500' : 'border-gray-700'} text-center`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl mb-2 ${result.ecoScore > 80 ? 'text-yellow-400' : 'text-gray-600'}`}>🌍</div>
            <div className={`font-medium ${result.ecoScore > 80 ? 'text-white' : 'text-gray-500'}`}>Earth Guardian</div>
            <div className="text-xs text-gray-400">{result.ecoScore > 80 ? 'Unlocked!' : 'Score > 80 to unlock'}</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsSection;