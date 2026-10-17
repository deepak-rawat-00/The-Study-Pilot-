import React from 'react';
import { BarChart3, Flame, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AnalyticsPreviewSection: React.FC = () => {
  return (
    <section id="analytics-preview" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Real Progress Insights</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Habits built on real data, not vanity metrics
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Most productivity apps reward fake checkmarks. The Study Pilot calculates your streaks and heatmaps exclusively from verified focus timer sessions.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Configurable Daily Streak Threshold
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose 30, 45, 60, or 90 minutes of active focus per local day to earn your streak badge.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    52-Week Contribution Heatmap
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Light sessions still light up your calendar, so every minute you study is visibly acknowledged.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shrink-0 mt-0.5">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    7-Day &amp; 30-Day Consistency Ratios
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Track what percentage of days you met your minimum focus goal and maintain positive momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-lg">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                    <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Consistency Engine
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Sample student session data
                    </span>
                  </div>
                </div>
                <Badge variant="success">Threshold: 60m / Day</Badge>
              </div>

              {/* Weekly Duration Breakdown Bar Mockup */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Last 7 Days Focus Hours
                  </span>
                  <span>Total: 27.8 Hours</span>
                </div>

                <div className="grid grid-cols-7 gap-2 pt-2">
                  {[
                    { day: 'Mon', hrs: 4.2, qual: true },
                    { day: 'Tue', hrs: 3.8, qual: true },
                    { day: 'Wed', hrs: 5.1, qual: true },
                    { day: 'Thu', hrs: 2.0, qual: true },
                    { day: 'Fri', hrs: 4.5, qual: true },
                    { day: 'Sat', hrs: 5.4, qual: true },
                    { day: 'Sun', hrs: 2.8, qual: true },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="h-28 w-full rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-end p-1">
                        <div
                          className="w-full rounded-md bg-brand-600 dark:bg-brand-500 transition-all"
                          style={{ height: `${(d.hrs / 6.0) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 font-mono">
                        {d.hrs}h
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stat Highlights */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    30-Day Ratio
                  </span>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    93%
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    Active Streak
                  </span>
                  <p className="text-xl font-bold text-amber-500">
                    14 Days
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] font-medium text-slate-400 uppercase">
                    Avg Daily Time
                  </span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    3.9 hrs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
