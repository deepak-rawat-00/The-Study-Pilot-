import React from 'react';

export const MockTestAnalysisSheet: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Mock Test Error Analysis Journal</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; Post-Test Error Eradication System</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">MOCK #: </span>
            <span className="inline-block border-b border-slate-400 w-16">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">DATE: </span>
            <span className="inline-block border-b border-slate-400 w-24">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Test Performance Metrics Grid */}
      <div className="grid grid-cols-5 gap-2 mb-4 text-center">
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[9px] text-slate-500 uppercase font-semibold">Total Attempted</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">__ / __</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[9px] text-slate-500 uppercase font-semibold">Correct Answers</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ Qs</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[9px] text-slate-500 uppercase font-semibold">Incorrect Answers</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ Qs</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[9px] text-slate-500 uppercase font-semibold">Negative Marks Lost</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">- ____ marks</div>
        </div>
        <div className="border border-slate-800 rounded p-2 bg-white">
          <div className="text-[9px] text-slate-600 uppercase font-bold">Net Final Score</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">____ / 100</div>
        </div>
      </div>

      {/* Error Log Detailed Table */}
      <div className="border border-slate-400 rounded-md overflow-hidden mb-4">
        <div className="p-2 bg-slate-800 text-white font-bold uppercase text-[10px] flex justify-between">
          <span>Error Log &amp; Misstep Classification</span>
          <span className="text-[9px] font-normal text-slate-300">
            [C] Conceptual Gap &bull; [S] Silly/Calc Slip &bull; [M] Misread Stem &bull; [G] Time Guess
          </span>
        </div>
        <table className="w-full border-collapse text-left text-[10px]">
          <thead>
            <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300 text-center">
              <th className="p-2 border-r border-slate-300 w-10">Q#</th>
              <th className="p-2 border-r border-slate-300 text-left w-36">TOPIC / SUBTOPIC</th>
              <th className="p-2 border-r border-slate-300 w-24">CAUSE [C/S/M/G]</th>
              <th className="p-2 border-r border-slate-300 text-left">UNDERLYING FORMULA OR LESSON OVERLOOKED</th>
              <th className="p-2 border-r border-slate-300 w-20">7-DAY RE-TEST</th>
              <th className="p-2 w-16">RESOLVED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {Array.from({ length: 9 }).map((_, idx) => (
              <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                <td className="p-2 border-r border-slate-300 text-center font-bold text-slate-700">Q-{idx + 1}</td>
                <td className="p-2 border-r border-slate-300">&nbsp;</td>
                <td className="p-2 border-r border-slate-300 text-center font-mono text-slate-400">C / S / M / G</td>
                <td className="p-2 border-r border-slate-300">&nbsp;</td>
                <td className="p-2 border-r border-slate-300 text-center text-slate-400">&nbsp;</td>
                <td className="p-2 text-center text-slate-400">[ &nbsp; ]</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top 3 Strategic Corrections for Next Test */}
      <div className="border border-slate-400 rounded-md p-3 bg-slate-50/50">
        <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-1.5">Top 3 Adjustments for Next Mock</h2>
        <div className="space-y-1.5">
          <div className="flex gap-2 text-[10px]"><span className="font-bold text-slate-700">1.</span> <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span></div>
          <div className="flex gap-2 text-[10px]"><span className="font-bold text-slate-700">2.</span> <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span></div>
          <div className="flex gap-2 text-[10px]"><span className="font-bold text-slate-700">3.</span> <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400">
        Free printable study resource &bull; Generated by The Study Pilot &bull; thestudypilot.space/resources
      </div>
    </div>
  );
};

export default MockTestAnalysisSheet;
