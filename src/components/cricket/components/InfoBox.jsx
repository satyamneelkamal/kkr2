import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoBox = ({ label, value, show = true }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const valueRef = useRef(value);
  const animationTimeoutRef = useRef(null);

  // Enhanced value change tracking
  useEffect(() => {
    // Check if value actually changed
    if (value !== valueRef.current) {
      // Clear any existing animation timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      setIsValueChanged(true);
      setPrevValue(valueRef.current); // Store the previous value
      valueRef.current = value; // Update the current value

      // Reset animation state after duration
      animationTimeoutRef.current = setTimeout(() => {
        setIsValueChanged(false);
      }, 600); // Slightly longer duration for the full animation sequence
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [value]);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group overflow-hidden min-w-0 flex-1
                bg-gradient-to-br from-[#0f1423] via-[#151b2e] to-[#0f1423]
                backdrop-blur-xl backdrop-saturate-150
                border border-blue-400/20
                shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px]
                rounded-xl
                hover:border-blue-400/30 transition-colors duration-300"
    >
      <div className="flex items-stretch h-full w-full">
        <motion.div 
          className="bg-[#0f1423] px-4 py-[0.7rem] flex items-center border-r border-blue-400/20 shrink-0"
          whileHover={{ backgroundColor: '#131b2e' }}
          transition={{ duration: 0.2 }}
        >
          <motion.span 
            className="text-[1.8rem] text-[#e5e5e5] font-medium whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {label}
          </motion.span>
        </motion.div>

        {/* Value container with AnimatePresence for smooth transitions */}
        <div className="flex-1 px-4 py-[0.7rem] flex items-center justify-end min-w-0 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span 
              key={value} // Key prop ensures animation triggers on value change
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                scale: isValueChanged ? [1, 1.05, 1] : 1,
                color: isValueChanged 
                  ? ['#e5e5e5', '#4ade80', '#e5e5e5']
                  : '#e5e5e5'
              }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                scale: { duration: 0.4 },
                color: { duration: 0.4 }
              }}
              className="text-[1.8rem] text-right whitespace-nowrap overflow-hidden text-ellipsis absolute right-4"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced gradient border animation */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59,130,246,0.1), rgba(59,130,246,0.05), rgba(59,130,246,0.1))',
            'linear-gradient(225deg, rgba(59,130,246,0.1), rgba(59,130,246,0.05), rgba(59,130,246,0.1))'
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Enhanced value change flash effect */}
      <AnimatePresence>
        {isValueChanged && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ 
              opacity: [0.5, 0],
              scale: [0.8, 1.2],
              background: [
                'rgba(59, 130, 246, 0.2)',
                'rgba(74, 222, 128, 0.2)',
                'rgba(59, 130, 246, 0)'
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-xl"
          />
        )}
      </AnimatePresence>

      {/* Subtle pulse on value change */}
      <AnimatePresence>
        {isValueChanged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0],
              scale: [1, 1.5]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-blue-400 rounded-xl"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InfoBox; 