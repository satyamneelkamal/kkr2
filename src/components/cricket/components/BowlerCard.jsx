import React, { useState, useRef, useEffect } from 'react';
import { BackgroundGradient } from '../../ui/background-gradient';

const formatPlayerName = (fullName) => {
  if (!fullName) return '';
  const nameParts = fullName.split(' ');
  if (nameParts.length <= 2) return fullName;
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`;
};

const BowlerCard = ({ bowler, isAnimated }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldSweep, setShouldSweep] = useState(false);
  const [shouldCelebrate, setShouldCelebrate] = useState(false);
  const [autoHover, setAutoHover] = useState(false);
  const prevStatsRef = useRef({ wickets: bowler?.wickets, maidens: bowler?.maidens });
  const animationLockRef = useRef(false);
  const prevBowlerName = useRef(bowler?.name);

  // Track bowler changes
  useEffect(() => {
    if (bowler?.name && bowler.name !== prevBowlerName.current) {
      prevBowlerName.current = bowler.name;
      setAutoHover(true);
      const timer = setTimeout(() => {
        setAutoHover(false);
      }, 3000); // 3 seconds of hover effect
      return () => clearTimeout(timer);
    }
  }, [bowler?.name]);

  // Handle bowler changes with sweep animation
  useEffect(() => {
    if (bowler?.name && !animationLockRef.current) {
      setShouldSweep(true);
      setTimeout(() => setShouldSweep(false), 800);
    }
  }, [bowler?.name]);

  // Handle special events with celebration animation
  useEffect(() => {
    if (!animationLockRef.current && bowler) {
      const hasNewWicket = bowler.wickets > (prevStatsRef.current.wickets || 0);
      const hasNewMaiden = bowler.maidens > (prevStatsRef.current.maidens || 0);
      // Add hat-trick logic here if available in your data

      if (hasNewWicket || hasNewMaiden) {
        animationLockRef.current = true;
        setShouldCelebrate(true);

        const card = document.querySelector(`[data-bowler-id="${bowler.name}"]`);
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
        wickets: bowler.wickets,
        maidens: bowler.maidens
      };
    }
  }, [bowler?.wickets, bowler?.maidens]);

  // Add new useEffect for milestone triggers
  useEffect(() => {
    if (!animationLockRef.current && bowler) {
      const hasNewWicket = bowler.wickets > (prevStatsRef.current.wickets || 0);
      const hasNewMaiden = bowler.maidens > (prevStatsRef.current.maidens || 0);
      
      // Check for hat-trick (if data available)
      const hasHatTrick = false; // Implement your hat-trick logic here

      if (hasNewWicket || hasNewMaiden || hasHatTrick) {
        animationLockRef.current = true;
        setAutoHover(true);
        
        // Reset after animation duration
        setTimeout(() => {
          setAutoHover(false);
          animationLockRef.current = false;
        }, 300); // Match CSS transition duration
      }

      prevStatsRef.current = {
        wickets: bowler.wickets,
        maidens: bowler.maidens
      };
    }
  }, [bowler?.wickets, bowler?.maidens]);

  return (
    <BackgroundGradient
      containerClassName="w-full"
      className="glow-box p-0 flex flex-col premium-box-shadow content-box-glow group animated-content-box"
      gradientColors={{
        start: "#ef4444",
        middle: "#f87171",
        end: "#fca5a5",
        base: "#b91c1c"
      }}
    >
      <div className="px-8 pt-4 pb-0 flex-1 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-400/5 to-red-500/0 
                      translate-x-[-200%] group-hover:translate-x-[200%] 
                      transition-transform duration-1000 ease-in-out"></div>
        
        <div className="flex items-center justify-between gap-6 relative">
          <div className="relative">
            {/* Premium backdrop glow based on player type */}
            <div className="absolute -inset-[2px] z-0 
                            bg-gradient-to-r from-red-500/20 via-red-400/10 to-red-500/20
                            blur-md rounded-t-lg"></div>
            
            <div className={`relative w-[12.5rem] h-50 overflow-hidden
                          rounded-t-[10px]
                          border-t border-l border-r border-[#4169e1]
                          shadow-[0_0_15px_rgba(239,68,68,0.5)]
                          group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]
                          transform hover:scale-105 transition-all duration-500
                          before:absolute before:inset-0 before:z-10 
                          before:bg-gradient-to-t before:from-black/20 before:to-transparent
                          after:absolute after:inset-0 after:z-20 
                          after:bg-gradient-to-b after:from-white/10 after:via-transparent after:to-black/30`}>
              {/* Ambient light effect */}
              <div className="absolute inset-0 z-15
                              bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_70%)]">
              </div>

              {/* Edge highlight */}
              <div className="absolute inset-0 z-20 
                              bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>

              {/* Premium overlay */}
              <div className="absolute inset-0 z-25
                              bg-gradient-to-b from-red-400/10 via-transparent to-red-900/20
                              opacity-60"></div>

              {bowler?.image && (
                <img 
                  src={bowler.image}
                  alt={bowler.name || ''}
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

              {/* Enhanced shine effect */}
              <div className="absolute inset-0 z-30 
                              bg-gradient-to-tr from-transparent via-white/10 to-transparent 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-700 
                              animate-[shine_2s_infinite]">
              </div>
            </div>
          </div>
          <div className="text-right flex-1">
            <div className="text-[2.5rem] font-bold mb-4 text-right 
                          truncate whitespace-nowrap max-w-[309px]"
                 title={bowler?.name}>
              <span className="text-[2.5rem] font-medium whitespace-nowrap
                  text-[#e5e5e5] leading-none
                  drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                {bowler?.name}
              </span>
            </div>
            <div className="text-[3.6rem] font-bold text-[#e5e5e5] leading-none
                          drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
              {bowler?.wickets}-{bowler?.runs}{' '}
              <span className="text-[2.4rem] text-gray-400">
                ({bowler?.overs})
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-[1.8rem] text-gray-300 
                    bg-gradient-to-r from-[#2a2f4c]/50 via-[#2a2f4c]/60 to-[#2a2f4c]/50
                    px-8 py-4 rounded-b-lg
                    group-hover:from-[#2a2f4c]/60 group-hover:via-[#2a2f4c]/70 group-hover:to-[#2a2f4c]/60 
                    transition-all duration-500">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">E:</span>
          <span className="font-semibold group-hover:text-white transition-colors duration-500">
            {bowler?.economy}
          </span>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default BowlerCard;