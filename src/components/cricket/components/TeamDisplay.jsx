import React from 'react';

const TeamDisplay = ({ team, isActive }) => {
  // Split score and overs for separate styling
  const score = team?.score || '0-0';
  const overs = team?.overs ? `(${team.overs})` : '';

  return (
    <div className={`flex items-center gap-12 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
      {team?.logo && (
        <img src={team.logo} alt={team.name} className="w-32 h-32 object-contain flex-shrink-0" />
      )}
      <div className="flex items-center gap-10">
        <div className="text-[80px] font-bold text-white whitespace-nowrap">{team?.name}</div>
        <div className="flex items-baseline">
          <div className="text-[91px] font-bold text-white">
            {score}
          </div>
          <div className="text-[57px] font-medium text-gray-300 pl-[23px]">
            {overs}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDisplay; 