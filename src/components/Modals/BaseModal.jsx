import React from 'react';

export default function BaseModal({
  title,
  subtitle,
  icon = 'edit',
  iconBgColor = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  onClose,
  onSave,
  saveButtonText = 'Save Changes',
  saveButtonDisabled = false,
  maxWidthClass = 'max-w-lg',
  showFooter = true,
  children
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(e);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] lg:z-40 lg:left-auto lg:right-0 lg:top-14 lg:bottom-0 lg:w-[420px] xl:lg:w-[450px] lg:h-[calc(100vh-3.5rem)] flex items-center justify-center lg:block p-3 sm:p-6 lg:p-0 bg-slate-900/60 lg:bg-white backdrop-blur-xs lg:backdrop-blur-none lg:border-l lg:border-slate-200 lg:shadow-xl overflow-y-auto lg:overflow-hidden animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl sm:rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none border border-slate-100 lg:border-none w-full ${maxWidthClass} lg:max-w-none lg:w-full lg:h-full overflow-hidden flex flex-col max-h-[92vh] lg:max-h-none my-auto lg:my-0`}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && (
              <span className={`p-2 rounded-xl ${iconBgColor} ${iconColor} material-symbols-outlined text-xl flex-shrink-0`}>
                {icon}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0 ml-2"
            title="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Form & Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between">
          <div className="space-y-4 sm:space-y-5 flex-1">
            {children}
          </div>

          {/* Modal Footer Controls */}
          {showFooter && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveButtonDisabled}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">check</span>
                {saveButtonText}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
