import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percent = Math.min(100, Math.max(0, (currentProgress / scrollHeight) * 100));
        setCompletion(percent);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-brand-600 via-indigo-500 to-brand-400 transition-all duration-75 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};
