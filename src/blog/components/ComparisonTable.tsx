import React from 'react';
import { cn } from '../../utils/cn';

export interface ComparisonTableColumn {
  key: string;
  header: string;
  width?: string;
}

export interface ComparisonTableProps {
  caption?: string;
  columns: ComparisonTableColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  className?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  caption,
  columns,
  rows,
  className,
}) => {
  return (
    <div className={cn('my-6 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          {caption && (
            <caption className="p-3 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 text-left border-b border-slate-200/80 dark:border-slate-800">
              {caption}
            </caption>
          )}
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-slate-800 font-bold">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('py-3 px-4', col.width)}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/20' : 'bg-transparent'}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 align-top leading-relaxed">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
