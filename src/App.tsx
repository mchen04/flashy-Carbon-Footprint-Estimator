import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import BackgroundEffect from './components/BackgroundEffect';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import { CarbonResult } from './types';
import { analyzeCarbonFootprintWithAI } from './utils/openaiService';
import { Github } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<'cyberpunk' | 'nature'>('cyberpunk');
  const [userInput, setUserInput] = useState<string>('');
  const [result, setResult] = useState<CarbonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  
  useEffect(() => {
    // Hide intro after 3 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async (input: string) => {
    console.log("App: handleSubmit called with input:", input);
    
    // Set initial states
    setUserInput(input);
    setIsLoading(true);
    
    try {
      console.log("App: Calling analyzeCarbonFootprintWithAI");
      const result = await analyzeCarbonFootprintWithAI(input);
      console.log("App: Received result:", result);
      
      // Update the result state
      setResult(result);
    } catch (error) {
      console.error('Error analyzing carbon footprint:', error);
      // Show an alert to the user
      alert("There was an error analyzing your carbon footprint. Please try again.");
    } finally {
      // Always set loading to false when done
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`min-h-screen ${theme === 'cyberpunk' ? 'bg-gray-900' : 'bg-green-900'} text-white`}>
      <BackgroundEffect />
      
      <ThemeToggle theme={theme} setTheme={setTheme} />
      
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div 
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full mb-4"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, ease: "linear", repeat: Infinity },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 9H21L16 13.5L18 21L12 17L6 21L8 13.5L3 9H9.5L12 2Z" fill="white" />
                  </svg>
                </motion.div>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2"
                animate={{ 
                  backgroundPosition: ["0% center", "100% center"],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Carbon Footprint Estimator
              </motion.h1>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading your eco-friendly experience...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <InputSection onSubmit={handleSubmit} isLoading={isLoading} />
        
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsSection result={result} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.footer 
          className="mt-16 text-center text-gray-400 text-sm py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center mb-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition-colors">
              <Github size={16} className="mr-1" />
              <span>View on GitHub</span>
            </a>
          </div>
          <p>© 2025 Carbon Footprint Estimator | Hackathon Project</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;