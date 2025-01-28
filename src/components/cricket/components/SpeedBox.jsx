import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeedBox = ({ speedData }) => {
  // States
  const [currentBall, setCurrentBall] = useState({
    over: '',
    speed: ''
  });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [speedTrend, setSpeedTrend] = useState('');
  const [displaySpeed, setDisplaySpeed] = useState('0');
  const [needleAngle, setNeedleAngle] = useState(-90);
  const [isVisible, setIsVisible] = useState(false);

  // Add a ref to track previous speed data
  const prevSpeedRef = useRef(null);
  
  // Helper to check if speed data has actually changed
  const hasSpeedChanged = (newData, prevData) => {
    if (!newData || !newData[0]) return false;
    if (!prevData) return true;
    
    const newSpeed = newData[0].data?.Ball_Speed || newData[0].Ball_Speed;
    const prevSpeed = prevData[0].data?.Ball_Speed || prevData[0].Ball_Speed;
    
    return newSpeed !== prevSpeed;
  };

  // Helper functions
  const getSpeedNumber = (speedString) => {
    if (!speedString || speedString === '') return 0;
    // Extract number from strings like "138.4kph"
    const match = speedString.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[0]) : 0;
  };

  const getSpeedColor = (speed) => {
    const speedNum = getSpeedNumber(speed);
    if (speedNum >= 140) return '#FF0000';
    if (speedNum >= 130) return '#FF6B00';
    if (speedNum >= 120) return '#FFA500';
    return '#FFD700';
  };

  const calculateNeedleAngle = (speed) => {
    const speedNum = getSpeedNumber(speed);
    return -90 + (speedNum * 180 / 160);
  };

  // Get current speed value - Move this before the effects
  const speed = speedData?.[0]?.data?.Ball_Speed || speedData?.[0]?.Ball_Speed || currentBall.speed;
  const speedColor = getSpeedColor(speed);

  // Effects
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (speedData && hasSpeedChanged(speedData, prevSpeedRef.current)) {
      console.log('Processing new speed data:', speedData);
      
      // Update the previous speed ref
      prevSpeedRef.current = speedData;

      // Extract data from the nested structure
      const ballData = speedData[0].data || speedData[0];
      
      // Only update if we have valid speed data
      if (ballData.Ball_Speed && ballData.Ball_Speed !== '') {
        setCurrentBall({
          over: ballData.Over,
          speed: ballData.Ball_Speed
        });

        // Rest of your speed update logic...
      }
    }
  }, [speedData]);

  useEffect(() => {
    if (speedData && speedData[0]?.Ball_Speed !== currentBall.speed) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 6750);

      return () => clearTimeout(timer);
    }
  }, [speedData, currentBall.speed]);

  // Smooth animation effect for speed
  useEffect(() => {
    const targetSpeed = getSpeedNumber(speed);
    const startTime = Date.now();
    const duration = 3000;

    const animateSpeed = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      // Animate speed number
      const currentSpeed = Math.round(targetSpeed * easeProgress);
      setDisplaySpeed(currentSpeed.toString());

      // Animate needle - sync with speed number animation
      const startAngle = -90;
      const targetAngle = calculateNeedleAngle(speed);
      const currentAngle = startAngle + (targetAngle - startAngle) * easeProgress;
      setNeedleAngle(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animateSpeed);
      }
    };

    requestAnimationFrame(animateSpeed);
  }, [speed]);

  const variants = {
    initial: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    animate: { 
      opacity: 1,
      y: 107,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.9
      }
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-20" style={{ pointerEvents: 'none' }}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <div className="relative">
            {/* Backdrop and Main Container Group */}
            <div className="fixed right-[1.5rem] top-[580px]"> {/* Parent container to group both elements */}
              {/* Backdrop */}
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className="absolute w-[320px] h-[64px] bg-[#0d1631]/60 backdrop-blur-md rounded-xl 
                          pointer-events-auto"
              />

              {/* Main container */}
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className="absolute w-[320px] h-[64px]
                          bg-gradient-to-br from-[#0f1423]/95 via-[#151b2e] to-[#0f1423]/95
                          backdrop-blur-xl backdrop-saturate-150
                          border border-blue-400/30
                          shadow-[0_22px_70px_4px_rgba(0,0,0,0.56),_inset_0_1px_1px_rgba(255,255,255,0.1)]
                          rounded-xl flex items-center gap-2 px-4
                          overflow-hidden
                          after:absolute after:inset-0 after:rounded-xl 
                          after:bg-gradient-to-t after:from-blue-500/5 after:via-transparent after:to-white/5
                          after:animate-shimmer
                          pointer-events-auto
                          relative"
              >
                {/* Add gradient container */}
                <div className="absolute inset-0 blur-lg">
                  <div className="absolute [background:radial-gradient(circle_at_center,_rgba(18,113,255,0.8)_0,_rgba(18,113,255,0)_50%)_no-repeat] 
                                [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[10%] left-[10%]
                                animate-first opacity-100" />
                  <div className="absolute [background:radial-gradient(circle_at_center,_rgba(221,74,255,0.8)_0,_rgba(221,74,255,0)_50%)_no-repeat]
                                [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[10%] left-[10%]
                                animate-second opacity-100" />
                  <div className="absolute [background:radial-gradient(circle_at_center,_rgba(100,220,255,0.8)_0,_rgba(100,220,255,0)_50%)_no-repeat]
                                [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[10%] left-[10%]
                                animate-third opacity-100" />
                  <div className="absolute [background:radial-gradient(circle_at_center,_rgba(200,50,50,0.8)_0,_rgba(200,50,50,0)_50%)_no-repeat]
                                [mix-blend-mode:hard-light] w-[80%] h-[80%] top-[10%] left-[10%]
                                animate-fourth opacity-70" />
                </div>

                {/* Existing content */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-[length:16px_16px] opacity-10" />

                {/* Over Number in Premium Animated Circle */}
                <div className="relative flex items-center">
                  <div className="relative flex">
                    <div className="relative w-[calc(1.5ch_+_48px)] h-[48px]">
                      {/* Outer rotating rings with premium effects */}
                      <div className="absolute inset-0 rounded-full border-[1.5px] border-blue-400/40
                                    animate-[spin_4s_linear_infinite]" />
                      <div className="absolute inset-0 rounded-full border-[1.5px] border-blue-500/30
                                    animate-[spin_6s_linear_infinite_reverse]" />
                      
                      {/* Dynamic pulsing rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-blue-400/40
                                    animate-[premium-pulse_3s_ease-in-out_infinite]" />
                      <div className="absolute inset-[-2px] rounded-full border border-blue-300/20
                                    animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                      
                      {/* Glowing background layers */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r 
                                    from-blue-500/10 via-blue-400/5 to-blue-500/10
                                    animate-[premium-gradient_4s_ease_infinite]" />
                      <div className="absolute inset-0 rounded-full bg-blue-500/5 backdrop-blur-sm" />
                      
                      {/* Premium inner glow */}
                      <div className="absolute inset-1 rounded-full bg-gradient-to-b 
                                    from-white/10 via-transparent to-black/20" />
                      
                      {/* Over number with enhanced styling */}
                      <div className="absolute inset-0 flex items-center justify-center
                                    text-3xl font-medium leading-none backdrop-blur-[2px]
                                    animate-[premium-float_3s_ease-in-out_infinite]">
                        <span className="text-white/90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                          {speedData?.[0]?.data?.Over || currentBall.over}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Speedometer Arc */}
                <div className="relative w-[80px] h-[40px] flex-shrink-0 translate-x-[9px] translate-y-[3px]">
                  <svg viewBox="0 0 100 60" className="w-full h-full relative">
                    <defs>
                      {/* Enhanced metallic gradient */}
                      <linearGradient id="metallic" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                        <stop offset="50%" stopColor="rgba(120,120,120,0.5)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0.7)"/>
                      </linearGradient>

                      {/* Ultra premium glow effect */}
                      <filter id="premium-glow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur1"/>
                        <feGaussianBlur in="blur1" stdDeviation="2" result="blur2"/>
                        <feMerge>
                          <feMergeNode in="blur2"/>
                          <feMergeNode in="blur1"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>

                      {/* Dynamic arc gradient */}
                      <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={`${speedColor}20`}>
                          <animate attributeName="stop-color"
                            values={`${speedColor}20;${speedColor}40;${speedColor}20`}
                            dur="2s"
                            repeatCount="indefinite"/>
                        </stop>
                        <stop offset="50%" stopColor={speedColor}>
                          <animate attributeName="stop-color"
                            values={`${speedColor};${speedColor}cc;${speedColor}`}
                            dur="2s"
                            repeatCount="indefinite"/>
                        </stop>
                        <stop offset="100%" stopColor={`${speedColor}20`}>
                          <animate attributeName="stop-color"
                            values={`${speedColor}20;${speedColor}40;${speedColor}20`}
                            dur="2s"
                            repeatCount="indefinite"/>
                        </stop>
                      </linearGradient>

                      {/* Holographic effect */}
                      <linearGradient id="holographic" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)"/>
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)">
                          <animate attributeName="offset" values="1;0" dur="2s" repeatCount="indefinite"/>
                        </stop>
                      </linearGradient>
                    </defs>

                    {/* Background ring with depth effect */}
                    <path
                      d="M10 47 A 40 40 0 0 1 90 47"
                      fill="none"
                      stroke="url(#arcGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.1"
                      filter="url(#premium-glow)"
                    />

                    {/* Enhanced tick marks with glow */}
                    {[...Array(9)].map((_, i) => (
                      <g key={i} transform={`rotate(${i * 22.5 - 90}, 50, 45)`}>
                        <line
                          x1="50"
                          y1="20"
                          x2="50"
                          y2={i % 2 === 0 ? "23" : "21"}
                          stroke={i % 2 === 0 ? speedColor : "#4A4A4A"}
                          strokeWidth={i % 2 === 0 ? "1.5" : "0.5"}
                          opacity={i % 2 === 0 ? "0.8" : "0.4"}
                          filter={i % 2 === 0 ? "url(#premium-glow)" : "none"}
                        />
                        {i % 2 === 0 && (
                          <text
                            x="50"
                            y="17"
                            fill={speedColor}
                            fontSize="3.5"
                            textAnchor="middle"
                            transform={`rotate(${90 - i * 22.5}, 50, 17)`}
                            style={{ fontWeight: 600 }}
                            filter="url(#premium-glow)"
                          >
                            {Math.round(i * 20)}
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Main colored arc with premium effect */}
                    <path
                      d="M10 45 A 40 40 0 0 1 90 45"
                      fill="none"
                      stroke={`url(#arcGradient)`}
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#premium-glow)"
                      style={{ opacity: 0.95 }}
                    >
                      <animate
                        attributeName="stroke-width"
                        values="4;4.5;4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Holographic overlay */}
                    <path
                      d="M10 45 A 40 40 0 0 1 90 45"
                      fill="none"
                      stroke="url(#holographic)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Enhanced needle with 3D effect */}
                    <g>
                      {/* Needle shadow with blur */}
                      <line
                        x1="50"
                        y1="45"
                        x2={50 + 25 * Math.cos(((-needleAngle + 90) * Math.PI) / 180)}
                        y2={45 - 25 * Math.sin(((-needleAngle + 90) * Math.PI) / 180)}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="5"
                        filter="blur(2px)"
                      />
                      {/* Needle body with gradient */}
                      <line
                        x1="50"
                        y1="45"
                        x2={50 + 25 * Math.cos(((-needleAngle + 90) * Math.PI) / 180)}
                        y2={45 - 25 * Math.sin(((-needleAngle + 90) * Math.PI) / 180)}
                        stroke={`url(#metallic)`}
                        strokeWidth="3"
                        filter="url(#premium-glow)"
                        style={{
                          transition: 'all 0.5s ease-out'
                        }}
                      />
                      {/* Needle tip with dynamic glow */}
                      <circle
                        cx={50 + 25 * Math.cos(((-needleAngle + 90) * Math.PI) / 180)}
                        cy={45 - 25 * Math.sin(((-needleAngle + 90) * Math.PI) / 180)}
                        r="2"
                        fill={speedColor}
                        filter="url(#premium-glow)"
                      >
                        <animate
                          attributeName="r"
                          values="2;2.5;2"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Enhanced center hub with layered effects */}
                    <circle
                      cx="50"
                      cy="45"
                      r="5"
                      fill="#1a1a1a"
                      filter="url(#premium-glow)"
                    />
                    <circle
                      cx="50"
                      cy="45"
                      r="4"
                      fill={speedColor}
                      opacity="0.8"
                      filter="url(#premium-glow)"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;0.9;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="50"
                      cy="45"
                      r="3"
                      fill="url(#metallic)"
                      opacity="0.9"
                    >
                      <animate
                        attributeName="r"
                        values="3;3.2;3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>

                {/* Speed Text with Animation */}
                <div className="flex items-baseline gap-1 ml-auto relative">
                  {/* Background glow effect */}
                  <div 
                    className="absolute inset-0 blur-xl opacity-30"
                    style={{ 
                      background: `radial-gradient(circle, ${speedColor} 0%, transparent 70%)`,
                      animation: 'pulse 2s infinite'
                    }}
                  />

                  {/* Speed Number */}
                  <div className="relative flex items-baseline">
                    <span 
                      className="text-4xl font-bold relative transform-gpu"
                      style={{ 
                        color: speedColor,
                        textShadow: `0 0 10px ${speedColor}`,
                        animation: 'textPulseAndScale 3s ease-in-out infinite'
                      }}
                    >
                      {displaySpeed}
                      
                      {/* Speed change indicator */}
                      {speedTrend && (
                        <div 
                          className="absolute -right-3 top-0 text-lg transition-all duration-300"
                          style={{ 
                            color: speedColor,
                            opacity: speedTrend ? '0.7' : '0',
                            transform: `translateY(${speedTrend === '↑' ? '-2px' : '2px'})`,
                          }}
                        >
                          {speedTrend}
                        </div>
                      )}
                    </span>

                    {/* Unit (kph) with floating effect */}
                    <span 
                      className="text-2xl opacity-70 ml-2 relative"
                      style={{ 
                        color: speedColor,
                        animation: 'float 3s ease-in-out infinite'
                      }}
                    >
                      kph
                    </span>
                  </div>
                </div>

                {/* Updated styles */}
                <style jsx>{`
                  @keyframes pulse {
                    0% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                    100% { opacity: 0.2; }
                  }

                  @keyframes textPulseAndScale {
                    0% { 
                      opacity: 0.95;
                      text-shadow: 0 0 10px currentColor;
                      transform: scale(1);
                    }
                    50% { 
                      opacity: 1;
                      text-shadow: 0 0 15px currentColor;
                      transform: scale(1.03);
                    }
                    100% { 
                      opacity: 0.95;
                      text-shadow: 0 0 10px currentColor;
                      transform: scale(1);
                    }
                  }

                  @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                    100% { transform: translateY(0px); }
                  }

                  @keyframes premium-pulse {
                    0%, 100% { 
                      opacity: 0.4;
                      transform: scale(1);
                    }
                    50% { 
                      opacity: 0.7;
                      transform: scale(1.02);
                    }
                  }

                  @keyframes premium-float {
                    0%, 100% {
                      transform: translateY(0) rotate(0deg);
                      filter: brightness(1);
                    }
                    50% {
                      transform: translateY(-1px) rotate(0.5deg);
                      filter: brightness(1.2);
                    }
                  }

                  @keyframes premium-gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                  }

                  @keyframes first {
                    0% { transform: translate(0%, 0%) rotate(0deg); }
                    33% { transform: translate(20%, 20%) rotate(120deg); }
                    66% { transform: translate(-20%, 20%) rotate(240deg); }
                    100% { transform: translate(0%, 0%) rotate(360deg); }
                  }
                  @keyframes second {
                    0% { transform: translate(0%, 0%) rotate(0deg); }
                    33% { transform: translate(-20%, -20%) rotate(120deg); }
                    66% { transform: translate(20%, -20%) rotate(240deg); }
                    100% { transform: translate(0%, 0%) rotate(360deg); }
                  }
                  @keyframes third {
                    0% { transform: translate(0%, 0%) rotate(0deg); }
                    33% { transform: translate(20%, -20%) rotate(120deg); }
                    66% { transform: translate(-20%, -20%) rotate(240deg); }
                    100% { transform: translate(0%, 0%) rotate(360deg); }
                  }
                  @keyframes fourth {
                    0% { transform: translate(0%, 0%) rotate(0deg); }
                    33% { transform: translate(-20%, 20%) rotate(120deg); }
                    66% { transform: translate(20%, 20%) rotate(240deg); }
                    100% { transform: translate(0%, 0%) rotate(360deg); }
                  }

                  .animate-first {
                    animation: first 12s ease-in-out infinite;
                  }
                  .animate-second {
                    animation: second 12s ease-in-out infinite;
                  }
                  .animate-third {
                    animation: third 12s ease-in-out infinite;
                  }
                  .animate-fourth {
                    animation: fourth 12s ease-in-out infinite;
                  }
                `}</style>

                {/* Progress Bar */}
                <div className="absolute left-0 bottom-0 w-full h-1">
                  <div 
                    className="h-full"
                    style={{
                      width: `${animationProgress}%`,
                      backgroundColor: speedColor,
                      transition: 'all 0.3s ease-out',
                      boxShadow: `0 0 10px ${speedColor}`
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeedBox; 