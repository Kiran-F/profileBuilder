import React, { useState } from 'react';

export default function EditBioModal({ element, onSave, onClose }) {
  const initialText = element.data.bioLines ? element.data.bioLines.join('\n') : (element.data.bioText || '');
  const [bioText, setBioText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = bioText.split('\n').filter((l) => l.trim().length > 0);
    onSave(element.id, {
      ...element.data,
      bioLines: lines,
      bioText: bioText
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">description</span>
            <h2 className="text-lg font-bold text-slate-900">Edit Bio / Roles</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-200/50"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Roles & Description (One per line)
            </label>
            <textarea
              rows={6}
              required
              placeholder="e.g.&#10;CEO&#10;CTO&#10;Team Lead Developer&#10;Project Manager"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed resize-y font-medium"
            />
            <p className="text-xs text-slate-400 mt-1">
              Tip: Add titles or bio descriptions separated by line breaks.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 cursor-pointer text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
