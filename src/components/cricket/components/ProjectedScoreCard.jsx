import React from 'react';

const ProjectedScoreCard = ({ projectedScore }) => {
  if (!projectedScore || Object.keys(projectedScore).length === 0) return null;

  return (
    <div className="glow-box p-4 animated-content-box premium-box-shadow content-box-glow">
      <div className="grid grid-cols-[minmax(150px,auto)_repeat(4,1fr)] gap-3">
        <div className="flex flex-col gap-2">
          {Object.keys(projectedScore).map((type) => (
            <div key={type} className="glow-box px-4 py-1.5 h-full flex items-center">
              <span className="text-[1.6rem] text-gray-300 whitespace-nowrap">{type}</span>
            </div>
          ))}
        </div>

        {[0, 1, 2, 3].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2">
            {Object.values(projectedScore).map((values) => (
              <div key={`${values[colIndex]}-${colIndex}`} 
                   className="glow-box px-4 py-1.5 h-full flex items-center justify-center min-w-[120px]">
                <span className={`text-[1.6rem] font-bold ${
                  values[colIndex]?.includes('*') ? 'text-green-400' : 'text-white'
                }`}>
                  {values[colIndex] || '-'}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectedScoreCard; 