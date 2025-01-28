import React, { useState, useRef, useEffect } from 'react';
import { BackgroundGradient } from '../../ui/background-gradient';

const formatPlayerName = (fullName) => {
  if (!fullName) return '';
  const nameParts = fullName.split(' ');
  if (nameParts.length <= 2) return fullName;
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
};

const BatsmanCard = ({ batsman, isAnimated }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldSweep, setShouldSweep] = useState(false);
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  const [autoHover, setAutoHover] = useState(false);
  const prevStatsRef = useRef({ 
    runs: batsman?.runs,
    fours: batsman?.fours,
    sixes: batsman?.sixes
  });
  const animationLockRef = useRef(false);
  const prevBatsmanName = useRef(batsman?.name);

  // Track strike changes
  useEffect(() => {
    if (batsman?.onStrike && !batsman.onStrike !== prevBatsmanName.current) {
      prevBatsmanName.current = batsman.onStrike;
      setAutoHover(true);
      const timer = setTimeout(() => {
        setAutoHover(false);
      }, 3000); // 3 seconds of hover effect
      return () => clearTimeout(timer);
    }
  }, [batsman?.onStrike]);

  // Handle strike changes with sweep animation
  useEffect(() => {
    if (batsman?.onStrike && !animationLockRef.current) {
      setShouldSweep(true);
      setTimeout(() => setShouldSweep(false), 800);
    }
  }, [batsman?.onStrike]);

  // Handle special events with celebration animation
  useEffect(() => {
    if (!animationLockRef.current && batsman) {
      const newRuns = batsman.runs || 0;
      const prevRuns = prevStatsRef.current.runs || 0;
      
      const hasNewFour = batsman.fours > (prevStatsRef.current.fours || 0);
      const hasNewSix = batsman.sixes > (prevStatsRef.current.sixes || 0);
      
      // Check for milestones (50s, 100s, 150s, 200s)
      const crossedMilestone = 
        (prevRuns < 50 && newRuns >= 50) ||
        (prevRuns < 100 && newRuns >= 100) ||
        (prevRuns < 150 && newRuns >= 150) ||
        (prevRuns < 200 && newRuns >= 200);

      if (hasNewFour || hasNewSix || crossedMilestone) {
        animationLockRef.current = true;
        setShouldCelebrate(true);

        const card = document.querySelector(`[data-player-id="${batsman.name}"]`);
        if (card) {
          card.classList.add('animate-smooth-hover');
          
          setTimeout(() => {
            card.classList.remove('animate-smooth-hover');
            setShouldCelebrate(false);
            animationLockRef.current = false;
          }, 2500);
        }
      }

      prevStatsRef.current = {
        runs: batsman.runs,
        fours: batsman.fours,
        sixes: batsman.sixes
      };
    }
  }, [batsman?.runs, batsman?.fours, batsman?.sixes]);

  // Add new useEffect for milestone triggers
  useEffect(() => {
    if (!animationLockRef.current && batsman) {
      const newRuns = batsman.runs || 0;
      const prevRuns = prevStatsRef.current.runs || 0;
      
      const hasNewFour = batsman.fours > (prevStatsRef.current.fours || 0);
      const hasNewSix = batsman.sixes > (prevStatsRef.current.sixes || 0);
      
      // Check for milestones
      const crossedMilestone = 
        (prevRuns < 50 && newRuns >= 50) ||
        (prevRuns < 100 && newRuns >= 100) ||
        (prevRuns < 150 && newRuns >= 150) ||
        (prevRuns < 200 && newRuns >= 200);

      if (hasNewFour || hasNewSix || crossedMilestone) {
        animationLockRef.current = true;
        setAutoHover(true);
        
        // Reset after animation duration
        setTimeout(() => {
          setAutoHover(false);
          animationLockRef.current = false;
        }, 300); // Match CSS transition duration
      }

      prevStatsRef.current = {
        runs: batsman.runs,
        fours: batsman.fours,
        sixes: batsman.sixes
      };
    }
  }, [batsman?.runs, batsman?.fours, batsman?.sixes]);

  return (
    <BackgroundGradient
      containerClassName="w-full"
      className="glow-box p-0 flex flex-col premium-box-shadow content-box-glow group animated-content-box"
      gradientColors={{
        start: "#3b82f6",
        middle: "#60a5fa",
        end: "#93c5fd",
        base: "#1d4ed8"
      }}
    >
      <div className="px-8 pt-4 pb-0 flex-1 relative overflow-hidden">
        {/* Animated gradient overlay - Same as BowlerCard */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-400/5 to-blue-500/0 
                      translate-x-[-200%] group-hover:translate-x-[200%] 
                      transition-transform duration-1000 ease-in-out"></div>
        
        <div className="flex items-center justify-between gap-6 relative">
          <div className="relative">
            {/* Premium backdrop glow based on player type */}
            <div className="absolute -inset-[2px] z-0 
                            bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20
                            blur-md rounded-t-lg"></div>
            
            <div className={`relative w-[12.5rem] h-50 overflow-hidden
                            rounded-t-[10px]
                            border-t border-l border-r border-[#4169e1]
                            shadow-[0_0_15px_rgba(59,130,246,0.5)]
                            group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                            transform hover:scale-105 transition-all duration-500
                            before:absolute before:inset-0 before:z-10 
                            before:bg-gradient-to-t before:from-black/20 before:to-transparent
                            after:absolute after:inset-0 after:z-20 
                            after:bg-gradient-to-b after:from-white/10 after:via-transparent after:to-black/30`}>
              
              {/* Ambient light effect */}
              <div className="absolute inset-0 z-15
                              bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_70%)]">
              </div>

              {/* Edge highlight */}
              <div className="absolute inset-0 z-20 
                              bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>

              {/* Premium overlay */}
              <div className="absolute inset-0 z-25
                              bg-gradient-to-b from-blue-400/10 via-transparent to-blue-900/20
                              opacity-60"></div>

              {batsman?.image && (
                <img 
                  src={batsman.image}
                  alt={batsman.name || ''}
                  className={`w-full h-full transition-all duration-700
                    ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    motion-safe:transform motion-safe:backface-hidden
                    relative top-[7px]`}
                  style={{ 
                    imageRendering: 'high-quality',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    filter: 'contrast(1.1) saturate(1.1) brightness(1.05)',
                    transform: 'perspective(1000px) rotateY(0deg) scale(1.02)',
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
            {batsman?.onStrike && (
              <div className="absolute top-2 right-2 w-6 h-6 
                bg-gradient-to-br from-[#FFD700] to-[#FFA500]
                rounded-full 
                animate-[pulse_1.5s_ease-in-out_infinite] 
                shadow-lg shadow-[#FFD700]/50
                border-2 border-[#1a1f3c]
                group-hover:shadow-xl group-hover:shadow-[#FFD700]/60
                before:content-[''] before:absolute before:inset-0 
                before:rounded-full before:bg-gradient-to-br 
                before:from-[#FFD700] before:to-[#FFA500] 
                before:animate-[glow_1.5s_ease-in-out_infinite]
                after:content-[''] after:absolute after:inset-[-2px]
                after:rounded-full after:bg-[#FFD700]/30
                after:animate-[pulse_1.5s_ease-in-out_infinite_0.3s]"
              ></div>
            )}
          </div>
          <div className="text-right flex-1">
            <div className="text-[2.5rem] font-bold mb-4 text-right 
                          truncate whitespace-nowrap max-w-[309px]"
                 title={batsman?.name}>
              <span className="text-[2.5rem] font-medium whitespace-nowrap
                  text-[#e5e5e5] leading-none
                  drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  {batsman.name}
              </span>
            </div>
            <div className="text-[3.6rem] font-bold text-[#e5e5e5] leading-none
                          drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
              {batsman?.runs}{' '}
              <span className="text-[2.4rem] text-gray-400">
                  ({batsman?.balls})
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-[1.8rem] text-gray-300 
                    bg-gradient-to-r from-[#2a2f4c]/50 via-[#2a2f4c]/60 to-[#2a2f4c]/50
                    px-8 py-4 rounded-b-lg
                    group-hover:from-[#2a2f4c]/60 group-hover:via-[#2a2f4c]/70 group-hover:to-[#2a2f4c]/60 
                    transition-all duration-500">
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">4s:</span>
          <span className="font-semibold group-hover:text-white transition-colors duration-500">{batsman?.fours}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">6s:</span>
          <span className="font-semibold group-hover:text-white transition-colors duration-500">{batsman?.sixes}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">SR:</span>
          <span className="font-semibold group-hover:text-white transition-colors duration-500">{batsman?.strikeRate}</span>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default BatsmanCard; 