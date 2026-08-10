import React from 'react';
import IdentityElement from '../ProfileElements/IdentityElement';
import BioElement from '../ProfileElements/BioElement';
import SocialElement from '../ProfileElements/SocialElement';
import CustomLinkElement from '../ProfileElements/CustomLinkElement';

export default function PreviewModal({ elements, onClose, onExport }) {
  const renderElementContent = (elem) => {
    switch (elem.type) {
      case 'identity':
        return <IdentityElement data={elem.data} />;
      case 'bio':
        return <BioElement data={elem.data} />;
      case 'social':
        return <SocialElement data={elem.data} />;
      case 'custom':
        return <CustomLinkElement data={elem.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-md my-8 flex flex-col items-center">
        {/* Top Control Action Floating Bar */}
        <div className="mb-4 flex items-center justify-between w-full max-w-xs bg-white/95 backdrop-blur-md p-2 rounded-full border border-slate-200 shadow-lg text-slate-900">
          <span className="text-xs font-semibold px-3 flex items-center gap-1.5 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Profile Preview
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={onExport}
              className="px-3 py-1.5 bg-primary hover:bg-indigo-700 text-white rounded-full text-xs font-semibold transition-all shadow-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Export
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
              title="Close Preview"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Mobile Phone Canvas Frame */}
        <div className="w-full max-w-sm bg-white rounded-[32px] border-8 border-slate-200 shadow-2xl overflow-hidden p-6 min-h-[580px] flex flex-col gap-5 relative">
          <div className="w-28 h-4 bg-slate-200 rounded-full mx-auto mb-2 opacity-80"></div>

          {elements.map((elem) => (
            <div key={elem.id} className="w-full">
              {renderElementContent(elem)}
            </div>
          ))}

          <div className="mt-auto pt-6 text-center border-t border-slate-100">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
              Powered by Profile Studio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
