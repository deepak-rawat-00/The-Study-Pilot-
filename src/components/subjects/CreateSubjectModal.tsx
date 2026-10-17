import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { BookOpen, Calendar, Clock, Hash, Check } from 'lucide-react';

const COLOR_PALETTE = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Purple', value: '#a855f7' },
];

export const CreateSubjectModal: React.FC = () => {
  const { isCreateModalOpen, closeCreateModal, addSubject } = useStudy();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [color, setColor] = useState(COLOR_PALETTE[0].value);
  const [dailyTargetHours, setDailyTargetHours] = useState(2);
  const [examDate, setExamDate] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = 'Subject name is required';
    }
    if (!code.trim()) {
      errs.code = 'Subject code or abbreviation is required (e.g. MATH)';
    }
    if (dailyTargetHours < 0.5 || dailyTargetHours > 16) {
      errs.dailyTargetHours = 'Daily target must be between 0.5 and 16 hours/day';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addSubject({
      name: name.trim(),
      code: code.trim(),
      color,
      dailyTargetHours: Number(dailyTargetHours),
      weeklyTargetHours: Math.round(Number(dailyTargetHours) * 7 * 10) / 10,
      examDate: examDate || undefined,
      description: description.trim() || undefined,
    });

    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCode('');
    setColor(COLOR_PALETTE[0].value);
    setDailyTargetHours(2);
    setExamDate('');
    setDescription('');
    setErrors({});
    closeCreateModal();
  };

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={handleClose}
      title="Create New Subject"
      description="Add a subject or course to track study progress and daily allocations."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Subject Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Quantitative Aptitude"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
        </div>

        {/* Code & Daily Hours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Subject Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Code / Abbreviation <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Hash className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. MATH"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.code && <p className="mt-1 text-xs text-rose-500">{errors.code}</p>}
          </div>

          {/* Daily Target Hours */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Daily Target (hrs) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <input
                type="number"
                min="0.5"
                max="16"
                step="0.5"
                value={dailyTargetHours}
                onChange={(e) => setDailyTargetHours(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            {errors.dailyTargetHours && (
              <p className="mt-1 text-xs text-rose-500">{errors.dailyTargetHours}</p>
            )}
          </div>
        </div>

        {/* Exam Date (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Exam Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Color Palette Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Theme Color
          </label>
          <div className="flex flex-wrap gap-2.5">
            {COLOR_PALETTE.map((c) => {
              const isSelected = color === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-slate-900 shadow-sm"
                  aria-label={`Select ${c.name} color`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Description / Notes (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Subject Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Key syllabus topics, textbook chapters, or goals..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Subject
          </Button>
        </div>
      </form>
    </Modal>
  );
};
