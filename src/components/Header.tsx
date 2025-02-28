import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="py-6 px-4 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-center mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
          <Leaf size={32} className="text-white" />
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Carbon Footprint Estimator
      </motion.h1>
      
      <motion.p 
        className="text-gray-300 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Describe your daily activities and get an instant analysis of your carbon footprint with personalized insights.
      </motion.p>
    </motion.header>
  );
};

export default Header;