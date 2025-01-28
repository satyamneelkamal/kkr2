import React from 'react';

const WinProbabilityBar = ({ probabilities }) => {
  if (!probabilities || Object.keys(probabilities).length === 0) return null;

  const entries = Object.entries(probabilities);

  return (
    <div className="glow-box p-4 animated-content-box premium-box-shadow content-box-glow">
      <div className="flex justify-between items-center mb-6 px-8">
        {entries.map(([team, probability], index) => (
          <div key={team} className="flex items-center gap-8">
            <span className="text-[2.2rem] font-bold text-[#e5e5e5]
                drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
              {team}
            </span>
            <span className="text-[2.2rem] text-[#e5e5e5] min-w-[5rem] text-right
                drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
              {probability}%
            </span>
          </div>
        ))}
      </div>
      <div className="px-8">
        <div className="h-4 w-full bg-gray-700/50 rounded-full overflow-hidden flex mb-2">
          {entries.map(([team, probability], index) => (
            <div 
              key={team}
              className={`h-full transition-all duration-500 ease-out ${
                index === 0 ? 'bg-blue-500' : 
                index === 1 ? 'bg-gray-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${probability}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinProbabilityBar; 