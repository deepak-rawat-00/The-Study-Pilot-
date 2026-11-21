import React from 'react';

export const WeeklyTimetableSheet: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Weekly Study Blueprint</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; 7-Day Resilient Time Blocking</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">WEEK OF: </span>
            <span className="inline-block border-b border-slate-400 w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">TARGET: </span>
            <span className="inline-block border-b border-slate-400 w-20">&nbsp; hrs</span>
          </div>
        </div>
      </div>

      {/* 7-Day Weekly Grid */}
      <div className="border border-slate-400 rounded-md overflow-hidden mb-4">
        <table className="w-full border-collapse text-left text-[10px]">
          <thead>
            <tr className="bg-slate-800 text-white font-bold text-center">
              <th className="p-2 border-r border-slate-700 w-24">TIME / MODE</th>
              {days.map((day) => (
                <th key={day} className="p-2 border-r border-slate-700 last:border-r-0 uppercase">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {/* Morning Deep Work */}
            <tr>
              <td className="p-2 bg-slate-100 font-bold text-slate-800 border-r border-slate-300 text-center">
                MORNING<br />
                <span className="text-[9px] font-normal text-slate-500">Deep Work</span>
              </td>
              {days.map((_, i) => (
                <td key={i} className="p-2 border-r border-slate-300 last:border-r-0 h-16 align-top">
                  <div className="text-[8px] text-slate-400">Subject &amp; Goal:</div>
                </td>
              ))}
            </tr>

            {/* Afternoon Session */}
            <tr>
              <td className="p-2 bg-slate-50 font-bold text-slate-800 border-r border-slate-300 text-center">
                AFTERNOON<br />
                <span className="text-[9px] font-normal text-slate-500">Practice Drills</span>
              </td>
              {days.map((_, i) => (
                <td key={i} className="p-2 border-r border-slate-300 last:border-r-0 h-16 align-top">
                  <div className="text-[8px] text-slate-400">Problem Sets / PYQs:</div>
                </td>
              ))}
            </tr>

            {/* Evening Review */}
            <tr>
              <td className="p-2 bg-slate-100 font-bold text-slate-800 border-r border-slate-300 text-center">
                EVENING<br />
                <span className="text-[9px] font-normal text-slate-500">Consolidation</span>
              </td>
              {days.map((day, i) => (
                <td key={i} className="p-2 border-r border-slate-300 last:border-r-0 h-16 align-top">
                  {day === 'Friday' ? (
                    <div className="bg-slate-100 p-1 rounded text-center font-bold text-slate-700 border border-slate-300">
                      20% FLEX BUFFER (Catch-up)
                    </div>
                  ) : day === 'Sunday' ? (
                    <div className="bg-slate-100 p-1 rounded text-center font-bold text-slate-700 border border-slate-300">
                      Sunday Audit &amp; Reset
                    </div>
                  ) : (
                    <div className="text-[8px] text-slate-400">Flashcards &amp; Notes:</div>
                  )}
                </td>
              ))}
            </tr>

            {/* Target vs Actual */}
            <tr className="bg-slate-50 font-bold">
              <td className="p-2 border-r border-slate-300 text-slate-800 text-center">NET HOURS</td>
              {days.map((_, i) => (
                <td key={i} className="p-2 border-r border-slate-300 last:border-r-0 text-center text-slate-600">
                  __ / __ hrs
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Weekly Planning Rules & Sunday Review Checklist */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-slate-400 rounded-md p-3">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-2">Weekly Buffer &amp; Spacing Rules</h2>
          <ul className="space-y-1.5 text-[10px] text-slate-700">
            <li className="flex gap-1.5">
              <span className="font-bold text-slate-900">&bull;</span>
              <span><strong>80% Rule:</strong> Schedule only 80% of free hours to create resilience against unexpected delays.</span>
            </li>
            <li className="flex gap-1.5">
              <span className="font-bold text-slate-900">&bull;</span>
              <span><strong>Friday Buffer:</strong> Absorb delayed chapters here without feeling behind or sacrificing sleep.</span>
            </li>
            <li className="flex gap-1.5">
              <span className="font-bold text-slate-900">&bull;</span>
              <span><strong>Interleaving:</strong> Alternate between analytical subjects and descriptive subjects daily.</span>
            </li>
          </ul>
        </div>

        <div className="border border-slate-400 rounded-md p-3 bg-slate-50/50">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-2">20-Minute Sunday Audit Checklist</h2>
          <div className="space-y-1.5 text-[10px] text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border border-slate-500 rounded-sm inline-block">&nbsp;</span>
              <span>Count honest net focus hours vs weekly target.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border border-slate-500 rounded-sm inline-block">&nbsp;</span>
              <span>Consolidate test error log items and flag weak formulas.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border border-slate-500 rounded-sm inline-block">&nbsp;</span>
              <span>Fill in next week&apos;s blueprint and print fresh worksheets.</span>
            </div>
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

export default WeeklyTimetableSheet;
