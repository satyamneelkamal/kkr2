import React from 'react';

const EventBox = ({ event }) => {
  if (!event) return null;

  return (
    <div className="px-8 py-2 mx-8 rounded-lg 
                    bg-gradient-to-b from-[#1a1f3c]/90 to-[#1a1f3c]/70 
                    border-2 border-blue-400/20 
                    shadow-[0_0_15px_rgba(59,130,246,0.15)]
                    backdrop-blur-lg
                    transition-all duration-300
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]">
      <span className="text-4xl font-bold text-center leading-tight whitespace-nowrap
                     text-[#e5e5e5]
                     drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
        {event}
      </span>
    </div>
  );
};

export default EventBox; 