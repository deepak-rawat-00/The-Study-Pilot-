import React from 'react';

export const MonthlyExamPlannerSheet: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">30-Day Exam Countdown &amp; Monthly Roadmap</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; 4-Week Strategic Milestone Planner</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">EXAM: </span>
            <span className="inline-block border-b border-slate-400 w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">DATE: </span>
            <span className="inline-block border-b border-slate-400 w-24">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* Target Metric Banner */}
      <div className="grid grid-cols-4 gap-3 mb-4 text-center">
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Days to Exam</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ DAYS</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Target Score / %</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ %</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Total Chapters Left</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ Ch.</div>
        </div>
        <div className="border border-slate-400 rounded p-2 bg-slate-50">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Full Mocks Planned</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">____ Tests</div>
        </div>
      </div>

      {/* 4-Week Milestone Grid */}
      <div className="space-y-3 mb-4">
        {[
          { week: 'WEEK 1 (Days 1–7)', theme: 'Foundation & Core Chapter Closure', focus: 'Complete all pending Phase 1 theory notes' },
          { week: 'WEEK 2 (Days 8–14)', theme: 'Intensive Problem Solving & PYQs', focus: 'Past 5-year question drilling topic-by-topic' },
          { week: 'WEEK 3 (Days 15–21)', theme: 'Sectional & Full Mock Battery', focus: 'Timed test simulation + 3-hour error log audits' },
          { week: 'WEEK 4 (Days 22–30)', theme: 'Formula Lock-In & Final Polishing', focus: 'Rapid 2-page crib sheet retrieval + rest before test' },
        ].map((item, idx) => (
          <div key={idx} className="border border-slate-400 rounded-md p-3">
            <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
              <div>
                <span className="font-bold text-slate-900 text-xs uppercase">{item.week}: </span>
                <span className="font-semibold text-slate-700 text-xs">{item.theme}</span>
              </div>
              <span className="text-[10px] text-slate-500 italic">{item.focus}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Chapters to Cover:</span>
                <div className="space-y-1">
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                </div>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Practice / PYQ Target:</span>
                <div className="space-y-1">
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                </div>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">Mock Test &amp; Date:</span>
                <div className="space-y-1">
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                  <div className="border-b border-dashed border-slate-300 h-4">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Checklist */}
      <div className="border border-slate-400 rounded-md p-3 bg-slate-50/50">
        <h2 className="font-bold uppercase tracking-wider text-slate-800 text-xs mb-1.5">Pre-Exam Sanity Rules</h2>
        <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-700">
          <div>&bull; Never start a brand new complex topic in the final 7 days.</div>
          <div>&bull; Prioritize sleep (7.5+ hrs) to consolidate working memory.</div>
          <div>&bull; Re-solve past mistakes from your Error Log every Sunday.</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400">
        Free printable study resource &bull; Generated by The Study Pilot &bull; thestudypilot.space/resources
      </div>
    </div>
  );
};

export default MonthlyExamPlannerSheet;
