import React from 'react';

export const FormulaSheetTemplate: React.FC = () => {
  return (
    <div className="bg-white text-slate-900 p-8 max-w-5xl mx-auto border border-slate-300 rounded-lg print:border-none print:p-0 print:m-0 font-sans text-xs">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Core Formula &amp; Concept Crib Sheet</h1>
          <p className="text-slate-600 text-xs mt-0.5">The Study Pilot &bull; thestudypilot.space &bull; 1-Page High-Yield Topic Synthesis</p>
        </div>
        <div className="flex gap-4 text-right">
          <div>
            <span className="font-bold text-slate-700">SUBJECT: </span>
            <span className="inline-block border-b border-slate-400 w-28">&nbsp;</span>
          </div>
          <div>
            <span className="font-bold text-slate-700">CHAPTER: </span>
            <span className="inline-block border-b border-slate-400 w-32">&nbsp;</span>
          </div>
        </div>
      </div>

      {/* 4 Quadrants Layout */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Quadrant 1: Essential Formulas & Equations */}
        <div className="border border-slate-400 rounded-md p-3 h-56 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
              <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">1. Essential Formulas &amp; Units</h2>
              <span className="text-[9px] text-slate-500">Variables &amp; SI Units</span>
            </div>
            <div className="space-y-3 pt-1">
              <div className="border-b border-dashed border-slate-300 h-6 flex items-center justify-between text-slate-400 text-[10px]">
                <span>Formula 1:</span> <span className="font-mono text-[9px]">[Units: _____]</span>
              </div>
              <div className="border-b border-dashed border-slate-300 h-6 flex items-center justify-between text-slate-400 text-[10px]">
                <span>Formula 2:</span> <span className="font-mono text-[9px]">[Units: _____]</span>
              </div>
              <div className="border-b border-dashed border-slate-300 h-6 flex items-center justify-between text-slate-400 text-[10px]">
                <span>Formula 3:</span> <span className="font-mono text-[9px]">[Units: _____]</span>
              </div>
              <div className="border-b border-dashed border-slate-300 h-6 flex items-center justify-between text-slate-400 text-[10px]">
                <span>Formula 4:</span> <span className="font-mono text-[9px]">[Units: _____]</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 italic">Key Constants: ____________________</div>
        </div>

        {/* Quadrant 2: Core Definitions & Conditions */}
        <div className="border border-slate-400 rounded-md p-3 h-56 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
              <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">2. Theorems &amp; Boundary Conditions</h2>
              <span className="text-[9px] text-slate-500">When does this formula apply?</span>
            </div>
            <div className="space-y-3 pt-1">
              <div className="border-b border-dashed border-slate-300 h-6 text-slate-400 text-[10px]">Condition 1:</div>
              <div className="border-b border-dashed border-slate-300 h-6 text-slate-400 text-[10px]">Condition 2:</div>
              <div className="border-b border-dashed border-slate-300 h-6 text-slate-400 text-[10px]">Key Definition:</div>
              <div className="border-b border-dashed border-slate-300 h-6 text-slate-400 text-[10px]">Underlying Assumption:</div>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 italic">Pre-requisite concept: ____________________</div>
        </div>

        {/* Quadrant 3: Common Traps & Exceptions */}
        <div className="border border-slate-800 rounded-md p-3 h-56 bg-slate-50/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-300 pb-1 mb-2">
              <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">3. Examiner Traps &amp; Common Errors</h2>
              <span className="text-[9px] text-slate-600 font-semibold">Do NOT make these mistakes</span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex gap-1.5 text-[10px] text-slate-700">
                <span className="font-bold text-slate-900">&bull;</span>
                <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span>
              </div>
              <div className="flex gap-1.5 text-[10px] text-slate-700">
                <span className="font-bold text-slate-900">&bull;</span>
                <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span>
              </div>
              <div className="flex gap-1.5 text-[10px] text-slate-700">
                <span className="font-bold text-slate-900">&bull;</span>
                <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span>
              </div>
              <div className="flex gap-1.5 text-[10px] text-slate-700">
                <span className="font-bold text-slate-900">&bull;</span>
                <span className="border-b border-slate-300 flex-1 h-5">&nbsp;</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 font-semibold">Sign convention rule: ____________________</div>
        </div>

        {/* Quadrant 4: Worked Archetype Problem */}
        <div className="border border-slate-400 rounded-md p-3 h-56 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-1 mb-2">
              <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">4. Worked Archetype Problem</h2>
              <span className="text-[9px] text-slate-500">Benchmark solved example</span>
            </div>
            <div className="text-[10px] text-slate-500 mb-1">Standard Problem Prompt:</div>
            <div className="border-b border-slate-200 h-4 mb-2">&nbsp;</div>
            <div className="text-[10px] text-slate-500 mb-1">Key Solving Steps:</div>
            <div className="space-y-1">
              <div className="border-b border-dashed border-slate-200 h-4">&nbsp;</div>
              <div className="border-b border-dashed border-slate-200 h-4">&nbsp;</div>
            </div>
          </div>
          <div className="text-[9px] text-slate-400 text-right">Final Answer Format: ____________________</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400">
        Free printable study resource &bull; Generated by The Study Pilot &bull; thestudypilot.space/resources
      </div>
    </div>
  );
};

export default FormulaSheetTemplate;
