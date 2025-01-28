import React, { useState, useEffect } from 'react';

const ScoreRight = () => {
  const [config, setConfig] = useState({
    name: "",
    score: "",
    overs: "",
    logoUrl: ""
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000';
        const response = await fetch(`${API_URL}/get-right-team`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          },
          ...(process.env.NODE_ENV === 'development' && {
            rejectUnauthorized: false
          })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConfig(prevConfig => ({
          ...prevConfig,
          score: data.score || prevConfig.score,
          overs: data.overs || prevConfig.overs
        }));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request timed out');
        } else {
          console.error('Error fetching config:', error);
        }
      }
    };

    // Listen for WebSocket messages
    const handleWebSocketMessage = (event) => {
      try {
        if (event.data) {
          const data = JSON.parse(event.data);
          if (data?.teams?.team2) {
            const team2 = data.teams.team2;
            setConfig(prevConfig => ({
              name: team2.name,
              score: prevConfig.score,
              overs: prevConfig.overs,
              logoUrl: team2.logo
            }));
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    // Connect to WebSocket
    const WS_URL = process.env.REACT_APP_WS_URL || 'wss://localhost:5000';
    const ws = new WebSocket(WS_URL);
    ws.addEventListener('message', handleWebSocketMessage);

    fetchConfig();
    const interval = setInterval(fetchConfig, 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
      ws.removeEventListener('message', handleWebSocketMessage);
      ws.close();
    };
  }, []);

  if (!config.name && !config.score) return null;

  return (
    <div className="flex items-center justify-end gap-8 relative -top-[2px]">
      <div className="flex items-center gap-6 pr-6 relative bottom-[11px]">
        {config.score && (
          <span className="text-8xl font-bold tracking-tight leading-none relative bottom-2
            text-[#e5e5e5] leading-none
            drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
            {config.score}
          </span>
        )}
        <div className="flex flex-col items-end justify-center gap-1">
          {config.name && (
            <span className="text-5xl font-bold text-white leading-none
              drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
              {config.name}
            </span>
          )}
          {config.overs && (
            <span className="text-2xl text-blue-300/80 leading-tight
              drop-shadow-[0_0_4px_rgba(147,197,253,0.3)]">
              ({config.overs})
            </span>
          )}
        </div>
        {config.logoUrl && (
          <div className="w-28 h-28 relative">
            <img 
              src={config.logoUrl}
              alt={config.name}
              className="w-full h-full object-contain p-2
                filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]
                transition-all duration-300 hover:scale-110
                hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              onError={(e) => {
                e.target.style.opacity = '0.5';
                e.target.src = ''; // Clear source on error
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreRight; 