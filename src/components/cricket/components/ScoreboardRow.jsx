import React from 'react';
import TeamScoreBox from './TeamScoreBox';
import EventBox from './EventBox';
import AdditionalInfoBox from './AdditionalInfoBox';

const ScoreboardRow = ({ team1, team2, currentEvent, additionalInfo }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Main Score Row */}
      <div className="w-full flex items-center justify-between px-8 py-4
                    animated-content-box premium-box-shadow content-box-glow
                    rounded-lg border border-blue-400/20">
        {/* Left Team */}
        <TeamScoreBox 
          teamName={team1.name}
          score={team1.score}
          overs={team1.overs}
          logo={team1.logo}
        />

        {/* Middle Event */}
        <EventBox event={currentEvent} />

        {/* Right Team */}
        <TeamScoreBox 
          teamName={team2.name}
          score={team2.score}
          overs={team2.overs}
          logo={team2.logo}
          isReversed={true}
        />
      </div>

      {/* Additional Info Box - Centered below */}
      {additionalInfo && (
        <div className="flex justify-center">
          <AdditionalInfoBox additionalInfo={additionalInfo} />
        </div>
      )}
    </div>
  );
};

export default ScoreboardRow; 