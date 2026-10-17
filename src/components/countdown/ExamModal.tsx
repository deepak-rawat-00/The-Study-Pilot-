import React, { useState, useEffect } from 'react';
import { useExams } from '../../context/ExamContext';
import { useStudy } from '../../context/StudyContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Calendar, Tag, BookOpen, AlertCircle } from 'lucide-react';

export const ExamModal: React.FC = () => {
  const { isModalOpen, closeModal, addExam, updateExam, editingExam } = useExams();
  const { subjects } = useStudy();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [subjectId, setSubjectId] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingExam) {
      setTitle(editingExam.title);
      setDate(editingExam.date);
      setPriority(editingExam.priority || 'medium');
      setSubjectId(editingExam.subjectId || '');
      setNotes(editingExam.notes || '');
    } else {
      setTitle('');
      setDate('');
      setPriority('medium');
      setSubjectId('');
      setNotes('');
    }
    setError('');
  }, [editingExam, isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Examination title is required');
      return;
    }
    if (!date) {
      setError('Examination date is required');
      return;
    }

    const linkedSubject = subjects.find((s) => s.id === subjectId);

    if (editingExam) {
      updateExam(editingExam.id, {
        title: title.trim(),
        date,
        priority,
        subjectId: subjectId || undefined,
        subjectName: linkedSubject ? linkedSubject.name : undefined,
        notes: notes.trim() || undefined,
      });
    } else {
      addExam({
        title: title.trim(),
        date,
        priority,
        subjectId: subjectId || undefined,
        subjectName: linkedSubject ? linkedSubject.name : undefined,
        notes: notes.trim() || undefined,
      });
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={editingExam ? 'Edit Examination' : 'Add Examination Countdown'}
      description="Set target examination dates to track days remaining and organize revision schedules."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Examination Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SSC CGL Tier 1, UPSC Prelims, Final Physics Exam"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Date and Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Exam Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Priority Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Tag className="w-4 h-4" />
              </div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Linked Subject (Optional) */}
        {subjects.length > 0 && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Linked Course / Subject <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">All Subjects / Full Curriculum</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} — {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Preparation Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Key syllabus focus, exam center, shift timings, or goals..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {editingExam ? 'Save Changes' : 'Create Countdown'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
