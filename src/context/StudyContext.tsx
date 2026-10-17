import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationTab, Subject, SubjectFormData, ExamPlan } from '../types';
import { CATEGORY_PRESETS } from '../constants/categoryPresets';

interface StudyContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  plan: ExamPlan | null;
  isOnboarding: boolean;
  startOnboarding: () => void;
  completeOnboarding: (newPlan: ExamPlan, newSubjects: Subject[]) => void;
  exploreDemo: () => void;
  subjects: Subject[];
  addSubject: (data: SubjectFormData) => Subject;
  updateSubject: (id: string, data: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  moveSubjectUp: (index: number) => void;
  moveSubjectDown: (index: number) => void;
  isCreateModalOpen: boolean;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  resetAllData: () => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

const PLAN_STORAGE_KEY = 'studypilot_plan_v1';
const SUBJECTS_STORAGE_KEY = 'studypilot_subjects_v1';

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Load Exam Plan from localStorage
  const [plan, setPlan] = useState<ExamPlan | null>(() => {
    try {
      const stored = localStorage.getItem(PLAN_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load study plan', e);
    }
    return null;
  });

  // Load Subjects from localStorage
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    try {
      const stored = localStorage.getItem(SUBJECTS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load saved subjects', e);
    }
    return [];
  });

  // Onboarding state: if no completed plan exists, user is in onboarding
  const [isOnboarding, setIsOnboarding] = useState<boolean>(() => {
    return !plan || !plan.isOnboardingCompleted;
  });

  // Sync plan to localStorage
  useEffect(() => {
    try {
      if (plan) {
        localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plan));
      } else {
        localStorage.removeItem(PLAN_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save study plan', e);
    }
  }, [plan]);

  // Sync subjects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
    } catch (e) {
      console.error('Failed to save subjects', e);
    }
  }, [subjects]);

  const startOnboarding = () => {
    setIsOnboarding(true);
  };

  const completeOnboarding = (newPlan: ExamPlan, newSubjects: Subject[]) => {
    setPlan(newPlan);
    setSubjects(newSubjects);
    setIsOnboarding(false);
    setCurrentTab('dashboard');
  };

  const exploreDemo = () => {
    const defaultPreset = CATEGORY_PRESETS[0]; // SSC CGL preset
    const demoPlan: ExamPlan = {
      id: 'plan_demo',
      category: defaultPreset.id,
      categoryLabel: defaultPreset.title,
      examName: defaultPreset.defaultExamName,
      dailyTargetHours: defaultPreset.defaultDailyTargetHours,
      minStreakMinutes: defaultPreset.minStreakMinutes,
      isOnboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };

    const demoSubjects: Subject[] = defaultPreset.defaultSubjects.map((s, idx) => ({
      id: 'sub_demo_' + idx,
      name: s.name,
      code: s.code,
      color: s.color,
      dailyTargetHours: s.dailyTargetHours,
      weeklyTargetHours: s.dailyTargetHours * 7,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: idx,
      createdAt: new Date().toISOString(),
    }));

    completeOnboarding(demoPlan, demoSubjects);
  };

  const addSubject = (formData: SubjectFormData): Subject => {
    const dailyTarget = formData.dailyTargetHours || (formData.weeklyTargetHours ? Math.round(formData.weeklyTargetHours / 7) : 2);
    const weeklyTarget = formData.weeklyTargetHours || dailyTarget * 7;

    const newSubject: Subject = {
      id: 'sub_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: formData.name.trim(),
      code: formData.code.trim().toUpperCase(),
      color: formData.color,
      description: formData.description?.trim(),
      dailyTargetHours: Math.max(0.5, dailyTarget),
      weeklyTargetHours: Math.max(1, weeklyTarget),
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: subjects.length,
      examDate: formData.examDate,
      createdAt: new Date().toISOString(),
    };

    setSubjects((prev) => [...prev, newSubject]);
    return newSubject;
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSubjectUp = (index: number) => {
    if (index <= 0) return;
    setSubjects((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, i) => ({ ...item, orderIndex: i }));
    });
  };

  const moveSubjectDown = (index: number) => {
    setSubjects((prev) => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((item, i) => ({ ...item, orderIndex: i }));
    });
  };

  const resetAllData = () => {
    localStorage.removeItem(PLAN_STORAGE_KEY);
    localStorage.removeItem(SUBJECTS_STORAGE_KEY);
    setPlan(null);
    setSubjects([]);
    setIsOnboarding(true);
    setCurrentTab('dashboard');
  };

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <StudyContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        plan,
        isOnboarding,
        startOnboarding,
        completeOnboarding,
        exploreDemo,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        moveSubjectUp,
        moveSubjectDown,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        resetAllData,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = (): StudyContextType => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};
