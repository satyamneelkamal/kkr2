import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const resultButtonStyles = {
  win: 'bg-green-500',
  loss: 'bg-red-500',
  draw: 'bg-orange-400'
};

const MatchBasicInfo = ({ type, data }) => {
  console.log('🎯 MatchBasicInfo render attempt:', { 
    type, 
    hasData: !!data,
    dataContent: data 
  });
  
  if (!data) {
    console.log('⛔ MatchBasicInfo not rendering because no data');
    return null;
  }

  // Calculate top position based on type
  const getTopPosition = () => {
    switch (type) {
      case 'basicInfo': return 'top-[240px]';
      case 'teamForm': return 'top-[240px]';
      default: return 'top-[240px]';
    }
  };

  // Optimize the variants for better performance
  const variants = {
    initial: { 
      opacity: 0,
      y: -30,
      scale: 0.99,
      filter: 'blur(8px)'
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      y: 30,
      scale: 0.99,
      filter: 'blur(8px)',
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  // Simplified child variants
  const childVariants = {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: 10
    }
  };

  // Optimized backdrop variants
  const backdropVariants = {
    initial: { 
      opacity: 0
    },
    animate: { 
      opacity: 0.95,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'basicInfo':
        if (!data.seriesName || !data.matchDate || !data.venue || !data.umpires) return null;
        return (
          <div className="space-y-12">
            {/* Title Section */}
            <div className="grid grid-cols-3 gap-8 bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl backdrop-blur-sm bg-opacity-95 border border-blue-400/20">
              {/* Series Name - Now stacked vertically */}
              <div className="px-8 py-6 flex flex-col justify-center">
                <span className="text-[2.4rem] font-semibold tracking-wide whitespace-nowrap 
                              text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  {data.seriesName?.split(',')[0] || ''} 
                </span>
                <span className="text-[2rem] font-medium tracking-wide whitespace-nowrap 
                              text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]
                              mt-3">
                  {data.seriesName?.split(',')[1] || ''} 
                </span>
              </div>
              
              {/* Match Date */}
              <div className="px-8 py-6 flex items-center justify-center">
                <span className="text-[2.4rem] font-medium tracking-wider whitespace-nowrap 
                              text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  {data.matchDate}
                </span>
              </div>
              
              {/* Venue - Now stacked vertically */}
              <div className="px-8 py-6 flex flex-col items-end justify-center">
                <span className="text-[2.4rem] font-medium tracking-wider whitespace-nowrap 
                              text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  {data.venue?.split(',')[0] || ''} 
                </span>
                <span className="text-[2rem] font-medium tracking-wide whitespace-nowrap 
                              text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]
                              mt-3">
                  {data.venue?.split(',')[1] || ''} 
                </span>
              </div>
            </div>

            {/* Officials Section */}
            {data.umpires && (
              <div className="mt-12 p-8 border border-blue-400/20 rounded-xl
                            bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] backdrop-blur-sm bg-opacity-95">
                {/* Section Title */}
                <h3 className="text-[2.6rem] font-bold tracking-wide mb-8
                             text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                  Match Officials
                </h3>

                {/* Officials Grid */}
                <div className="grid grid-cols-2 gap-12">
                  {/* On-Field Umpires */}
                  <div className="space-y-3 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] p-6 rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]">
                    <div className="text-[1.8rem] font-semibold tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      On-Field Umpires
                    </div>
                    <div className="text-[2.2rem] font-medium tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      {data.umpires.onField}
                    </div>
                  </div>

                  {/* Third Umpire */}
                  <div className="space-y-3 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] p-6 rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]">
                    <div className="text-[1.8rem] font-semibold tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      Third Umpire
                    </div>
                    <div className="text-[2.2rem] font-medium tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      {data.umpires.thirdUmpire}
                    </div>
                  </div>

                  {/* Match Referee - Full Width */}
                  <div className="col-span-2 mt-6 space-y-3 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] p-6 rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]">
                    <div className="text-[1.8rem] font-semibold tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      Match Referee
                    </div>
                    <div className="text-[2.2rem] font-medium tracking-wide
                                 text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                      {data.umpires.referee}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'teamForm':
        if (!data || !Array.isArray(data)) return null;
        
        return (
          <div className="space-y-0">
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95">
              {/* Title */}
              <div className="px-8 py-2">
                <h2 className="text-[2.6rem] font-bold tracking-wide text-center text-[#e5e5e5] pb-[10px] p-[20px]">
                  TEAM FORM
                </h2>
              </div>

              {/* Teams Container */}
              <div className="grid grid-cols-2 gap-8 px-8 pb-[42px]">
                {data.map((teamData, teamIndex) => (
                  <div key={teamIndex} className="space-y-[0.7rem]">
                    {/* Team Name and Form Box */}
                    <div className="flex items-center px-6 py-[1rem]
                                bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]
                                mb-[25px]">
                      <span className="text-[3.2rem] font-semibold tracking-wide whitespace-nowrap
                                   text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]
                                   flex-grow">
                        {teamData.teamName}
                      </span>
                      <div className="flex gap-2">
                        {(teamData.shortForm || []).map((result, idx) => (
                          <div
                            key={idx}
                            className={`result-button ${
                              result.result === 'W' ? 'result-button-win' : 
                              result.result === 'D' ? 'result-button-draw' : 
                              'result-button-loss'
                            }`}
                          >
                            {result.result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Matches */}
                    <div className="space-y-[0.7rem]">
                      {(teamData.recentMatches || []).map((match, idx) => (
                        <div key={idx} className="flex items-center justify-between
                                             px-6 py-4 rounded-lg border border-blue-400/20
                                             bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] shadow-md shadow-[#090d1f]">
                          {/* Team 1 Side */}
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <span className="text-[1.8rem] font-medium text-[#e5e5e5] leading-none 
                                        drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                              {match.teams.team1.name}
                            </span>
                            <span className="text-[1.8rem] font-medium text-blue-400">
                              {match.teams.team1.scores?.join(" & ")}
                            </span>
                          </div>

                          {/* Team 2 Side */}
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <span className="text-[1.8rem] font-medium text-[#e5e5e5] leading-none 
                                        drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                              {match.teams.team2.name}
                            </span>
                            <span className="text-[1.8rem] font-medium text-blue-400">
                              {match.teams.team2.scores?.join(" & ")}
                            </span>
                          </div>

                          {/* Match Number and Result */}
                          <div className="flex items-center gap-3">
                            <span className="text-[1.6rem] font-medium whitespace-nowrap
                                        text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                              {match.matchInfo.number}
                            </span>
                            <div className={`result-button ${
                              match.result === 'W' ? 'result-button-win' : 
                              match.result === 'D' ? 'result-button-draw' : 
                              'result-button-loss'
                            }`}>
                              {match.result}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'headToHead':
        if (!data?.stats?.team1?.name || !data?.stats?.team2?.name || !data?.matches) return null;
        return (
          <div className="space-y-0">
            {/* Head to Head Section with Background */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95 h-[710px]">
              {/* Title */}
              <div className="px-8 py-2">
                <h2 className="text-[2.6rem] font-bold tracking-wide text-center text-[#e5e5e5] pb-[10px] p-[20px]">
                  HEAD TO HEAD
                </h2>
              </div>

              {/* Score Display */}
              <div className="mx-8">
                <div className="flex items-center justify-between px-12 py-0
                            bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] border border-blue-400/20 rounded-lg shadow-md shadow-[#090d1f]">
                  {/* Team 1 */}
                  <span className="text-[3.2rem] font-semibold tracking-wide whitespace-nowrap text-[#e5e5e5]">
                    {data.stats.team1.name}
                  </span>

                  {/* Score */}
                  <div className="flex items-center gap-6">
                    <span className="text-[4rem] font-bold text-green-500">
                      {data.stats.team1.wins || 0}
                    </span>
                    <span className="text-[3.2rem] font-bold text-[#e5e5e5]">-</span>
                    <span className="text-[4rem] font-bold text-green-500">
                      {data.stats.team2.wins || 0}
                    </span>
                  </div>

                  {/* Team 2 */}
                  <span className="text-[3.2rem] font-semibold tracking-wide whitespace-nowrap text-[#e5e5e5]">
                    {data.stats.team2.name}
                  </span>
                </div>
              </div>

              {/* Recent Matches */}
              <div className="mt-8">
                <div className="px-8">
                  <h3 className="text-[2.4rem] font-bold tracking-wide mb-[0.8rem] text-[#e5e5e5] pl-4 text-center">
                    RECENT MATCHES
                  </h3>
                </div>
                <div className="space-y-[10px]">
                  {data.matches.slice(0, 5).map((match, idx) => {
                    if (!match?.teams?.team1?.name || !match?.teams?.team2?.name) return null;
                    return (
                      <div key={idx} className="flex items-center justify-between h-[68px]
                                       px-8 py-3 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] border-t border-b border-blue-400/20">
                        {/* Match Info */}
                        <div className="w-[300px]">
                          <span className="text-[2.25rem] font-medium text-[#e5e5e5] whitespace-nowrap">
                            {match.matchInfo || ''}
                          </span>
                        </div>

                        {/* Teams and Scores - Center aligned */}
                        <div className="flex-1 flex items-center justify-center gap-16">
                          {/* Team 1 */}
                          <div className="flex items-center gap-3 w-[300px]">
                            <span className="text-[2.25rem] font-medium text-[#e5e5e5] w-[80px] whitespace-nowrap">
                              {match.teams.team1.name}
                            </span>
                            <span className="text-[2.25rem] font-medium text-blue-400 whitespace-nowrap">
                              {match.teams.team1.scores?.join(" & ") || ''}
                            </span>
                          </div>

                          {/* Team 2 */}
                          <div className="flex items-center gap-3 w-[300px]">
                            <span className="text-[2.25rem] font-medium text-[#e5e5e5] w-[80px] whitespace-nowrap">
                              {match.teams.team2.name}
                            </span>
                            <span className="text-[2.25rem] font-medium text-blue-400 whitespace-nowrap">
                              {match.teams.team2.scores?.join(" & ") || ''}
                            </span>
                          </div>
                        </div>

                        {/* Result */}
                        <div className="w-[150px] flex justify-end">
                          <span className={`text-[2.25rem] font-medium whitespace-nowrap
                            ${(match.result || '').includes('Drawn') ? 'text-orange-400' :
                              (match.result || '').includes('Won') && (match.result || '').includes(data.stats.team1.name) ? 'text-green-500' : 
                              (match.result || '').includes('Won') && (match.result || '').includes(data.stats.team2.name) ? 'text-green-500' :
                              'text-red-500'}`}>
                            {match.result || ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'venueStats':
        if (!data?.winPercentages?.batFirst || !data?.winPercentages?.bowlFirst || 
            !data?.averageScores || !data?.totals?.highest || !data?.totals?.lowest || 
            !data?.matches?.count) return null;
        return (
          <div className="space-y-0">
            {/* Venue Stats Section with Background */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95 h-[710px]">
              {/* Title */}
              <div className="px-8 py-2">
                <h2 className="text-[2.6rem] font-bold tracking-wide text-center text-[#e5e5e5] pb-[10px] p-[20px] -translate-y-[8px]">
                  VENUE STATS
                </h2>
              </div>
              <div className="grid grid-cols-[400px_1fr] gap-8 h-[313px] -translate-y-[14px]">
                {/* Left Section - Circle and Win Percentages */}
                <div className="bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg p-6 space-y-6 border border-blue-400/20 mx-8 h-[400px] relative top-[25px] shadow-lg shadow-[#090d1f] -translate-y-[84px]">
                  {/* Circle with Matches Count */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Gray background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth="10"
                      />
                      {/* Red segment for losses */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#DC2626"
                        strokeWidth="10"
                        strokeDasharray={`${parseInt(data.winPercentages.bowlFirst || 0) * 2.827} ${100 * 2.827}`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Green segment for wins */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="10"
                        strokeDasharray={`${parseInt(data.winPercentages.batFirst || 0) * 2.827} ${100 * 2.827}`}
                        strokeDashoffset={`${-parseInt(data.winPercentages.bowlFirst || 0) * 2.827}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="text-[2.2rem] font-semibold text-[#f88]">{data.matches.count}</div>
                        <div className="text-[1.6rem] text-gray-400">{data.matches.text || 'Matches'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Win Percentages */}
                  <div className="space-y-4 mt-24">
                    <div className="flex justify-between items-center">
                      <div className="text-[1.6rem] text-gray-400 whitespace-nowrap">
                        WIN BAT FIRST
                      </div>
                      <span className="text-[2rem] font-semibold text-green-500">{data.winPercentages.batFirst || '0%'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[1.6rem] text-gray-400 whitespace-nowrap">
                        WIN BOWL FIRST
                      </div>
                      <span className="text-[2rem] font-semibold text-red-500">{data.winPercentages.bowlFirst || '0%'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Average Scores and Totals */}
                <div className="space-y-6 mx-8">
                  {/* Innings Averages Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* First Innings */}
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">AVG 1ST INNS</span>
                      <span className="text-[2.4rem] font-semibold text-[#e5e5e5]">{data.averageScores.firstInnings || '0'}</span>
                    </div>

                    {/* Second Innings */}
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">AVG 2ST INNS</span>
                      <span className="text-[2.4rem] font-semibold text-[#e5e5e5]">{data.averageScores.secondInnings || '0'}</span>
                    </div>

                    {/* Third Innings */}
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">AVG 3RD INNS</span>
                      <span className="text-[2.4rem] font-semibold text-[#e5e5e5]">{data.averageScores.thirdInnings || '0'}</span>
                    </div>

                    {/* Fourth Innings */}
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">AVG 4TH INNS</span>
                      <span className="text-[2.4rem] font-semibold text-[#e5e5e5]">{data.averageScores.fourthInnings || '0'}</span>
                    </div>
                  </div>

                  {/* Highest and Lowest Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">HIGHEST TOTAL</span>
                      <div>
                        <span className="text-[1.6rem] text-gray-400">{data.totals.highest.teams || ''}</span>
                        <span className="text-[2.4rem] font-semibold text-[#e5e5e5] ml-4">{data.totals.highest.score || '0'}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] rounded-lg px-6 py-[0.1rem] shadow-md shadow-[#090d1f]">
                      <span className="text-[2rem] text-gray-300">LOWEST TOTAL</span>
                      <div>
                        <span className="text-[1.6rem] text-gray-400">{data.totals.lowest.teams || ''}</span>
                        <span className="text-[2.4rem] font-semibold text-[#e5e5e5] ml-4">{data.totals.lowest.score || '0'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Matches Section */}
              {data.recentMatches && (
                <div className="mt-8 -translate-y-[23px]">
                  <div className="px-8">
                    <h3 className="text-[2.4rem] font-bold tracking-wide mb-[0.8rem] text-[#e5e5e5] pl-4 text-center -translate-y-[6px]">
                      LAST 3 MATCHES AT VENUE
                    </h3>
                  </div>
                  <div className="space-y-[10px]">
                    {data.recentMatches.slice(0, 3).map((match, idx) => {
                      if (!match?.teams?.team1?.name || !match?.teams?.team2?.name) return null;
                      return (
                        <div key={idx} className="flex justify-between items-center h-[54px]
                                         px-8 py-2 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] border-t border-b border-blue-400/20">
                          {/* Match Info */}
                          <div className="w-[300px]">
                            <span className="text-[2.25rem] font-medium text-[#e5e5e5] whitespace-nowrap">
                              {match.matchInfo || ''}
                            </span>
                          </div>

                          {/* Teams and Scores - Center aligned */}
                          <div className="flex-1 flex items-center justify-center gap-16">
                            {/* Team 1 */}
                            <div className="flex items-center gap-3 w-[300px]">
                              <span className="text-[2.25rem] font-medium text-[#e5e5e5] w-[80px] whitespace-nowrap">
                                {match.teams.team1.name}
                              </span>
                              <span className="text-[2.25rem] font-medium text-blue-400 whitespace-nowrap">
                                {match.teams.team1.scores?.join(" & ") || ''}
                              </span>
                            </div>

                            {/* Team 2 */}
                            <div className="flex items-center gap-3 w-[300px]">
                              <span className="text-[2.25rem] font-medium text-[#e5e5e5] w-[80px] whitespace-nowrap">
                                {match.teams.team2.name}
                              </span>
                              <span className="text-[2.25rem] font-medium text-blue-400 whitespace-nowrap">
                                {match.teams.team2.scores?.join(" & ") || ''}
                              </span>
                            </div>
                          </div>

                          {/* Result */}
                          <div className="w-[150px] flex justify-end">
                            <span className={`text-[2.25rem] font-medium whitespace-nowrap
                              ${(match.result || '').includes('Drawn') ? 'text-orange-400' :
                                (match.result || '').includes('Won') ? 'text-green-500' :
                                'text-red-500'}`}>
                              {match.result || ''}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'recentMatches':
        if (!data) return null;
        return (
          <div className="space-y-6">
            <h3 className="text-[2.6rem] font-bold tracking-wide mb-8
                         text-[#e5e5e5] leading-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
              Recent Matches
            </h3>

            <div className="space-y-4">
              {/* Match 1 - WA vs SA */}
              <div className="flex justify-between items-center bg-[#1a2442] rounded-lg px-6 py-3">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">WA</span>
                      <span className="text-[1.8rem] text-blue-400">373 & 243/3</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">SA</span>
                      <span className="text-[1.8rem] text-blue-400">253 & 208/6</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[1.6rem] text-gray-400">13th TEST, Sheffield 2024-25</span>
                  <span className="text-[1.8rem] text-yellow-500">Match Drawn</span>
                </div>
              </div>

              {/* Match 2 - SA vs VIC */}
              <div className="flex justify-between items-center bg-[#1a2442] rounded-lg px-6 py-3">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">SA</span>
                      <span className="text-[1.8rem] text-blue-400">307 & 270/8</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">VIC</span>
                      <span className="text-[1.8rem] text-blue-400">232 & 207</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[1.6rem] text-gray-400">9th TEST, Sheffield 2024-25</span>
                  <span className="text-[1.8rem] text-green-500">SACA Won</span>
                </div>
              </div>

              {/* Match 3 - SA vs QLD */}
              <div className="flex justify-between items-center bg-[#1a2442] rounded-lg px-6 py-3">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">SA</span>
                      <span className="text-[1.8rem] text-blue-400">132 & 232</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[2rem] font-medium text-[#e5e5e5]">QLD</span>
                      <span className="text-[1.8rem] text-blue-400">159 & 206/3</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[1.6rem] text-gray-400">24th TEST, Sheffield 2023-24</span>
                  <span className="text-[1.8rem] text-red-500">QLD Won</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'teamComparison':
        if (!data?.overall?.teams) return null;
        return (
          <div className="space-y-0">
            {/* Team Comparison Section with Background */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95">
              {/* Title */}
              <div className="px-8 py-2">
                <h2 className="text-[2.6rem] font-bold tracking-wide text-center text-[#e5e5e5] pb-[10px] p-[20px]">
                  TEAM COMPARISON
                </h2>
              </div>

              {/* Comparisons Container - Side by Side */}
              <div className="grid grid-cols-2 gap-8 px-8 pb-[42px]">
                {/* Overall Comparison */}
                <div className="space-y-3">
                  <div className="flex justify-center items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] px-6 py-[0.1rem] rounded-lg shadow-md shadow-[#090d1f]">
                    <span className="text-[2.2rem] text-gray-300">OVERALL</span>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] p-6 rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]">
                    <div className="text-left">
                      <div className="text-[2.2rem] text-[#e5e5e5]">{data.overall.teams.team1?.name || ''}</div>
                      <div className="text-[1.76rem] text-gray-400">{data.overall.teams.team1?.context || ''}</div>
                    </div>
                    <div className="text-center text-[1.76rem] text-gray-400">
                      {/* Removed the subtitle display */}
                    </div>
                    <div className="text-right">
                      <div className="text-[2.2rem] text-[#e5e5e5]">{data.overall.teams.team2?.name || ''}</div>
                      <div className="text-[1.76rem] text-gray-400">{data.overall.teams.team2?.context || ''}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(data.overall.stats || []).map((stat, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] px-6 py-[0.1rem] rounded-lg shadow-md shadow-[#090d1f]">
                        <div className="text-[2.2rem] text-blue-400">{stat.team1Value || '0'}</div>
                        <div className="text-center text-[1.76rem] text-gray-400">{stat.label || ''}</div>
                        <div className="text-right text-[2.2rem] text-blue-400">{stat.team2Value || '0'}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* On Venue Comparison - Only show if data exists */}
                {data.onVenue && (
                  <div className="space-y-3">
                    <div className="flex justify-center items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] px-6 py-[0.1rem] rounded-lg shadow-md shadow-[#090d1f]">
                      <span className="text-[2.2rem] text-gray-300">ON VENUE</span>
                    </div>
                    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] p-6 rounded-lg border border-blue-400/20 shadow-md shadow-[#090d1f]">
                      <div className="text-left">
                        <div className="text-[2.2rem] text-[#e5e5e5]">{data.onVenue.teams?.team1?.name || ''}</div>
                        <div className="text-[1.76rem] text-gray-400">{data.onVenue.teams?.team1?.context || ''}</div>
                      </div>
                      <div className="text-center text-[1.76rem] text-gray-400">
                        {/* Removed the subtitle display */}
                      </div>
                      <div className="text-right">
                        <div className="text-[2.2rem] text-[#e5e5e5]">{data.onVenue.teams?.team2?.name || ''}</div>
                        <div className="text-[1.76rem] text-gray-400">{data.onVenue.teams?.team2?.context || ''}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {(data.onVenue.stats || []).map((stat, idx) => (
                        <div key={idx} className="grid grid-cols-3 items-center bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] px-6 py-[0.1rem] rounded-lg shadow-md shadow-[#090d1f]">
                          <div className="text-[2.2rem] text-blue-400">{stat.team1Value || '0'}</div>
                          <div className="text-center text-[1.76rem] text-gray-400">{stat.label || ''}</div>
                          <div className="text-right text-[2.2rem] text-blue-400">{stat.team2Value || '0'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'playingXI':
        if (!data || !data.teams) return null;
        return (
          <div className="space-y-0">
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95">
              <div className="px-8 pt-4 space-y-8">
                {Object.entries(data.teams).map(([teamName, teamData]) => (
                  <div key={teamName}>
                    <h2 className="text-[2.6rem] font-bold tracking-wide text-center text-[#e5e5e5] pb-[10px] p-[20px]">
                      {teamName} PLAYING XI
                    </h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 pb-[42px]">
                      {teamData.playingXI.map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between px-6 py-4 rounded-lg
                                              border border-blue-400/20 shadow-md shadow-[#090d1f]
                                              bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229]">
                          <div className="flex items-center gap-3">
                            <span className="text-[2rem] font-medium text-[#e5e5e5]">
                              {player.name}
                              {player.isCaptain && (
                                <span className="text-[1.6rem] text-yellow-400 ml-2">(C)</span>
                              )}
                              {player.isWicketkeeper && (
                                <span className="text-[1.6rem] text-blue-400 ml-2">(WK)</span>
                              )}
                            </span>
                          </div>
                          <div className="text-[1.6rem] text-gray-400">{player.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown section type: {type}</div>;
    }
  };

  return (
    <>
      <AnimatePresence mode="sync">
        {/* Optimized backdrop */}
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-x-0 top-[240px] h-[77%] z-30 backdrop-blur-md" 
          style={{ 
            background: 'linear-gradient(45deg, darkblue, rgb(20, 3, 3))',
            willChange: 'opacity'
          }}
        />

        {/* Main container with optimized animations */}
        <motion.div 
          key="container"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed inset-x-0 ${getTopPosition()} z-30
                    min-h-[calc(100vh-240px)]
                    px-[1.08rem] py-6
                    overflow-hidden`}
          style={{ willChange: 'transform, opacity' }}>
          <div className="relative w-[1848px] mx-auto">
            {/* Simplified background container */}
            <motion.div 
              className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <div className="rotating-background opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a2442] via-[#2a3454] to-[#141c36] opacity-95"></div>
            </motion.div>

            {/* Optimized content container */}
            <motion.div 
              className="glow-box animated-border-box p-6 premium-box-shadow
                      border-t-0 rounded-b-xl rounded-t-none relative z-10
                      bg-gradient-to-br from-[#1a2442]"
              variants={childVariants}
              style={{
                boxShadow: '0 22px 70px 4px rgba(0,0,0,0.56)',
                willChange: 'transform, opacity'
              }}>
              <motion.div 
                className="relative z-20"
                variants={childVariants}>
                {renderContent()}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Optimized animation styles */}
      <style jsx>{`
        .rotating-background {
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background: linear-gradient(45deg, 
            rgba(0,0,139,0.7), 
            rgba(20,3,3,0.7),
            rgba(0,0,60,0.7)
          );
          filter: blur(80px);
          animation: seamlessRotateAndMove 30s linear infinite;
          transform-origin: center center;
          pointer-events: none;
          background-size: 200% 200%;
          mix-blend-mode: overlay;
          will-change: transform;
        }

        @keyframes seamlessRotateAndMove {
          0% { 
            transform: rotate(0deg) scale(1);
          }
          100% { 
            transform: rotate(360deg) scale(1);
          }
        }

        .glow-box::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(59, 130, 246, 0.1),
            transparent
          );
          z-index: -1;
          border-radius: inherit;
          animation: borderGlow 6s linear infinite;
        }

        @keyframes borderGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
};

export default MatchBasicInfo; 