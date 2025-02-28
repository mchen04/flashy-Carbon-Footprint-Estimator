import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2 } from 'lucide-react';
import gsap from 'gsap';

interface InputSectionProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GSAP animation for the container
  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, []);
  
  // Highlight keywords as user types
  const highlightText = (text: string) => {
    // Keywords to highlight by category
    const transportKeywords = ['car', 'drive', 'drove', 'flight', 'plane', 'bus', 'train', 'miles'];
    const dietKeywords = ['meat', 'burger', 'beef', 'vegetarian', 'vegan', 'food', 'ate', 'eat'];
    const energyKeywords = ['electricity', 'power', 'charged', 'heating', 'cooling', 'ac'];
    const wasteKeywords = ['trash', 'waste', 'garbage', 'recycle', 'recycling'];
    
    let highlightedText = text;
    
    // Apply highlights by category
    transportKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-blue-400">$&</span>`);
    });
    
    dietKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-red-400">$&</span>`);
    });
    
    energyKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-yellow-400">$&</span>`);
    });
    
    wasteKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="text-green-400">$&</span>`);
    });
    
    return highlightedText;
  };
  
  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSubmit(input);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const clearInput = () => {
    setInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-black bg-opacity-80 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-xs">Carbon Footprint Terminal</div>
            <div></div>
          </div>
          
          <div className="p-4">
            <div className="text-green-400 text-sm mb-2">$ carbon-analyze</div>
            <div className="mb-4">
              <div className="text-gray-300 text-sm mb-1">Describe your daily activities:</div>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="I drove 20 miles, ate a burger, and charged my laptop overnight..."
                rows={4}
              />
              <div 
                className="text-xs text-gray-400 mt-1 hidden"
                dangerouslySetInnerHTML={{ __html: highlightText(input) }}
              />
            </div>
            
            <div className="flex justify-between">
              <motion.button
                onClick={clearInput}
                className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 size={16} className="mr-1" />
                Clear
              </motion.button>
              
              <motion.button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className={`flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md text-sm font-medium ${
                  !input.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {isLoading ? 'Analyzing...' : 'Analyze Footprint'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-400 text-sm">
        <p>Type your daily activities in natural language and our AI will analyze your carbon footprint</p>
      </div>
    </motion.div>
  );
};

export default InputSection;