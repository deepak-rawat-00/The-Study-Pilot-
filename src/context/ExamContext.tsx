import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Exam, ExamCountdownInfo } from '../types';
import { processAllExamCountdowns } from '../domain/countdownEngine';
import { useStudy } from './StudyContext';

interface ExamContextType {
  exams: Exam[];
  countdowns: ExamCountdownInfo[];
  nextUpcomingExam: ExamCountdownInfo | null;
  addExam: (data: Omit<Exam, 'id' | 'createdAt'>) => Exam;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  isModalOpen: boolean;
  editingExam: Exam | null;
  openCreateModal: () => void;
  openEditModal: (exam: Exam) => void;
  closeModal: () => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

const EXAMS_STORAGE_KEY = 'studypilot_exams_v1';

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { plan } = useStudy();

  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const stored = localStorage.getItem(EXAMS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load exams', e);
    }

    // If plan has a targetExamDate, initialize with it
    if (plan?.targetExamDate) {
      return [
        {
          id: 'exam_initial_plan',
          title: plan.examName || 'Target Examination',
          date: plan.targetExamDate,
          priority: 'high',
          notes: 'Main target examination from study plan setup',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(EXAMS_STORAGE_KEY, JSON.stringify(exams));
    } catch (e) {
      console.error('Failed to save exams', e);
    }
  }, [exams]);

  // Compute countdown list
  const countdowns = useMemo(() => {
    return processAllExamCountdowns(exams, new Date());
  }, [exams]);

  const nextUpcomingExam = useMemo(() => {
    return countdowns.find((c) => c.isNextUpcoming) || null;
  }, [countdowns]);

  const addExam = (data: Omit<Exam, 'id' | 'createdAt'>): Exam => {
    const newExam: Exam = {
      id: 'exam_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      date: data.date,
      subjectId: data.subjectId,
      subjectName: data.subjectName,
      priority: data.priority || 'medium',
      notes: data.notes?.trim() || undefined,
      location: data.location?.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    setExams((prev) => [...prev, newExam]);
    return newExam;
  };

  const updateExam = (id: string, updates: Partial<Exam>) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const openCreateModal = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exam: Exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExam(null);
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        countdowns,
        nextUpcomingExam,
        addExam,
        updateExam,
        deleteExam,
        isModalOpen,
        editingExam,
        openCreateModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExams = (): ExamContextType => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExams must be used within an ExamProvider');
  }
  return context;
};
