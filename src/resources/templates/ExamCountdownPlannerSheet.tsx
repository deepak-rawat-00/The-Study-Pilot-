import React from 'react';

export const ExamCountdownPlannerSheet: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Exam Countdown &amp; Target Score Planner</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; Strategic Exam Periodization</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">TARGET EXAM: </span>
            <span className="inline-block border-b border-slate-400 w-32">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">EXAM DATE: </span>
            <span className="inline-block border-b border-slate-400 w-24">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Target Metric Banner */}
      <div className="grid grid-cols-4 gap-3 mb-4 text-center">
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Days Left</div>
          <div className="text-xl font-black text-slate-800 mt-0.5">____ DAYS</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Goal Score / Rank</div>
          <div className="text-xl font-black text-slate-800 mt-0.5">____ / 100</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Baseline Mock Score</div>
          <div className="text-xl font-black text-slate-800 mt-0.5">____ / 100</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Target Accuracy Rate</div>
          <div className="text-xl font-black text-slate-800 mt-0.5">85% +</div>
        </div>
      </div>

      {/* Top 5 Weak Topic Hit List */}
      <div className="border border-slate-400 rounded-md p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs">High-Yield Weak Topic Hit List</h2>
          <span className="text-[10px] text-slate-500">The 5 topics holding your score back most</span>
        </div>
        <div className="space-y-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <span className="font-bold text-slate-600 font-mono w-4">#{i}</span>
              <div className="border-b border-slate-300 flex-1 h-5">&nbsp;</div>
              <div className="w-24 text-slate-400 border-b border-slate-300 text-right">PYQs Solved: [ &nbsp; ]</div>
              <div className="w-24 text-slate-400 border-b border-slate-300 text-right">Mastered: [ &nbsp; ]</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock Score Trajectory Log */}
      <div className="border border-slate-400 rounded-md overflow-hidden mb-4">
        <div className="p-2 bg-slate-100 font-bold uppercase text-slate-800 text-[11px] border-b border-slate-300">
          Mock Test Performance Trajectory (Track Progress Over Time)
        </div>
        <table className="w-full border-collapse text-left text-[10px]">
          <thead>
            <tr className="bg-slate-800 text-white font-bold text-center">
              <th className="p-2 border-r border-slate-700 w-12">MOCK #</th>
              <th className="p-2 border-r border-slate-700 w-24">DATE</th>
              <th className="p-2 border-r border-slate-700 w-24">RAW SCORE</th>
              <th className="p-2 border-r border-slate-700 w-24">% OR PERCENTILE</th>
              <th className="p-2 border-r border-slate-700 w-24">NEGATIVE MARKS</th>
              <th className="p-2 text-left">TOP ERROR CLUSTER IDENTIFIED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {Array.from({ length: 6 }).map((_, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                <td className="p-2 border-r border-slate-300 text-center font-bold text-slate-700">M-{idx + 1}</td>
                <td className="p-2 border-r border-slate-300 text-center">&nbsp;</td>
                <td className="p-2 border-r border-slate-300 text-center font-mono">__ / __</td>
                <td className="p-2 border-r border-slate-300 text-center font-mono">__ %</td>
                <td className="p-2 border-r border-slate-300 text-center font-mono">- __</td>
                <td className="p-2 text-slate-400">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400">
        Free printable study resource &bull; Generated by The Study Pilot &bull; thestudypilot.space/resources
      </div>
    </div>
  );
};

export default ExamCountdownPlannerSheet;
