import React, { useEffect } from 'react';
import { ResourceItem } from '../types';
import { Printer, Download, X, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useRouter } from '../../context/RouterContext';

export interface PrintableSheetModalProps {
  resource: ResourceItem;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableSheetModal: React.FC<PrintableSheetModalProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  const { navigate } = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    // Generate clean self-contained HTML page for saving
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${resource.title} – The Study Pilot</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #ffffff; color: #0f172a; margin: 0; padding: 24px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div style="max-width: 900px; margin: 0 auto;">
    <h2>${resource.title}</h2>
    <p>Free printable study resource from The Study Pilot (https://thestudypilot.space/resources)</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #cbd5e1;" />
    <p>To print, press Ctrl+P (or Cmd+P on Mac).</p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.slug}-study-pilot.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-slate-200 dark:border-slate-800 print:border-none print:shadow-none print:max-h-none print:overflow-visible">
        
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">{resource.format}</Badge>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Recommended: {resource.recommendedPaper} ({resource.paperOrientation})
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {resource.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadHtml}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Save HTML
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
              className="font-semibold shadow-xs"
            >
              Print / Save PDF
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Printable Canvas Preview & Instructions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/60 space-y-8 print:p-0 print:bg-white print:overflow-visible">
          
          {/* Printable Sheet Viewport */}
          <div className="shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none">
            {resource.renderPrintable()}
          </div>

          {/* Educational Instructions Section (Hidden during Print) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 print:hidden">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                How to Use This Resource Effectively
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Follow these three simple steps to integrate this physical sheet into your daily study routine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resource.howToUseSteps.map((step) => (
                <div key={step.stepNumber} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center mb-2">
                    {step.stepNumber}
                  </div>
                  <h5 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Proven Academic Benefits
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                {resource.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Tools & Guides */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Companion Interactive Tool: </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate(`/tools/${resource.pairedToolSlug}`);
                  }}
                  className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  {resource.pairedToolName} &rarr;
                </button>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>In-Depth Strategy Guide: </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate(`/blog/${resource.pairedArticleSlug}`);
                  }}
                  className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  {resource.pairedArticleTitle} &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Print Reminder (Hidden in Print) */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 print:hidden">
          <span>Printing Tip: In your browser print dialog, select <strong>&quot;Fit to Printable Area&quot;</strong> and enable <strong>&quot;Background Graphics&quot;</strong>.</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintableSheetModal;
