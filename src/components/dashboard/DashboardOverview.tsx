import React, { useMemo } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useTimer } from '../../context/TimerContext';
import { useExams } from '../../context/ExamContext';
import { EmptyState } from './EmptyState';
import { Card, CardHeader, CardTitle, CardDescription } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { StudyStreakCard } from './StudyStreakCard';
import { calculateStudyStreaks } from '../../domain/streakEngine';
import {
  calculateDailyProgress,
  formatDurationHoursMinutes,
} from '../../domain/dashboardEngine';
import { formatSecondsToTimeString } from '../../domain/timerEngine';
import {
  Target,
  Calendar,
  CalendarClock,
  Plus,
  ArrowRight,
  Flame,
  Play,
  Sparkles,
  Sliders,
  Clock,
  CheckCircle2,
  Radio,
  Pause,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { subjects, plan, openCreateModal, setCurrentTab, startOnboarding } = useStudy();
  const { sessions, timerState, activeSeconds, setSelectedSubjectId } = useTimer();
  const { countdowns, nextUpcomingExam, openCreateModal: openCreateExamModal } = useExams();

  const minStreakMinutes = plan?.minStreakMinutes || 60;
  const streakResult = useMemo(() => {
    return calculateStudyStreaks({
      sessions,
      minStreakMinutes,
      referenceDate: new Date(),
    });
  }, [sessions, minStreakMinutes]);

  if (subjects.length === 0) {
    return <EmptyState />;
  }

  // Pure, live daily metrics calculation combining completed sessions + active timer
  const metrics = useMemo(() => {
    return calculateDailyProgress({
      subjects,
      completedSessions: sessions,
      activeTimerState: timerState,
      targetDate: new Date(),
      dailyGoalHours: plan?.dailyTargetHours,
      currentTimestamp: Date.now(),
    });
  }, [subjects, sessions, timerState, activeSeconds, plan?.dailyTargetHours]);

  const getDaysUntilExam = (dateStr?: string) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(dateStr);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const planExamDays = getDaysUntilExam(plan?.targetExamDate);

  // Suggested next subject: pick first subject whose daily target isn't met yet
  const suggestedSubject =
    metrics.subjectMetrics.find((s) => !s.isTargetMet) || metrics.subjectMetrics[0];

  const handleStudySubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('timer');
  };

  // Filter today's completed sessions
  const now = new Date();
  const todayDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')}`;
  const todaySessions = sessions.filter((s) => s.dateString === todayDateStr);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Live Active Session Banner */}
      {metrics.hasActiveSession && (
        <div className="rounded-2xl border border-brand-300 bg-brand-50/80 p-4 shadow-sm dark:border-brand-800 dark:bg-brand-950/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm dark:bg-brand-500 shrink-0">
              {timerState.phase === 'studying' ? (
                <>
                  <Radio className="w-5 h-5 animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </>
              ) : (
                <Pause className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  {timerState.phase === 'studying' ? 'Session In Progress' : 'Session Paused'}
                </span>
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 px-2 py-0.5 rounded-md">
                  {formatSecondsToTimeString(activeSeconds)}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                Studying {subjects.find((s) => s.id === metrics.activeSubjectId)?.name || 'Subject'}. Live focus time is counting toward today's goal.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setCurrentTab('timer')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="self-start sm:self-auto shrink-0 shadow-sm font-semibold"
          >
            Open Timer
          </Button>
        </div>
      )}

      {/* Welcome & Plan Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {plan?.examName || 'Dashboard'}
            </h1>
            {plan?.categoryLabel && (
              <Badge variant="primary" size="md">
                {plan.categoryLabel}
              </Badge>
            )}
            {planExamDays !== null && (
              <Badge
                variant={planExamDays <= 7 ? 'danger' : planExamDays <= 30 ? 'warning' : 'default'}
                size="md"
              >
                <Calendar className="w-3 h-3" />
                <span>
                  {planExamDays < 0
                    ? 'Exam passed'
                    : planExamDays === 0
                    ? 'Exam is Today!'
                    : `${planExamDays} days to exam`}
                </span>
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time daily study tracking. Calculated strictly from authentic active focus sessions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={startOnboarding}
            leftIcon={<Sliders className="w-4 h-4" />}
            title="Reconfigure your study plan and target allocations"
          >
            Reconfigure Plan
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={openCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Subject
          </Button>
        </div>
      </div>

      {/* Primary Required Widget: Daily Goal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 border-brand-200/60 dark:border-brand-900/40 bg-gradient-to-br from-white to-brand-50/20 dark:from-slate-900 dark:to-brand-950/20">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Today's Daily Goal
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-slate-500 dark:text-slate-400">Streak:</span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>
                  {streakResult.currentStreak} {streakResult.currentStreak === 1 ? 'day' : 'days'}{' '}
                  {streakResult.isActiveToday
                    ? '(Active today)'
                    : `(${Math.max(
                        0,
                        minStreakMinutes -
                          Math.floor(
                            (streakResult.historyMap[todayDateStr] || 0) / 60
                          )
                      )}m needed)`}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Daily Target
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {metrics.targetHours}h
              </p>
              <span className="text-[11px] text-slate-400">
                {formatDurationHoursMinutes(metrics.targetSeconds)}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Actual Focused
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {metrics.studiedHoursToday}h
              </p>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {formatDurationHoursMinutes(metrics.studiedSecondsToday)} logged
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Remaining
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-700 dark:text-slate-300 mt-1">
                {metrics.remainingHours}h
              </p>
              <span className="text-[11px] text-slate-400">
                {metrics.remainingSeconds > 0
                  ? `${formatDurationHoursMinutes(metrics.remainingSeconds)} to goal`
                  : 'Target achieved!'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Completion
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 mt-1">
                {metrics.completionPercentage}%
              </p>
              <span className="text-[11px] text-slate-400">
                {metrics.completedSubjectTargetsCount} of {metrics.totalSubjectsCount} subjects done
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <ProgressBar
              value={metrics.studiedSecondsToday}
              max={metrics.targetSeconds}
              label={`Daily Target Progress (${metrics.completedSubjectTargetsCount}/${metrics.totalSubjectsCount} subject goals achieved)`}
              showPercentage={true}
              size="lg"
            />
          </div>
        </Card>

        {/* Suggested Next Subject Card */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Suggested Next Subject
              </h3>
            </div>

            {suggestedSubject && (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-xs"
                    style={{ backgroundColor: suggestedSubject.color }}
                  >
                    {suggestedSubject.code}
                  </span>
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {suggestedSubject.name}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Daily Target: <span className="font-semibold text-slate-700 dark:text-slate-300">{suggestedSubject.dailyTargetHours}h</span> • Focused:{' '}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {suggestedSubject.studiedHoursToday}h
                  </span>{' '}
                  ({suggestedSubject.remainingHours}h remaining).
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => handleStudySubject(suggestedSubject.subjectId)}
              leftIcon={<Play className="w-4 h-4 fill-current" />}
              className="w-full font-semibold shadow-sm"
            >
              Start Studying {suggestedSubject?.code}
            </Button>
          </div>
        </Card>
      </div>

      {/* Milestone 4: Study Streak & Examination Countdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <StudyStreakCard />
        </div>

        {/* Upcoming Exams Highlight Card */}
        <Card className="flex flex-col justify-between border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Exams
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentTab('countdown')}
                className="text-xs h-7 px-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold"
              >
                View All ({countdowns.length})
              </Button>
            </div>

            {countdowns.length === 0 ? (
              <div className="py-6 text-center space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No exams scheduled yet. Set your test dates to track countdowns.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={openCreateExamModal}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Add Exam Date
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {nextUpcomingExam && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant={
                          nextUpcomingExam.status === 'today'
                            ? 'danger'
                            : nextUpcomingExam.daysRemaining <= 7
                            ? 'danger'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {nextUpcomingExam.status === 'today'
                          ? 'Today / D-Day!'
                          : `${nextUpcomingExam.daysRemaining} days left`}
                      </Badge>
                      {nextUpcomingExam.exam.priority && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          {nextUpcomingExam.exam.priority}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {nextUpcomingExam.exam.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{nextUpcomingExam.formattedDate}</span>
                        {nextUpcomingExam.exam.subjectName && (
                          <>
                            <span>•</span>
                            <span className="text-brand-600 dark:text-brand-400 font-medium">
                              {nextUpcomingExam.exam.subjectName}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional upcoming exams */}
                {countdowns
                  .filter((c) => c !== nextUpcomingExam && c.status !== 'passed')
                  .slice(0, 2)
                  .map((item) => (
                    <div
                      key={item.exam.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {item.exam.title}
                        </p>
                        <p className="text-[11px] text-slate-400">{item.formattedDate}</p>
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">
                        {item.status === 'today' ? 'Today' : `${item.daysRemaining}d`}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={openCreateExamModal}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              className="text-xs text-slate-600 dark:text-slate-400"
            >
              Add Exam
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentTab('countdown')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs text-brand-600 dark:text-brand-400 font-semibold"
            >
              Full Schedule
            </Button>
          </div>
        </Card>
      </div>

      {/* Subject Cards Grid with Subject-Wise Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Subject Target Allocations & Progress
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time daily focus progress calculated for each enrolled subject
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {metrics.totalSubjectsCount} subjects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.subjectMetrics.map((subject) => {
            const isCurrentlyStudyingThis =
              metrics.hasActiveSession && metrics.activeSubjectId === subject.subjectId;

            return (
              <Card
                key={subject.subjectId}
                hoverEffect
                className={`flex flex-col justify-between transition-all ${
                  isCurrentlyStudyingThis
                    ? 'ring-2 ring-brand-500/40 bg-brand-50/10 dark:bg-brand-950/20'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-2xs"
                      style={{ backgroundColor: subject.color }}
                    >
                      {subject.code}
                    </span>
                    {isCurrentlyStudyingThis ? (
                      <Badge variant="primary" size="sm" className="animate-pulse">
                        Live Tracking
                      </Badge>
                    ) : subject.isTargetMet ? (
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Target Met</span>
                      </Badge>
                    ) : (
                      <Badge variant="default" size="sm">
                        {subject.remainingHours}h left
                      </Badge>
                    )}
                  </div>

                  <h3
                    className="font-bold text-slate-900 dark:text-white text-base truncate"
                    title={subject.name}
                  >
                    {subject.name}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div>
                      <span>Daily Target:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {subject.dailyTargetHours}h
                      </p>
                    </div>
                    <div>
                      <span>Focused:</span>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                        {formatDurationHoursMinutes(subject.studiedSecondsToday)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <ProgressBar
                    value={subject.studiedSecondsToday}
                    max={subject.dailyTargetSeconds}
                    color={subject.color}
                    size="sm"
                    showPercentage={false}
                  />

                  <Button
                    size="sm"
                    variant={isCurrentlyStudyingThis ? 'secondary' : 'ghost'}
                    onClick={() => handleStudySubject(subject.subjectId)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    className="w-full text-xs justify-between"
                  >
                    <span>
                      {isCurrentlyStudyingThis ? 'In Focus (View Timer)' : `Study ${subject.code}`}
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Today's Study Sessions on Dashboard */}
      {todaySessions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <CardTitle className="text-base">Today's Recorded Focus Sessions</CardTitle>
              </div>
              <Badge variant="success" size="sm">
                {todaySessions.length} logged
              </Badge>
            </div>
            <CardDescription>
              Authentic study intervals recorded via the study timer today.
            </CardDescription>
          </CardHeader>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todaySessions.map((sess) => (
              <div
                key={sess.id}
                className="py-3 flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-2xs"
                    style={{ backgroundColor: sess.subjectColor }}
                  >
                    {sess.subjectCode}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {sess.subjectName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(sess.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      –{' '}
                      {new Date(sess.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {sess.notes && ` • "${sess.notes}"`}
                    </p>
                  </div>
                </div>

                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {sess.activeDurationMinutes} mins
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
