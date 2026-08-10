import React from 'react';
import confetti from 'canvas-confetti';

export default function Header({
  onOpenPreview,
  onReset,
  onExport,
  elementsCount
}) {
  const handleExportClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onExport();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-xs">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center text-white shadow-md">
          <span className="material-symbols-outlined text-xl font-bold">badge</span>
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight flex items-center gap-2">
            ProfileStudio <span className="text-[10px] uppercase font-mono tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20">Builder</span>
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Drag & drop elements to craft your digital identity
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onReset}
          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5"
          title="Reset to default template"
        >
          <span className="material-symbols-outlined text-base">restart_alt</span>
          <span className="hidden md:inline">Reset</span>
        </button>

        <button
          onClick={handleExportClick}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-base text-primary">download</span>
          <span>Export</span>
        </button>

        <button
          onClick={onOpenPreview}
          className="px-4 py-1.5 rounded-lg bg-primary hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
          <span>Preview</span>
          {elementsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[11px] font-bold flex items-center justify-center ml-0.5">
              {elementsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
