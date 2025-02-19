import React, { useState, useEffect, useRef, useMemo } from 'react';
import { flushSync } from 'react-dom';
import BatsmanCard from './components/BatsmanCard';
import BowlerCard from './components/BowlerCard';
import ScoreboardRow from './components/ScoreboardRow';
import WinProbabilityBar from './components/WinProbabilityBar';
import ProjectedScoreCard from './components/ProjectedScoreCard';
import SpeedBox from './components/SpeedBox';
import './styles/animations.css';
import './styles/common.css';
import ScoreRight from './components/ScoreRight';
import InfoBox from './components/InfoBox';
import chromeApi from '../../utils/chromeApi';
import WeatherDisplay from './components/WeatherDisplay';
import MatchBasicInfo from './components/MatchBasicInfo';
import Scorecard from './components/scorecard/Scorecard';
import { BackgroundGradientAnimation } from '../../components/ui/background-gradient-animation';

// Add these constants at the top of the file
const MINIMUM_UPDATE_INTERVAL = 1000; // 1 second minimum between updates
let lastUpdateTime = 0; // Track last update time

// Replace hardcoded URLs with environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getBallTypeClass = (type) => {
  switch (type) {
    case 'wicket': return 'bg-[#ff0000] text-white'; // Red
    case 'four': return 'bg-[#4169e1] text-white'; // Royal Blue
    case 'six': return 'bg-[#4169e1] text-white'; // Royal Blue
    case 'wide': return 'bg-[#ff0000] text-white'; // Red
    case 'noball': return 'bg-[#4169e1] text-white'; // Royal Blue
    case 'legbye': return 'bg-[#1e1e1e] text-white'; // Dark gray
    case 'bye': return 'bg-[#1e1e1e] text-white'; // Dark gray
    case 'single': return 'bg-[#1e1e1e] text-white'; // Dark gray
    case '0': return 'bg-[#1e1e1e] text-white'; // Dark gray
    default: return 'bg-[#1e1e1e] text-white'; // Dark gray
  }
};

