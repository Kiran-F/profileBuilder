import React, { useState } from 'react';

export default function EditTextModal({ element, onSave, onClose }) {
  const [heading, setHeading] = useState(element.data.heading || '');
  const [content, setContent] = useState(element.data.content || '');
  const [alignment, setAlignment] = useState(element.data.alignment || 'center');
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      heading,
      content,
      alignment,
      fontSize
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              text_fields
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Text Block
              </h3>
              <p className="text-xs text-slate-500">
                Add custom heading and paragraph text
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Heading */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Heading Title (Optional)
            </legend>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="e.g. About My Journey"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Content Textarea */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Text Content
            </legend>
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write anything you want here... Share your thoughts, notes, or story."
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none resize-none"
            ></textarea>
          </fieldset>

          {/* Controls Grid: Alignment & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Text Alignment */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Text Alignment
              </span>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { key: 'left', icon: 'format_align_left', label: 'Left' },
                  { key: 'center', icon: 'format_align_center', label: 'Center' },
                  { key: 'right', icon: 'format_align_right', label: 'Right' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setAlignment(item.key)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      alignment === item.key
                        ? 'bg-white text-indigo-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Font Size
              </span>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {[
                  { key: 'small', label: 'Small' },
                  { key: 'medium', label: 'Medium' },
                  { key: 'large', label: 'Large' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFontSize(item.key)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      fontSize === item.key
                        ? 'bg-white text-indigo-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Save Text
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
