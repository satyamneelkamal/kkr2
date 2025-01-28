import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Scorecard = ({ type, inningsNumber, data, show }) => {
  console.log('🎯 Scorecard render attempt:', { 
    type, 
    inningsNumber, 
    hasData: !!data,
    show,
    dataContent: data 
  });
  
  if (!show || !data) {
    console.log('⛔ Scorecard not rendering because:', { 
      noShow: !show, 
      noData: !data 
    });
    return null;
  }

  // Calculate top position based on type
  const getTopPosition = () => {
    switch (type) {
      case 'batting': return 'top-[240px]';
      case 'bowling': return 'top-[240px]';
      case 'partnerships': return 'top-[240px]';
      case 'fallOfWickets': return 'top-[240px]';
      default: return 'top-[240px]';
    }
  };

  const renderPartnershipAndFow = (partnerships, fow) => {
    if (!partnerships?.length && !fow?.length) return null;

    return (
      <div className="px-8">
        <div className="grid grid-cols-[1.4fr_0.6fr] gap-4 -translate-y-[5px]">
          {/* Partnerships Section */}
          <div>
            <div className="flex justify-center items-center 
                         bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                         px-6 py-[3.2px] mb-2
                         rounded-lg border border-blue-400/30 
                         shadow-lg shadow-[#090d1f]/50">
              <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                PARTNERSHIPS
              </div>
            </div>
            <div className="grid grid-cols-[2fr_2fr_0.7fr_0.7fr_0.7fr] gap-1 mb-[1px] px-6 py-[2px]
                         bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                         rounded-lg border border-blue-400/20
                         shadow-md shadow-[#090d1f]/40">
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">BATTER 1</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">BATTER 2</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">RUNS</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">BALLS</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">SR</div>
            </div>
            <div className="space-y-[0.25px]">
              {data.partnerships?.map((p, index) => (
                <div key={index}
                     className="grid grid-cols-[2fr_2fr_0.7fr_0.7fr_0.7fr] gap-1 px-6 py-[2px]
                            bg-gradient-to-r from-[#0f1631]
                            rounded-lg border border-blue-500/20">
                  <div className="text-[1.8rem] text-[#e5e5e5] truncate">{p.player1}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] truncate">{p.player2}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">{p.runs}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">{p.balls}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">
                    {((p.runs / p.balls) * 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fall of Wickets Section */}
          <div>
            <div className="flex justify-center items-center 
                         bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                         px-6 py-[3.2px] mb-2
                         rounded-lg border border-blue-400/30 
                         shadow-lg shadow-[#090d1f]/50">
              <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                FALL OF WICKETS
              </div>
            </div>
            <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-1 mb-[1px] px-6 py-[2px]
                         bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                         rounded-lg border border-blue-400/20
                         shadow-md shadow-[#090d1f]/40">
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">NO</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1]
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">BATSMEN</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">SCR</div>
              <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                          tracking-wide">OVR</div>
            </div>
            <div className="space-y-[0.25px]">
              {data.fallOfWickets?.map((w, index) => (
                <div key={index}
                     className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-1 px-6 py-[2px]
                            bg-gradient-to-r from-[#0f1631]
                            rounded-lg border border-blue-500/20">
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.wicketNumber}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] truncate whitespace-nowrap overflow-hidden">
                    {w.shortName}
                  </div>
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.score}</div>
                  <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.over}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'batting':
        return (
          <div className="space-y-12">
            {/* Title Section */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95">
              {/* Header Row with Title and Summary */}
              <div className="px-8 py-4">
                <div className="flex justify-between items-center 
                             bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                             px-6 py-[4px]
                             rounded-lg border border-blue-400/30 
                             shadow-lg shadow-[#090d1f]/50
                             hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                    {data.teamName} - BATTING
                  </div>
                </div>
              </div>

              {/* Batting Table */}
              <div className="px-8">
                {/* Table Headers */}
                <div className="grid grid-cols-[2.5fr_0.8fr_0.8fr_0.8fr_0.8fr_4fr_1fr] gap-2 
                             mb-[1px] px-6 py-[2px]
                             bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                             rounded-lg border border-blue-400/20
                             shadow-md shadow-[#090d1f]/40">
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    BATTER
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    R
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    B
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    4S
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    6S
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1]
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    DISMISSAL
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    SR
                  </div>
                </div>

                {/* Batting Rows */}
                <div className="space-y-0">
                  {data.batting.map((batter, index) => (
                    <div key={index} 
                         className="grid grid-cols-[2.5fr_0.8fr_0.8fr_0.8fr_0.8fr_4fr_1fr] gap-2 
                                 items-center
                                 px-6 py-0
                                 bg-gradient-to-r from-[#0f1631]
                                 rounded-lg
                                 border border-blue-500/20">
                      <div className="text-[1.8rem] text-[#e5e5e5] truncate leading-none 
                                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
                                    font-semibold tracking-wide
                                    relative">
                        {batter.name}
                      </div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center
                                    font-bold tracking-wider
                                    drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]
                                    relative">
                        {batter.runs ?? '-'}
                      </div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{batter.balls ?? '-'}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{batter.fours ?? '-'}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{batter.sixes ?? '-'}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5]">
                        {batter.dismissal?.split(' ').map((word, i, arr) => (
                          <React.Fragment key={i}>
                            {word}
                            {i < arr.length - 1 && <span className="mx-2"></span>}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{batter.strikeRate ?? '-'}</div>
                    </div>
                  ))}
                </div>

                {/* Extras and Total Row */}
                <div className="mt-2 flex justify-between items-center 
                              px-6 py-[4px]
                              bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229]
                              rounded-lg border border-blue-500/30
                              shadow-lg shadow-[#090d1f]/50
                              hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-[1.8rem] text-[#f1f1f1] font-bold
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    Extras: <span className="text-[#e5e5e5]">{data.summary.extras.total}</span> 
                    <span className="text-[#e5e5e5] font-normal tracking-normal">
                      (W: {data.summary.extras.wide}, 
                      NB: {data.summary.extras.noBall}, B: {data.summary.extras.bye}, 
                      LB: {data.summary.extras.legBye})
                    </span>
                  </div>
                  <div className="text-[1.8rem] text-[#f1f1f1] font-bold
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    Total: <span className="text-[#e5e5e5]">{data.summary.score}/{data.summary.wickets}</span>
                    <span className="text-[#e5e5e5] font-normal tracking-normal"> ({data.summary.overs} overs)</span>
                  </div>
                </div>
              </div>

              {renderPartnershipAndFow(data.partnerships, data.fallOfWickets)}
            </div>
          </div>
        );

      case 'bowling':
        return (
          <div className="space-y-12">
            {/* Title Section */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] rounded-xl pb-4 backdrop-blur-sm bg-opacity-95">
              <div className="px-8 py-4">
                <div className="flex justify-between items-center 
                             bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                             px-6 py-[4px]
                             rounded-lg border border-blue-400/30 
                             shadow-lg shadow-[#090d1f]/50
                             hover:border-blue-400/40 transition-all duration-300">
                  <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                    {data.teamName} - BOWLING
                  </div>
                </div>
              </div>

              {/* Bowling Table */}
              <div className="px-8">
                {/* Table Headers */}
                <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 
                             mb-[1px] px-6 py-[2px]
                             bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                             rounded-lg border border-blue-400/20
                             shadow-md shadow-[#090d1f]/40">
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    BOWLER
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    O
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    M
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    R
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    W
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    WD
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    NB
                  </div>
                  <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                tracking-wide">
                    ECO
                  </div>
                </div>

                {/* Bowling Rows */}
                <div className="space-y-0">
                  {data.bowling.map((bowler, index) => (
                    <div key={index} 
                         className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-2 
                           items-center
                           px-6 py-0
                           bg-gradient-to-r from-[#0f1631]
                           rounded-lg
                           border border-blue-500/20">
                      <div className="text-[1.8rem] text-[#e5e5e5] truncate leading-none 
                                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
                                    font-semibold tracking-wide
                                    relative">
                        {bowler.name}
                      </div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.overs}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.maidens}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.runs}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.wickets}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.wides}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.noBalls}</div>
                      <div className="text-[1.8rem] text-[#e5e5e5] text-center">{bowler.economy}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-12">
            {/* Title Section */}
            <div className="bg-gradient-to-br from-[#1a2442] via-[#1e2845] to-[#141c36] 
                          rounded-xl p-4 backdrop-blur-sm bg-opacity-95">
              {/* Main Title */}
              <div className="px-8 py-2">
                <div className="flex justify-between items-center 
                             bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                             px-6 py-[4px]
                             rounded-lg border border-blue-400/30 
                             shadow-lg shadow-[#090d1f]/50">
                  <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                    {data.teamName} - PARTNERSHIPS & FALL OF WICKETS
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 mt-2">
                <div className="grid grid-cols-[1.4fr_0.6fr] gap-4 -translate-y-[5px]">
                  {/* Partnerships Section */}
                  <div>
                    <div className="flex justify-center items-center 
                                 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                                 px-6 py-[3.2px] mb-2
                                 rounded-lg border border-blue-400/30 
                                 shadow-lg shadow-[#090d1f]/50">
                      <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                        PARTNERSHIPS
                      </div>
                    </div>
                    <div className="grid grid-cols-[2fr_2fr_0.7fr_0.7fr_0.7fr] gap-1 mb-[1px] px-6 py-[2px]
                                 bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                                 rounded-lg border border-blue-400/20
                                 shadow-md shadow-[#090d1f]/40">
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">BATTER 1</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] 
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">BATTER 2</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">RUNS</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">BALLS</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">SR</div>
                    </div>
                    <div className="space-y-[0.25px]">
                      {data.partnerships?.map((p, index) => (
                        <div key={index}
                             className="grid grid-cols-[2fr_2fr_0.7fr_0.7fr_0.7fr] gap-1 px-6 py-[2px]
                                    bg-gradient-to-r from-[#0f1631]
                                    rounded-lg border border-blue-500/20">
                          <div className="text-[1.8rem] text-[#e5e5e5] truncate">{p.player1}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] truncate">{p.player2}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">{p.runs}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">{p.balls}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">
                            {((p.runs / p.balls) * 100).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fall of Wickets Section */}
                  <div>
                    <div className="flex justify-center items-center 
                                 bg-gradient-to-br from-[#0f1631] via-[#162448] to-[#0c1229] 
                                 px-6 py-[3.2px] mb-2
                                 rounded-lg border border-blue-400/30 
                                 shadow-lg shadow-[#090d1f]/50">
                      <div className="text-[2.2rem] font-bold text-[#e5e5e5]">
                        FALL OF WICKETS
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-1 mb-[1px] px-6 py-[2px]
                                 bg-gradient-to-br from-[#0f1631] via-[#141e3d] to-[#0c1229]
                                 rounded-lg border border-blue-400/20
                                 shadow-md shadow-[#090d1f]/40">
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">NO</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1]
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">BATSMEN</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">SCR</div>
                      <div className="text-[1.8rem] font-bold text-[#f1f1f1] text-center
                                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                                  tracking-wide">OVR</div>
                    </div>
                    <div className="space-y-[0.25px]">
                      {data.fallOfWickets?.map((w, index) => (
                        <div key={index}
                             className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-1 px-6 py-[2px]
                                    bg-gradient-to-r from-[#0f1631]
                                    rounded-lg border border-blue-500/20">
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.wicketNumber}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] truncate whitespace-nowrap overflow-hidden">
                            {w.shortName}
                          </div>
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.score}</div>
                          <div className="text-[1.8rem] text-[#e5e5e5] text-center">{w.over}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unknown section type: {type}</div>;
    }
  };

  // Optimize the variants for better performance
  const variants = {
    initial: { 
      opacity: 0,
      y: -30,  // Reduced distance
      scale: 0.99, // Smaller scale change
      filter: 'blur(8px)'
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3, // Faster duration
        ease: [0.23, 1, 0.32, 1], // Custom easing
        staggerChildren: 0.05 // Reduced stagger time
      }
    },
    exit: { 
      opacity: 0,
      y: 30,
      scale: 0.99,
      filter: 'blur(8px)',
      transition: {
        duration: 0.2, // Faster exit
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  // Simplified child variants
  const childVariants = {
    initial: {
      opacity: 0,
      y: -10 // Reduced distance
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
          animation: seamlessRotateAndMove 30s linear infinite; /* Slower rotation */
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
          animation: borderGlow 6s linear infinite; /* Slower animation */
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

export default Scorecard; 