// Add this utility function outside the component
const useAnimationClass = (value, duration = 300) => {
  const [animationClass, setAnimationClass] = useState('');
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setAnimationClass('number-spring');
      prevValue.current = value;
      
      const timer = setTimeout(() => {
        setAnimationClass('');
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [value, duration]);

  return animationClass;
};

const InfoDisplay = ({ stadium, reviews }) => {
  const [showStadium, setShowStadium] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStadium(prev => !prev);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[4.5rem] flex justify-end min-w-[300px]">
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-1000 ${showStadium ? 'opacity-100' : 'opacity-0'}`}>
        {stadium && (
          <div className="px-6 py-2 rounded-lg 
                       bg-slate-800/50 backdrop-blur-sm
                       border border-slate-700/50
                       whitespace-nowrap">
            <div className="text-[1.7rem] flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" 
                   className="h-8 w-8 text-blue-400/70 flex-shrink-0"
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-slate-300 font-medium">
                {stadium.replace(/ \([^)]*\)/g, '')}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={`absolute right-0 top-1/2 -translate-y-1/2 transition-opacity duration-1000 ${!showStadium ? 'opacity-100' : 'opacity-0'}`}>
        {reviews && (
          <div className="px-6 py-2 rounded-lg 
                       bg-slate-800/50 backdrop-blur-sm
                       border border-slate-700/50
                       whitespace-nowrap">
            <div className="text-[1.7rem] flex items-center gap-3">
              <svg
                className="h-8 w-8 text-yellow-400/70 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3.5c-1.5 0-2.5.5-3 1.5-.3.6-.5 1.5-.5 2.5v1h7v-1c0-1-.2-1.9-.5-2.5-.5-1-1.5-1.5-3-1.5z"
                  fill="currentColor"
                />
                <path
                  d="M8 9.5v2c0 2.2 1.8 4 4 4s4-1.8 4-4v-2h-8z"
                  fill="currentColor"
                />
                <path
                  d="M12 16.5c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z"
                  fill="currentColor"
                />
                <path
                  d="M7 8.5h10M9.5 8.5v2M14.5 8.5v2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="11.5"
                  r="1"
                  fill="white"
                />
              </svg>
              <span className="text-slate-300 font-medium">
                {reviews.team1.replace(/^([^-]+) - (\d+) of (\d+)$/, (_, team, current, total) => 
                  `${team} - ${current} (${total})`
                )} | {reviews.team2.replace(/^([^-]+) - (\d+) of (\d+)$/, (_, team, current, total) => 
                  `${team} - ${current} (${total})`
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Keep only these essential style constants
const layerStyles = `
  .premium-glass {
    background: none;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .rotating-background {
    display: none;
  }

  .content-box {
    background: none;
    border: 1px solid rgba(99, 139, 250, 0.15);
  }
`;

const commonStyles = `
  .premium-box-shadow {
    box-shadow: 
      rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
      rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
      rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
      rgba(0, 0, 0, 0.06) 0px 2px 1px;
  }
`;

const additionalStyles = `
  .glow-box.p-4.animated-content-box.premium-box-shadow.content-box-glow {
    height: 8rem;
  }

  .glow-box, .dark-box {
    background: linear-gradient(45deg, darkblue, #140303);
    border: 1px solid rgba(99, 139, 250, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .glow-box:hover, .dark-box:hover {
    background: linear-gradient(45deg, darkblue, #140303);
    border-color: rgba(99, 139, 250, 0.25);
  }
`;

// Add this function before the LiveCricketScorecard component
const renderRecentOvers = (over, index) => (
  <div key={index} 
       className={`flex-1 relative group min-w-fit
                bg-gradient-to-br from-[#0f1423] via-[#151b2e] to-[#0f1423]
                backdrop-blur-xl backdrop-saturate-150
                border border-blue-400/20
                shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px]
                rounded-xl
                ${index === 0 ? 'max-w-[180px]' : ''}`}>  {/* Add max-width only to first over */}
    <div className="flex items-center justify-between py-[0.7rem] px-4 relative w-full">
      {/* Balls container */}
      <div className="flex-shrink-0">
        {/* For 22ND over - truncate from left if needed */}
        {over.type !== 'This Over' && over.type !== 'Last Over:' && (
          <div className="flex items-center gap-2">
            {over.balls?.length > 6 && (
              <span className="flex-shrink-0 text-xl font-bold text-white/50 mr-1">...</span>
            )}
            <div className="flex gap-[0.4rem] whitespace-nowrap">  {/* Reduce gap between balls */}
              {over.balls?.slice(-6).map((ball, ballIndex) => (
                <span
                  key={ballIndex}
                  className={`${index === 0 ? 'w-10 h-10' : 'w-12 h-12'} flex-shrink-0 flex items-center justify-center 
                           rounded-full text-2xl font-bold 
                           ${getBallTypeClass(ball.type)} 
                           text-white shadow-lg hover:shadow-xl
                           transition-all duration-300`}
                >
                  {ball.value}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* For LAST and THIS overs - show all balls */}
        {(over.type === 'This Over' || over.type === 'Last Over:') && (
          <div className="flex items-center gap-2">
            <div className="flex gap-2 whitespace-nowrap">
              {over.balls?.map((ball, ballIndex) => (
                <span
                  key={ballIndex}
                  className={`w-12 h-12 flex-shrink-0 flex items-center justify-center 
                           rounded-full text-2xl font-bold 
                           ${getBallTypeClass(ball.type)} 
                           text-white shadow-lg hover:shadow-xl
                           transition-all duration-300`}
                >
                  {ball.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Over label and total */}
      <div className="flex items-center gap-3 ml-auto pl-4">  {/* Reduce left padding */}
        <div className="px-3 py-2 rounded-lg  {/* Reduce horizontal padding */}
                     bg-gradient-to-br from-[#0f1423]/98 to-[#151b2e]/98
                     border border-blue-400/20">
          <span className={`${index === 0 ? 'text-3xl' : 'text-4xl'} font-medium whitespace-nowrap
                       text-[#e5e5e5] leading-none
                       drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]`}>
            {over.type === 'This Over' ? 'This' : 
             over.type === 'Last Over:' ? 'Last' :
             over.type.split(' ')[0]}
          </span>
        </div>
        {over.total && (
          <div className={`${index === 0 ? 'w-12 h-12' : 'w-14 h-14'} flex-shrink-0 flex items-center justify-center
                       rounded-full
                       bg-gradient-to-br from-[#2a2f4c]/80 to-[#1a1f3c]/90
                       border border-blue-400/20`}>
            <span className={`${index === 0 ? 'text-3xl' : 'text-[40px]'} font-bold text-[#e5e5e5] leading-none
                         drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]`}>
              {over.total}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Add this at the top with other state management
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// Update the TestMatchInfo component
const TestMatchInfo = ({ testMatchInfo, last10 }) => {
  if (!testMatchInfo?.daySession && !testMatchInfo?.oversLeft && !last10) return null;

  const formatOversLeft = (oversLeftText) => {
    if (!oversLeftText) return { label: 'OVERS LEFT TODAY', value: '0' };
    const parts = oversLeftText.split(':');
    return {
      label: 'OVERS LEFT TODAY',
      value: parts[1]?.trim() || '0'
    };
  };

  const oversLeftData = formatOversLeft(testMatchInfo.oversLeft);

  const boxStyle = `
    bg-gradient-to-br from-[#0d1621] via-[#131628] to-[#0d1621]
    bg-[length:200%_200%]
    animate-gradientShift
    border border-[rgba(99,139,250,0.15)]
    backdrop-blur-[10px]
    premium-box-shadow
  `;

  const separatorStyle = "w-[1px] h-6 bg-blue-400/20 mx-4";

  return (
    <div className="flex gap-6 h-full"> {/* Changed gap-2 to gap-6 to match grid-cols-2 gap-6 */}
      {/* Left Column - Last 10 and Overs Left */}
      <div className="flex flex-col gap-[0.7rem] flex-1 min-w-0">
        {/* Last 10 Overs Box */}
        {last10 && (
          <div className={`${boxStyle} rounded-lg overflow-hidden`}>
            <div className="px-8 py-4 flex items-center justify-between whitespace-nowrap">
              <span className="text-[2rem] leading-[1.5rem] font-normal">
                LAST 10 OVERS
              </span>
              <div className="flex items-center">
                <div className={separatorStyle}></div>
                <span className="text-[2rem] leading-[1.5rem] font-normal">
                  {last10.runs}/{last10.wickets} (RR: {last10.runRate})
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Overs Left Box */}
        {testMatchInfo.oversLeft && (
          <div className={`${boxStyle} rounded-lg overflow-hidden`}>
            <div className="px-8 py-4 flex items-center justify-between whitespace-nowrap">
              <span className="text-[2rem] leading-[1.5rem] font-normal">
                {oversLeftData.label}
              </span>
              <div className="flex items-center">
                <div className={separatorStyle}></div>
                <span className="text-[2rem] leading-[1.5rem] font-normal">
                  {oversLeftData.value}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Day/Session Box */}
      {testMatchInfo.daySession && (
        <div className={`${boxStyle} w-[220px] rounded-lg overflow-hidden
                      flex flex-col justify-center`}>
          <div className="px-8 flex flex-col justify-center h-full">
            {testMatchInfo.daySession.split(':').map((part, index, array) => (
              <div key={index} className="text-center whitespace-nowrap">
                <span className="text-[2rem] leading-[2rem] font-normal">
                  {part.trim()}
                </span>
                {index < array.length - 1 && (
                  <div className="h-[1px] w-24 bg-blue-400/20 my-2 mx-auto"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LiveCricketScorecard = () => {
  // Initialize cricketData with exact structure
  const [cricketData, setCricketData] = useState({
    matchTitle: '',
    teams: {
      team1: { 
        name: '', 
        score: '', 
        overs: '', 
        logo: '' 
      },
      team2: { 
        name: '', 
        score: '', 
        overs: '', 
        logo: '' 
      }
    },
    currentInnings: {
      CRR: '',
      RRR: ''
    },
    batsmen: [],
    bowler: null,
    recentOvers: [],
    partnership: {
      runs: '',
      balls: '',
      runRate: ''
    },
    lastBat: {
      name: '',
      runs: '',
      balls: ''
    },
    fallOfWicket: {
      score: '',
      overs: ''
    },
    reviews: {
      team1: '',
      team2: ''
    },
    last5: {
      runs: '',
      wickets: '',
      runRate: ''
    },
    last10: {
      runs: '',
      wickets: '',
      runRate: ''
    },
    stadium: '',
    currentEvent: {
      text: '',
      additionalInfo: ''
    },
    matchStatus: '',
    winProbability: {},
    projectedScore: {},
    groundTime: '',
    additionalInfo: '',
    testMatchInfo: {
      daySession: '',
      oversLeft: ''
    },
    speedData: []
  });
  const wsRef = useRef(null);
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
    wsRef.current = new WebSocket(WS_URL);

    // Connection opened
    wsRef.current.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
    });

    // Listen for messages
    wsRef.current.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket data:', data);

        // Handle speed updates separately
        if (data.type === 'speedUpdate' && data.data) {
          const now = Date.now();
          if (now - lastUpdateTime >= MINIMUM_UPDATE_INTERVAL) {
            console.log('Received speed data:', data.data);
            
            // Only update speedData in cricketData
            setCricketData(prev => ({
              ...prev,
              speedData: [{ data: data.data[0] }] // Wrap the data in the expected structure
            }));
            
            lastUpdateTime = now;
          }
          return; // Don't process further for speed updates
        }

        // Handle other data updates without modifying speedData
        if (data.type !== 'speedUpdate') {
          setCricketData(prev => ({
            ...prev,
            ...data,
            speedData: prev.speedData, // Preserve existing speedData
            // ... rest of your data merging logic
          }));
        }
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    });

    // Handle errors
    wsRef.current.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Handle connection close
    wsRef.current.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server');
      // Optional: Implement reconnection logic here
    });

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []); // Empty dependency array - run once on mount

  // Track previous data for smooth transitions
  const prevData = usePrevious(cricketData);

  // Update message handler to preserve default structure
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'CRICKET_DATA_UPDATE') {
        setCricketData(prevData => {
          // If incoming data is null, return default state
          if (!event.data.detail) {
            return {
              matchTitle: '',
              teams: {
                team1: { name: '', score: '', overs: '', logo: '' },
                team2: { name: '', score: '', overs: '', logo: '' }
              },
              currentInnings: { CRR: '', RRR: '' },
              batsmen: [],
              bowler: null,
              recentOvers: [],
              partnership: null,
              lastBat: null,
              fallOfWicket: null,
              reviews: null,
              last5: null,
              last10: null,
              stadium: '',
              currentEvent: null,
              matchStatus: '',
              winProbability: null,
              projectedScore: null,
              groundTime: '',
              additionalInfo: ''
            };
          }

          // Merge new data with previous state while preserving structure
          const newData = {
            ...prevData,
            ...event.data.detail,
            teams: {
              ...prevData.teams,
              ...(event.data.detail.teams || {}),
              team1: {
                ...prevData.teams.team1,
                ...(event.data.detail.teams?.team1 || {})
              },
              team2: {
                ...prevData.teams.team2,
                ...(event.data.detail.teams?.team2 || {})
              }
            },
            currentInnings: {
              ...prevData.currentInnings,
              ...(event.data.detail.currentInnings || {})
            }
          };

          // Only update localStorage if data actually changed
          if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
            try {
              localStorage.setItem('cricketData', JSON.stringify(newData));
            } catch (error) {
              console.error('Error saving cricket data:', error);
            }
          }

          return newData;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Stabilize weather data updates
  const [weatherData, setWeatherData] = useState(null);
  const prevWeatherData = usePrevious(weatherData);

  // Modify the weather data fetch to use the manual config endpoint
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // First get the configured city from our backend
        const configResponse = await fetch(`${API_URL}/get-weather-config`);
        const config = await configResponse.json();
        
        if (!config.city) {
          console.log('No city configured for weather');
          return;
        }

        // Then fetch weather for that city
        const weatherResponse = await fetch(`${API_URL}/test-weather?city=${encodeURIComponent(config.city)}`);
        if (weatherResponse.ok) {
          const data = await weatherResponse.json();
          console.log('Weather data fetched:', data);
          // Only set weather data if we have valid temperature data
          if (data && data.main && typeof data.main.feels_like !== 'undefined') {
            setWeatherData(data);
          } else {
            console.error('Invalid weather data format:', data);
          }
        } else {
          console.error('Weather fetch failed:', await weatherResponse.text());
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
      }
    };

    // Initial fetch
    fetchWeather();
    
    // Set up interval for periodic updates
    const interval = setInterval(fetchWeather, 300000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array since we're not using any dependencies

  // Prevent unnecessary re-renders of stable components
  const memoizedWeatherDisplay = useMemo(() => (
    <WeatherDisplay weatherData={weatherData} />
  ), [weatherData]);

  // Update memoizedRecentOvers with better defensive checks
  const memoizedRecentOvers = useMemo(() => {
    // Early return if no cricketData
    if (!cricketData) return [];

    // Early return if no recentOvers
    if (!cricketData.recentOvers) return [];

    // Ensure recentOvers is an array and has items
    const overs = Array.isArray(cricketData.recentOvers) ? cricketData.recentOvers : [];
    if (overs.length === 0) return [];
    
    // Take last 3 overs and map them
    try {
      return overs
        .slice(-3)
        .map((over, index) => {
          if (!over) return null;
          return renderRecentOvers(over, index);
        })
        .filter(Boolean); // Remove any null values
    } catch (error) {
      console.error('Error processing recent overs:', error);
      return [];
    }
  }, [cricketData?.recentOvers]);

  // Optimize partnership tracking
  const [hasSeenPartnership, setHasSeenPartnership] = useState(false);
  const [lastValidPartnership, setLastValidPartnership] = useState(null);

  useEffect(() => {
    if (cricketData?.partnership?.runs) {
      setHasSeenPartnership(true);
      setLastValidPartnership({
        runs: cricketData.partnership.runs,
        balls: cricketData.partnership.balls,
        runRate: cricketData.partnership.runRate
      });
    }
  }, [cricketData.partnership?.runs, cricketData.partnership?.balls, cricketData.partnership?.runRate]);

  // Optimize over total animation
  const [lastOverTotal, setLastOverTotal] = useState(null);
  useEffect(() => {
    if (cricketData?.recentOvers?.length > 0) {
      const currentOver = cricketData.recentOvers[cricketData.recentOvers.length - 1];
      if (currentOver?.total !== lastOverTotal) {
        setLastOverTotal(currentOver?.total);
      }
    }
  }, [cricketData.recentOvers, lastOverTotal]);

  // Optimize new ball animation
  const [isNewBall, setIsNewBall] = useState(false);
  useEffect(() => {
    if (cricketData?.recentOvers?.length > 0) {
      const currentOver = cricketData.recentOvers[cricketData.recentOvers.length - 1];
      if (currentOver?.balls?.length > 0) {
        setIsNewBall(true);
        const timer = setTimeout(() => setIsNewBall(false), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [cricketData.recentOvers]);

  // Add this log to see if stadium data is available
  useEffect(() => {
    console.log('Stadium data:', cricketData?.stadium);
  }, [cricketData?.stadium]);

  // Add this helper function
  const isTestMatch = () => {
    return cricketData?.matchTitle?.toLowerCase().includes('test');
  };

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-match-info`);
        const data = await response.json();
        setMatchInfo(data);
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    fetchMatchInfo();
    // Refresh every 30 seconds
    const interval = setInterval(fetchMatchInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize state with all possible elements
  const [visibleElements, setVisibleElements] = useState({
    basicInfo: { show: false, data: null },
    teamForm: { show: false, data: null },
    venueStats: { show: false, data: null },
    teamComparison: { show: false, data: null },
    headToHead: { show: false, data: null },
    playingXI: { show: false, data: null },
    innings1Batting: { show: false, data: null },
    innings1Bowling: { show: false, data: null },
    innings1Details: { show: false, data: null },
    innings2Batting: { show: false, data: null },
    innings2Bowling: { show: false, data: null },
    innings2Details: { show: false, data: null }
  });

  // Add WebSocket connection status tracking
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);
    
    ws.onopen = () => {
      console.log('🌐 WebSocket connected from LiveCricketScorecard');
      setWsConnected(true);
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type) {
          setVisibleElements(prev => {
            const newState = { ...prev };
            
            if (message.type.startsWith('innings')) {
              newState[message.type] = {
                show: message.show,
                data: message.data
              };
            } else {
              newState[message.type] = {
                show: message.show,
                data: message.data
              };
            }
            
            return newState;
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setWsConnected(false);
    };

    ws.onclose = () => {
      console.log('🔴 WebSocket closed');
      setWsConnected(false);
    };

    return () => ws.close();
  }, []);

  // Add debug logging for state changes
  useEffect(() => {
    console.log('👁️ visibleElements updated:', {
      ...visibleElements,
      allKeys: Object.keys(visibleElements),
      activeElements: Object.entries(visibleElements)
        .filter(([key, value]) => value.show)
        .map(([key]) => key)
    });
  }, [visibleElements]);

  useEffect(() => {
    console.log('Cricket data updated:', cricketData);
  }, [cricketData]);

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 w-[1920px] h-[1080px] bg-[#0d1631] text-white overflow-hidden uppercase">
        <style jsx>{layerStyles}</style>
        <style jsx>{commonStyles}</style>
        <style jsx>{additionalStyles}</style>
        
        {/* Main container */}
        <div className="w-full h-full relative p-[1.08rem]">
          {/* Background effects container with border animation */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <BackgroundGradientAnimation
              gradientBackgroundStart="rgb(0, 0, 40)"
              gradientBackgroundEnd="rgb(0, 0, 20)"
              firstColor="18, 113, 255"
              secondColor="100, 0, 200"
              thirdColor="0, 40, 100"
              fourthColor="20, 0, 60"
              fifthColor="0, 20, 80"
              pointerColor="80, 100, 255"
              size="120%"
              blendingValue="overlay"
              interactive={false}
              className="absolute inset-0 -z-10"
              containerClassName="!h-full !w-full rounded-xl"
            />
            
            {/* Dark overlay for content contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2442]/95 via-[#2a3454]/95 to-[#1a2442]/95"></div>
          </div>

          {/* Content container */}
          <div className="relative w-full h-full">
            <div className="w-full h-full relative rounded-xl border border-blue-400/20 premium-glass">
              {/* Content Layer */}
              <div className="content-layer relative p-6">
                <div className="flex flex-col h-full w-[101%] -ml-[0.5%]">
                  {/* Top section - Title and match info */}
                  <div className="space-y-4 mb-6">
                    <div className="glow-box ultra-glass border-glow premium-hover">
                      <div className="flex justify-between items-center gap-6">
                        <h1 className="text-3xl leading-9 font-semibold pl-4
                                      text-[#f5f5f5] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                          {cricketData?.matchTitle || 'Loading...'}
                        </h1>
                        <div className="pr-4">
                          <InfoDisplay 
                            stadium={cricketData?.stadium}
                            reviews={cricketData?.reviews}
                          />
                        </div>
                      </div>
                    </div>

                    <style jsx>{`
                      .glow-box, .dark-box {
                        background-size: 200% 200%;
                        animation: gradientShift 8s ease infinite;
                        border: 1px solid rgba(99, 139, 250, 0.15);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                      }
                      
                      .glow-box:hover, .dark-box:hover {
                        background: linear-gradient(
                          45deg,
                          rgba(15, 18, 35, 1) 0%,
                          rgba(21, 24, 46, 1) 50%,
                          rgba(15, 18, 35, 1) 100%
                        );
                        background-size: 200% 200%;
                        border-color: rgba(99, 139, 250, 0.25);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                      }

                      .gap-4 {
                        gap: 1rem;
                      }

                      span.text-[1.8rem].font-medium.whitespace-nowrap.text-[#e5e5e5].leading-none.drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] {
                        font-size: 2.5rem;
                      }

                      span.text-8xl.font-bold.text-[#e5e5e5].leading-none.drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] {
                        transform: translateY(-4px);
                      }
                    `}</style>

                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 shadow-[rgba(0,0,0,0.56)_0px_22px_70px_4px] border border-[rgb(28,31,63)]">
                      {/* Left Team Score */}
                      <div className="flex items-center gap-8 relative -top-[2px] shrink-0">
                        <div className="flex items-center gap-6 pl-6 relative bottom-[11px] whitespace-nowrap overflow-hidden">
                          {cricketData?.teams?.team1?.logo && (
                            <img 
                              src={cricketData.teams.team1.logo} 
                              alt={cricketData.teams.team1.name || ''}
                              className="w-28 h-28 object-contain shrink-0 p-2
                                filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
                                transition-all duration-300 hover:scale-110
                                hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                            />
                          )}
                          <div className="flex items-center gap-6 min-w-0">
                            <style jsx>{`
                              .flex.items-center.gap-6.min-w-0 {
                                position: relative;
                                bottom: 0.5rem;
                              }
                            `}</style>
                            <div className="flex flex-col items-start justify-center min-w-0">
                              <span className="text-8xl font-bold text-[#e5e5e5] leading-none
                                            drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]
                                            truncate max-w-[400px]">  {/* Increased max-width to 400px */}
                                  {cricketData?.teams?.team1?.name || ''}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-8xl font-bold text-[#e5e5e5] leading-none relative
                                            drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] whitespace-nowrap">
                                {cricketData?.teams?.team1?.score || ''}
                              </span>
                              {cricketData?.teams?.team1?.overs && (
                                <span className="text-6xl text-blue-300/80 leading-tight
                                              drop-shadow-[0_0_4px_rgba(147,197,253,0.3)]
                                              relative top-[7px] font-semibold">
                                    ({cricketData.teams.team1.overs})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Event - Updated to grow with content */}
                      <div className="flex justify-center items-center w-full min-w-0 px-4">
                        {cricketData.currentEvent?.additionalInfo && (
                          <div className="px-8 py-4 rounded-lg 
                                          bg-gradient-to-br from-[#1a1f3c]/90 to-[#2a2f4c]/80
                                          border border-blue-400/20
                                          shadow-[0_0_15px_rgba(59,130,246,0.15)]
                                          min-w-0 max-w-fit
                                          overflow-hidden
                                          transition-all duration-300 ease-in-out
                                          hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]">
                            <div className="flex items-center">
                              <span className="text-[2.5rem] font-bold
                                            text-[#e5e5e5] leading-none
                                            drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]
                                            whitespace-nowrap overflow-hidden text-ellipsis
                                            rtl:text-right">
                                  {cricketData.currentEvent.additionalInfo}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Team Score */}
                      <div className="shrink-0">
                        <ScoreRight />
                      </div>
                    </div>
                  </div>

                  {/* Status boxes */}
                  <div className="flex flex-nowrap items-stretch gap-4 mb-6">
                    {cricketData.matchStatus && (
                      <div className="glow-box ultra-glass border-glow premium-hover flex-1">
                        <div className="px-8 py-4 flex items-center justify-center h-full">
                          <span className="text-[32px] font-bold whitespace-nowrap">
                            {cricketData.matchStatus}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {cricketData?.currentInnings?.CRR && (
                      <div className="glow-box ultra-glass border-glow premium-hover min-w-[200px]">
                        <div className="px-8 py-4 flex items-center justify-center h-full">
                          <span className="text-4xl font-bold whitespace-nowrap">
                            <span className="crr-label">CRR:</span> {cricketData.currentInnings.CRR}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {cricketData?.currentInnings?.RRR && (
                      <div className="glow-box ultra-glass border-glow premium-hover min-w-[200px]">
                        <div className="px-8 py-4 flex items-center justify-center h-full">
                          <span className="text-4xl font-bold whitespace-nowrap">
                            RRR: {cricketData.currentInnings.RRR}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Weather Display */}
                    {weatherData && (
                      <div className="glow-box ultra-glass border-glow premium-hover min-w-[200px]">
                        <div className="px-8 py-4 flex items-center justify-center h-full">
                          <WeatherDisplay weatherData={weatherData} />
                        </div>
                      </div>
                    )}
                    
                    {/* Ground Time */}
                    {cricketData?.groundTime && (
                      <div className="glow-box ultra-glass border-glow premium-hover min-w-[200px] ml-auto">
                        <div className="px-8 py-4 flex items-center justify-center gap-3 h-full">
                          <svg 
                            viewBox="0 0 24 24" 
                            className="w-8 h-8 text-blue-400/80 translate-y-[1px]"
                            fill="none" 
                            stroke="currentColor"
                          >
                            {/* Stadium icon paths remain the same */}
                            <path 
                              d="M2 20V10C2 6 7 3 12 3C17 3 22 6 22 10V20" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                            />
                            <path 
                              d="M2 10C2 10 7 13 12 13C17 13 22 10 22 10" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                            />
                            <path 
                              d="M4 14C4 14 8 16 12 16C16 16 20 14 20 14" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                              strokeDasharray="1 2"
                            />
                          </svg>
                          <span className="text-4xl font-bold whitespace-nowrap">
                            {cricketData.groundTime}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Sections Container */}
                  <div className="relative">
                    {/* Dark overlay background - starts after top 2 rows */}
                    {(visibleElements.basicInfo.show || 
                      visibleElements.teamForm.show || 
                      visibleElements.venueStats.show ||
                      visibleElements.teamComparison.show ||
                      visibleElements.headToHead.show ||
                      visibleElements.playingXI.show) && (
                      <div className="fixed inset-x-0 top-[240px] 
                           h-[77%] backdrop-blur-md z-30"
                           style={{
                             background: 'linear-gradient(45deg, darkblue, #140303)',
                             opacity: '0.95'
                           }}></div>
                    )}
                    
                    {/* Content sections */}
                    <div className="relative z-40">
                      {Object.entries(visibleElements).map(([key, value]) => {
                        if (!value.show) return null;
                        
                        if (key.startsWith('innings')) {
                          const [_, inningsNum, type] = key.match(/innings(\d)(\w+)/);
                          return (
                            <div key={key} className="mb-6">
                              <Scorecard
                                type={type.toLowerCase()}
                                inningsNumber={parseInt(inningsNum)}
                                data={value.data}
                                show={value.show}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={key} className="mb-6">
                              <MatchBasicInfo
                                type={key}
                                data={value.data}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Player cards */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      {cricketData?.batsmen?.map((batsman, index) => (
                        <BatsmanCard 
                          key={index}
                          batsman={batsman}
                          isAnimated={batsman.onStrike}
                          className="animated-border-box"
                        />
                      ))}
                      {cricketData?.bowler && (
                        <BowlerCard 
                          bowler={cricketData.bowler}
                          isAnimated={false}
                        />
                      )}
                    </div>

                    {/* Recent overs */}
                    <div className="mb-6 overflow-visible w-full">
                      <div className="flex items-stretch gap-4 w-full min-w-fit">
                        {memoizedRecentOvers}
                        <SpeedBox speedData={cricketData?.speedData} />
                      </div>
                    </div>

                    {/* Info boxes - Added transform and negative margin */}
                    <div className="flex gap-4 mb-6 w-full -mt-2" style={{ transform: 'translateY(14px)' }}>
                      <InfoBox 
                        label="PARTNERSHIP"
                        value={`${cricketData?.partnership?.runs || '0'} (${
                          cricketData?.partnership?.balls || 
                          cricketData?.partnership?.overs || 
                          '0'
                        }) RR: ${cricketData?.partnership?.runRate || '0.00'}`}
                        show={cricketData?.partnership?.runs > 0 || 
                              cricketData?.partnership?.balls > 0 || 
                              cricketData?.partnership?.overs > 0}
                      />
                      <InfoBox 
                        label="LAST BAT"
                        value={cricketData?.lastBat?.name ? 
                          `${cricketData.lastBat.name} ${cricketData.lastBat.runs || '0'} (${cricketData.lastBat.balls || '0'}b)` :
                          '- - (0b)'}
                        show={Boolean(cricketData?.lastBat?.name && cricketData?.lastBat?.runs)}
                      />
                      <InfoBox 
                        label="FOW"
                        value={cricketData?.fallOfWicket?.score ? 
                          `${cricketData.fallOfWicket.score} (${cricketData.fallOfWicket.overs || '0.0'} OV)` :
                          '0/0 (0.0 OV)'}
                        show={Boolean(cricketData?.fallOfWicket?.score && cricketData?.fallOfWicket?.overs)}
                      />
                      <InfoBox 
                        label="LAST 5"
                        value={cricketData?.last5?.runs ? 
                          `${cricketData.last5.runs}/${cricketData.last5.wickets || '0'} (RR: ${cricketData.last5.runRate || '0.00'})` :
                          '0/0 (RR: 0.00)'}
                        show={cricketData?.last5?.runs > 0 || cricketData?.last5?.wickets > 0}
                      />
                    </div>

                    {/* Bottom section - Win probability and projected score */}
                    <div className="grid grid-cols-2 gap-6 mt-auto pt-6"> {/* Changed from mt-auto mb-4 pt-2 */}
                      {/* Left side - Win Probability */}
                      <WinProbabilityBar probabilities={cricketData?.winProbability} />

                      {/* Right side - Conditional Test Match Info or Projected Score */}
                      {isTestMatch() ? (
                        <TestMatchInfo 
                          testMatchInfo={cricketData.testMatchInfo}
                          last10={cricketData.last10}
                        />
                      ) : (
                        cricketData?.projectedScore && 
                        Object.keys(cricketData.projectedScore).length > 0 && (
                          <ProjectedScoreCard projectedScore={cricketData.projectedScore} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add DS-Digital font import */}
      <style jsx global>{`
        @font-face {
          font-family: 'DS-Digital';
          src: url('/fonts/DS-Digital.ttf') format('truetype');
        }
      `}</style>
      {/* Add these styles */}
      <style jsx>{`
        .premium-glass {
          background: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .content-layer {
          position: relative;
          z-index: 10;
        }

        .content-layer::before {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LiveCricketScorecard;