import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'cyberpunk' | 'nature';
  setTheme: (theme: 'cyberpunk' | 'nature') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full p-1 flex">
        <motion.button
          className={`rounded-full p-2 flex items-center justify-center ${
            theme === 'cyberpunk' ? 'bg-purple-600 text-white' : 'bg-transparent text-gray-400'
          }`}
          onClick={() => setTheme('cyberpunk')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Moon size={18} />
        </motion.button>
        
        <motion.button
          className={`rounded-full p-2 flex items-center justify-center ${
            theme === 'nature' ? 'bg-green-600 text-white' : 'bg-transparent text-gray-400'
          }`}
          onClick={() => setTheme('nature')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Sun size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;