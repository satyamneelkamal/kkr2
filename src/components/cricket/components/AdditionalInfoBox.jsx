import React from 'react';

const AdditionalInfoBox = ({ additionalInfo }) => {
  if (!additionalInfo) return null;

  return (
    <div className="px-6 py-2 rounded-lg 
                    border border-blue-400/20 
                    shadow-[0_0_15px_rgba(59,130,246,0.15)]
                    backdrop-blur-lg
                    transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]">
      <span className="text-2xl font-semibold text-center leading-tight whitespace-nowrap
                     text-[#e5e5e5] leading-none
                     drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
        {additionalInfo}
      </span>
    </div>
  );
};

export default AdditionalInfoBox; 