import React from 'react';
import { CategoryPreset } from '../../types';
import { CATEGORY_PRESETS } from '../../constants/categoryPresets';
import { Button } from '../common/Button';
import { ArrowLeft, ArrowRight, Check, BookOpen, Layers } from 'lucide-react';

interface CategoryStepProps {
  selectedPreset: CategoryPreset;
  onSelectPreset: (preset: CategoryPreset) => void;
  examName: string;
  onChangeExamName: (name: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const CategoryStep: React.FC<CategoryStepProps> = ({
  selectedPreset,
  onSelectPreset,
  examName,
  onChangeExamName,
  onBack,
  onNext,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6 px-4">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Step 1 of 2
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Choose your examination or study focus
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Select a category to pre-fill standard subjects, or choose Custom to start with your own syllabus. You can edit every subject in the next step.
        </p>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {CATEGORY_PRESETS.map((preset) => {
          const isSelected = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                onSelectPreset(preset);
                onChangeExamName(preset.defaultExamName);
              }}
              className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 relative ${
                isSelected
                  ? 'border-brand-600 bg-brand-50/60 shadow-md ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/40'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {preset.badge}
                </span>
                {isSelected && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white dark:bg-brand-500">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {preset.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed flex-1">
                {preset.subtitle}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                <Layers className="w-3.5 h-3.5" />
                <span>{preset.defaultSubjects.length} default subjects</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Examination / Course Name Input */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 max-w-xl mx-auto">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Examination or Target Course Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={examName}
            onChange={(e) => onChangeExamName(e.target.value)}
            placeholder="e.g. SSC CGL 2025, UPSC Mains, Class 12 Boards"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
          This title will be displayed on your dashboard.
        </p>
      </div>

      {/* Nav Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <Button
          variant="ghost"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!examName.trim()}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shadow-sm font-semibold"
        >
          Continue to Subjects & Goals
        </Button>
      </div>
    </div>
  );
};
