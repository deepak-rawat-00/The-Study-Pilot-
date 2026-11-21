import React from 'react';

export const DailyStudyPlannerSheet: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-4xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Daily Study Focus Planner</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; Daily Active Focus System</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">DATE: </span>
            <span className="inline-block border-b border-slate-400 w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">DAY: </span>
            <span className="inline-block border-b border-slate-400 w-20">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Top Priority Outcomes & 25-Min Study Floor */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2 border border-slate-400 rounded-md p-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs">Top 3 Non-Negotiable Outcomes</h2>
            <span className="text-[10px] text-slate-500">Output-focused targets</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-sm border border-slate-400 flex items-center justify-center font-bold text-[10px] text-slate-600">
                  {num}
                </span>
                <div className="border-b border-dashed border-slate-300 flex-1 h-5">&nbsp;</div>
                <div className="w-16 border-b border-slate-300 text-right text-[10px] text-slate-400">Est. Mins</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-800 bg-slate-50/80 rounded-md p-3">
          <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs mb-1">Minimum Study Floor</h2>
          <p className="text-[10px] text-slate-600 mb-2">If today is low-energy or chaotic, complete 25 min to protect your streak.</p>
          <div className="border border-slate-400 bg-white rounded p-1.5 flex items-center justify-between">
            <span className="font-bold text-xs text-slate-800">25-Min Active Review</span>
            <span className="w-4 h-4 border border-slate-500 rounded-sm">&nbsp;</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-500">
            Subject: <span className="inline-block border-b border-slate-300 w-24">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Structured Time Blocks Grid */}
      <div className="border border-slate-400 rounded-md p-3 mb-4">
        <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-2">Energy-Matched Study Blocks</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* Morning Deep Block */}
          <div className="border border-slate-300 rounded p-2">
            <div className="bg-slate-100 p-1 font-bold text-[11px] uppercase text-slate-800 text-center rounded mb-1.5">
              Morning Block (Deep Focus)
            </div>
            <p className="text-[9px] text-slate-500 mb-2 text-center">Peak alertness: Analytical &amp; Hard Concepts</p>
            <div className="space-y-1.5">
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">08:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">09:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">10:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">11:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
            </div>
          </div>

          {/* Afternoon Practice Block */}
          <div className="border border-slate-300 rounded p-2">
            <div className="bg-slate-100 p-1 font-bold text-[11px] uppercase text-slate-800 text-center rounded mb-1.5">
              Afternoon Block (Practice Drills)
            </div>
            <p className="text-[9px] text-slate-500 mb-2 text-center">Post-lunch dip: MCQs &amp; Active Problem Sets</p>
            <div className="space-y-1.5">
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">02:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">03:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">04:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">05:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
            </div>
          </div>

          {/* Evening Consolidation Block */}
          <div className="border border-slate-300 rounded p-2">
            <div className="bg-slate-100 p-1 font-bold text-[11px] uppercase text-slate-800 text-center rounded mb-1.5">
              Evening Block (Review &amp; Rote)
            </div>
            <p className="text-[9px] text-slate-500 mb-2 text-center">Flashcards, formulas &amp; next day desk setup</p>
            <div className="space-y-1.5">
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">07:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">08:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">09:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
              <div className="flex gap-1 text-[10px]"><span className="w-12 text-slate-500 font-mono">10:00</span> <span className="border-b border-slate-300 flex-1">&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Distraction Parking Lot & Session Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {/* Distraction Parking Lot */}
        <div className="border border-slate-400 rounded-md p-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs">Distraction Parking Lot</h2>
            <span className="text-[9px] text-slate-500">Jot thoughts down &bull; Don&apos;t open your phone</span>
          </div>
          <div className="space-y-2 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-slate-200 h-4">&nbsp;</div>
            ))}
          </div>
        </div>

        {/* Daily Honest Study Hours Audit */}
        <div className="border border-slate-400 rounded-md p-3 bg-slate-50/50">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-2">Daily Honest Focus Audit</h2>
          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="border border-slate-300 bg-white rounded p-1.5">
              <div className="text-[10px] text-slate-500">Planned Hours</div>
              <div className="font-bold text-sm text-slate-800 mt-0.5">____ hrs</div>
            </div>
            <div className="border border-slate-300 bg-white rounded p-1.5">
              <div className="text-[10px] text-slate-500">Net Focus Logged</div>
              <div className="font-bold text-sm text-slate-800 mt-0.5">____ hrs</div>
            </div>
            <div className="border border-slate-300 bg-white rounded p-1.5">
              <div className="text-[10px] text-slate-500">Daily Streak #</div>
              <div className="font-bold text-sm text-slate-800 mt-0.5">____ days</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-slate-200 pt-1.5">
            <span>Tomorrow&apos;s Desk Prepared? [ &nbsp; ]</span>
            <span>Phone Kept in Another Room? [ &nbsp; ]</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400">
        Free printable study resource &bull; Generated by The Study Pilot &bull; thestudypilot.space/resources
      </div>
    </div>
  );
};

export default DailyStudyPlannerSheet;
