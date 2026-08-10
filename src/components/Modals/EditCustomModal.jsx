import React, { useState } from 'react';

const ICON_OPTIONS = [
  { name: 'link', label: 'Link' },
  { name: 'work', label: 'Briefcase / Work' },
  { name: 'event', label: 'Calendar / Event' },
  { name: 'code', label: 'Code / Tech' },
  { name: 'star', label: 'Star / Feature' },
  { name: 'download', label: 'Download' },
  { name: 'launch', label: 'External Launch' },
  { name: 'shopping_bag', label: 'Store / Shop' }
];

export default function EditCustomModal({ element, onSave, onClose }) {
  const [title, setTitle] = useState(element.data.title || '');
  const [url, setUrl] = useState(element.data.url || '');
  const [buttonStyle, setButtonStyle] = useState(element.data.buttonStyle || 'primary');
  const [iconName, setIconName] = useState(element.data.iconName || 'link');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      title,
      url,
      buttonStyle,
      iconName
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">link</span>
            <h2 className="text-lg font-bold text-slate-900">Edit Custom CTA Link</h2>
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
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Button Title / Call to Action
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 🚀 Download My Resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Target URL
            </label>
            <input
              type="url"
              required
              placeholder="https://example.com/link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Button Style
              </label>
              <select
                value={buttonStyle}
                onChange={(e) => setButtonStyle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="primary">Solid Primary</option>
                <option value="gradient">Gradient Glow</option>
                <option value="secondary">Dark / Contrast</option>
                <option value="outline">Outline Border</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Icon
              </label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Save Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
