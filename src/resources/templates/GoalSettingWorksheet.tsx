import React from 'react';

export const GoalSettingWorksheet: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Academic SMART Goal Setting &amp; Pre-Mortem Worksheet</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; Purpose-Driven Academic Achievement</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">SEMESTER / CYCLE: </span>
            <span className="inline-block border-b border-slate-400 w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">STUDENT: </span>
            <span className="inline-block border-b border-slate-400 w-24">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* The Big Objective & Deep 'Why' */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-slate-400 rounded-md p-3">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-1">1. The Primary Academic Target</h2>
          <p className="text-[10px] text-slate-500 mb-2">State your exact target rank, GPA, or exam qualification clearly:</p>
          <div className="space-y-1.5">
            <div className="border-b border-slate-300 h-6">&nbsp;</div>
            <div className="border-b border-slate-300 h-6">&nbsp;</div>
          </div>
        </div>
        <div className="border border-slate-400 rounded-md p-3 bg-slate-50">
          <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-1">2. The Deep Emotional &apos;Why&apos;</h2>
          <p className="text-[10px] text-slate-500 mb-2">Why does achieving this goal matter deeply to your career &amp; identity?</p>
          <div className="space-y-1.5">
            <div className="border-b border-slate-300 h-6">&nbsp;</div>
            <div className="border-b border-slate-300 h-6">&nbsp;</div>
          </div>
        </div>
      </div>

      {/* SMART Framework Breakdown */}
      <div className="border border-slate-400 rounded-md p-3 mb-4">
        <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-2">3. The S.M.A.R.T. Academic Deconstruction</h2>
        <div className="grid grid-cols-5 gap-2">
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <div className="font-bold text-slate-800 text-[11px] mb-0.5">S &bull; Specific</div>
            <p className="text-[9px] text-slate-500 mb-1.5">What exact subjects and marks?</p>
            <div className="border-b border-dashed border-slate-300 h-10">&nbsp;</div>
          </div>
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <div className="font-bold text-slate-800 text-[11px] mb-0.5">M &bull; Measurable</div>
            <p className="text-[9px] text-slate-500 mb-1.5">What numerical metric?</p>
            <div className="border-b border-dashed border-slate-300 h-10">&nbsp;</div>
          </div>
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <div className="font-bold text-slate-800 text-[11px] mb-0.5">A &bull; Actionable</div>
            <p className="text-[9px] text-slate-500 mb-1.5">Daily focus block habits?</p>
            <div className="border-b border-dashed border-slate-300 h-10">&nbsp;</div>
          </div>
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <div className="font-bold text-slate-800 text-[11px] mb-0.5">R &bull; Realistic</div>
            <p className="text-[9px] text-slate-500 mb-1.5">Sustainable net daily hrs?</p>
            <div className="border-b border-dashed border-slate-300 h-10">&nbsp;</div>
          </div>
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <div className="font-bold text-slate-800 text-[11px] mb-0.5">T &bull; Time-Bound</div>
            <p className="text-[9px] text-slate-500 mb-1.5">Milestone deadline date?</p>
            <div className="border-b border-dashed border-slate-300 h-10">&nbsp;</div>
          </div>
        </div>
      </div>

      {/* Pre-Mortem & Obstacle Defense Plan */}
      <div className="border border-slate-400 rounded-md p-3 mb-4">
        <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-1">4. The Obstacle &quot;Pre-Mortem&quot; Protocol</h2>
        <p className="text-[10px] text-slate-500 mb-2">Pre-program your defense against predictable study disruptions:</p>
        <div className="space-y-2 text-[10px]">
          <div className="flex gap-2 items-center">
            <span className="font-bold text-slate-700 w-44 shrink-0">&bull; When social media tempts me:</span>
            <span className="text-slate-500 italic">I will put my phone inside a drawer in another room before opening my book.</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-slate-700 w-44 shrink-0">&bull; When I feel zero motivation:</span>
            <span className="text-slate-500 italic">I will complete my 25-minute minimum floor session and permit myself to stop.</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-slate-700 w-44 shrink-0">&bull; When a day is missed:</span>
            <span className="text-slate-500 italic">I will apply the &quot;Never Twice&quot; rule and return to my desk tomorrow with zero guilt.</span>
          </div>
        </div>
      </div>

      {/* Signature & Accountability Anchor */}
      <div className="flex justify-between items-center border border-slate-400 rounded-md p-3 bg-slate-50/50">
        <div className="text-[10px] text-slate-600">
          I commit to executing this study plan with daily consistency, honest tracking, and resilient habits.
        </div>
        <div className="flex gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-700">SIGNATURE: </span>
            <span className="inline-block border-b border-slate-400 w-32">&nbsp;</span>
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

export default GoalSettingWorksheet;
