import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useRouter } from '../../context/RouterContext';
import { CATEGORY_PRESETS } from '../../constants/categoryPresets';
import { CategoryPreset, ExamPlan, Subject } from '../../types';
import { WelcomeStep } from './WelcomeStep';
import { CategoryStep } from './CategoryStep';
import { SubjectConfigStep } from './SubjectConfigStep';
import { ThemeToggle } from '../layout/ThemeToggle';
import { BrandLogo } from '../brand/BrandLogo';
import { Home } from 'lucide-react';
import { Button } from '../common/Button';

export const OnboardingWizard: React.FC = () => {
  const { completeOnboarding } = useStudy();
  const { navigate } = useRouter();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selectedPreset, setSelectedPreset] = useState<CategoryPreset>(CATEGORY_PRESETS[0]);
  const [examName, setExamName] = useState(CATEGORY_PRESETS[0].defaultExamName);
  const [dailyTargetHours, setDailyTargetHours] = useState<number>(
    CATEGORY_PRESETS[0].defaultDailyTargetHours
  );
  const [minStreakMinutes, setMinStreakMinutes] = useState<number>(
    CATEGORY_PRESETS[0].minStreakMinutes
  );
  const [targetExamDate, setTargetExamDate] = useState<string>('');

  // Initial subjects from preset
  const [subjects, setSubjects] = useState<
    Array<{
      id: string;
      name: string;
      code: string;
      color: string;
      dailyTargetHours: number;
    }>
  >(() =>
    CATEGORY_PRESETS[0].defaultSubjects.map((s, idx) => ({
      id: 'sub_init_' + idx,
      name: s.name,
      code: s.code,
      color: s.color,
      dailyTargetHours: s.dailyTargetHours,
    }))
  );

  const handleSelectPreset = (preset: CategoryPreset) => {
    setSelectedPreset(preset);
    setExamName(preset.defaultExamName);
    setDailyTargetHours(preset.defaultDailyTargetHours);
    setMinStreakMinutes(preset.minStreakMinutes);
    setSubjects(
      preset.defaultSubjects.map((s, idx) => ({
        id: 'sub_' + preset.id + '_' + idx,
        name: s.name,
        code: s.code,
        color: s.color,
        dailyTargetHours: s.dailyTargetHours,
      }))
    );
  };

  const handleUpdateSubject = (
    id: string,
    updates: Partial<{ name: string; code: string; color: string; dailyTargetHours: number }>
  ) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleAddSubject = (name: string, code: string, color: string, hours: number) => {
    setSubjects((prev) => [
      ...prev,
      {
        id: 'sub_custom_' + Date.now().toString(36),
        name,
        code,
        color,
        dailyTargetHours: hours,
      },
    ]);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setSubjects((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    setSubjects((prev) => {
      if (index >= prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleComplete = () => {
    const newPlan: ExamPlan = {
      id: 'plan_' + Date.now().toString(36),
      category: selectedPreset.id,
      categoryLabel: selectedPreset.title,
      examName: examName.trim() || selectedPreset.defaultExamName,
      dailyTargetHours,
      minStreakMinutes,
      targetExamDate: targetExamDate || undefined,
      isOnboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };

    const newSubjects: Subject[] = subjects.map((s, idx) => ({
      id: s.id,
      name: s.name.trim(),
      code: s.code.trim().toUpperCase(),
      color: s.color,
      dailyTargetHours: s.dailyTargetHours,
      weeklyTargetHours: Math.round(s.dailyTargetHours * 7 * 10) / 10,
      studiedHoursToday: 0,
      studiedHoursThisWeek: 0,
      orderIndex: idx,
      examDate: targetExamDate || undefined,
      createdAt: new Date().toISOString(),
    }));

    completeOnboarding(newPlan, newSubjects);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 sm:px-8 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-left focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
            aria-label="The Study Pilot - Return to Home"
          >
            <BrandLogo size="md" subtitle="Setup Wizard" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/')}
            leftIcon={<Home className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex text-xs"
          >
            Home
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Wizard Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {step === 0 && <WelcomeStep onStart={() => setStep(1)} />}

        {step === 1 && (
          <CategoryStep
            selectedPreset={selectedPreset}
            onSelectPreset={handleSelectPreset}
            examName={examName}
            onChangeExamName={setExamName}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <SubjectConfigStep
            examName={examName}
            dailyTargetHours={dailyTargetHours}
            onChangeDailyTargetHours={setDailyTargetHours}
            minStreakMinutes={minStreakMinutes}
            onChangeMinStreakMinutes={setMinStreakMinutes}
            targetExamDate={targetExamDate}
            onChangeTargetExamDate={setTargetExamDate}
            subjects={subjects}
            onUpdateSubject={handleUpdateSubject}
            onAddSubject={handleAddSubject}
            onDeleteSubject={handleDeleteSubject}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onBack={() => setStep(1)}
            onComplete={handleComplete}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
        The Study Pilot • Plan Your Study. Build Your Streak. Reach Your Goals.
      </footer>
    </div>
  );
};
