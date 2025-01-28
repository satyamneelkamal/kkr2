import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TeamScoreBox = ({ teamName, score, overs, logo, isReversed = false }) => {
  const [prevScore, setPrevScore] = useState(score);
  const [isScoreIncreased, setIsScoreIncreased] = useState(false);
  
  // Format team name if it has 3 or more words
  const formatTeamName = (name) => {
    if (!name) return '';
    
    const cleanName = name.trim().replace(/\s+/g, ' ');
    const words = cleanName.split(' ').filter(word => word.length > 0);
    
    if (words.length >= 4) {
      const initials = words
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
      return initials;
    }
    
    return cleanName;
  };

  const displayName = formatTeamName(teamName);

  // Track score changes for animation
  useEffect(() => {
    if (score !== prevScore) {
      setIsScoreIncreased(true);
      const timer = setTimeout(() => setIsScoreIncreased(false), 1000);
      setPrevScore(score);
      return () => clearTimeout(timer);
    }
  }, [score, prevScore]);

  // Animation variants
  const scoreVariants = {
    increased: {
      scale: [1, 1.1, 1],
      color: ['#e5e5e5', '#4ade80', '#e5e5e5'],
      transition: { duration: 0.5 }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.5))',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={`flex items-center gap-6 ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
      <motion.div 
        className="w-12 h-12 flex-shrink-0 relative"
        whileHover="hover"
      >
        {logo && (
          <motion.img 
            src={logo} 
            alt="" 
            className="w-full h-full object-contain"
            variants={logoVariants}
          />
        )}
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md -z-10" />
      </motion.div>
      
      <div className={`flex items-baseline gap-3 ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}>
        <motion.div 
          className="text-2xl font-bold text-[#e5e5e5] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]" 
          title={teamName}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {displayName}
        </motion.div>
        <div className="flex items-baseline gap-2">
          <motion.span 
            className="text-8xl font-bold text-[#e5e5e5] tracking-tight leading-none
                     drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]"
            animate={isScoreIncreased ? "increased" : ""}
            variants={scoreVariants}
          >
            {score}
          </motion.span>
          <AnimatePresence>
            {overs && (
              <motion.span 
                className="text-2xl text-blue-300/80 relative group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                ({overs} ov)
                {/* Hover effect for overs */}
                <span className="absolute inset-0 bg-blue-400/10 rounded-lg -z-10 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add subtle gradient background */}
      <style jsx>{`
        .flex {
          position: relative;
        }
        .flex::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(59, 130, 246, 0.05)
          );
          border-radius: 0.5rem;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .flex:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TeamScoreBox; 