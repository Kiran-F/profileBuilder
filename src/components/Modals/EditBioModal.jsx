import React, { useState } from 'react';

const FONT_FAMILIES = [
  { id: 'Inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'Bebas Neue', name: 'Bebas Neue', family: "'Bebas Neue', cursive" },
  { id: 'Roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'sans-serif', name: 'sans-serif (System Default)', family: 'sans-serif' },
  { id: 'Open Sans', name: 'Open Sans', family: "'Open Sans', sans-serif" },
  { id: 'Lato', name: 'Lato', family: "'Lato', sans-serif" },
  { id: 'Sekuya', name: 'Sekuya', family: "'Sekuya', 'Cinzel', serif" },
  { id: 'Roboto Mono', name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
  { id: 'Arimo', name: 'Arimo', family: "'Arimo', sans-serif" },
  { id: 'Montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'Bitcount Prop Single', name: 'Bitcount Prop Single', family: "'Bitcount Prop Single', 'Pixelify Sans', 'Silkscreen', cursive" },
  { id: 'Rubik Spray Paint', name: 'Rubik Spray Paint', family: "'Rubik Spray Paint', cursive" },
  { id: 'Merriweather', name: 'Merriweather', family: "'Merriweather', serif" },
  { id: 'Oswald', name: 'Oswald', family: "'Oswald', sans-serif" },
  { id: 'Edu VIC WA NT Hand Precursive', name: 'Edu VIC WA NT Hand Precursive', family: "'Edu VIC WA NT Hand Precursive', cursive" },
  { id: 'Inconsolata', name: 'Inconsolata', family: "'Inconsolata', monospace" },
  { id: 'JetBrains Mono', name: 'JetBrains Mono', family: "'JetBrains Mono', monospace" },
  { id: 'Dancing Script', name: 'Dancing Script', family: "'Dancing Script', cursive" },
  { id: 'Caveat', name: 'Caveat', family: "'Caveat', cursive" },
  { id: 'Archivo Black', name: 'Archivo Black', family: "'Archivo Black', sans-serif" },
  { id: 'Black Ops One', name: 'Black Ops One', family: "'Black Ops One', display" },
  { id: 'Saira', name: 'Saira', family: "'Saira', sans-serif" },
  { id: 'Changa One', name: 'Changa One', family: "'Changa One', display" },
  { id: 'Orbitron', name: 'Orbitron', family: "'Orbitron', sans-serif" },
  { id: 'Indie Flower', name: 'Indie Flower', family: "'Indie Flower', cursive" }
];

const PRESET_COLORS = [
  { hex: '', name: 'Canvas Default' },
  { hex: '#0f172a', name: 'Slate' },
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#ffffff', name: 'White' }
];

export default function EditBioModal({ element, onSave, onClose }) {
  const initialText = element.data.bioLines ? element.data.bioLines.join('\n') : (element.data.bioText || '');

  const [bioText, setBioText] = useState(initialText);
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontColor, setFontColor] = useState(element.data.fontColor || '');
  const [isBold, setIsBold] = useState(element.data.isBold || false);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);
  const [isUnderline, setIsUnderline] = useState(element.data.isUnderline || false);
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = bioText.split('\n').filter((l) => l.trim().length > 0);
    onSave(element.id, {
      ...element.data,
      bioLines: lines,
      bioText: bioText,
      fontSize,
      fontColor,
      isBold,
      isItalic,
      isUnderline,
      fontFamily
    });
  };

  const getPreviewStyle = () => {
    const selectedFont = FONT_FAMILIES.find((f) => f.id === fontFamily)?.family || 'inherit';
    return {
      fontFamily: selectedFont,
      color: fontColor || 'inherit',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none'
    };
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-base';
      case 'xlarge':
        return 'text-lg';
      case 'medium':
      default:
        return 'text-sm';
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-2xl p-2 bg-indigo-50 rounded-xl">description</span>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Edit Bio & Formatting</h2>
              <p className="text-xs text-slate-500">Customize bio text, fonts, colors & styling</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Text Area */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Bio / Roles Text (One per line)
            </label>
            <textarea
              rows={4}
              required
              placeholder="e.g.&#10;Software Engineer & Tech Lead&#10;Building scalable web applications&#10;Open source enthusiast"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y font-medium"
            />
          </div>

          {/* Typography Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
              Typography & Font Style
            </span>

            {/* Font Family Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size & Font Style Toggles Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Font Size */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Font Size
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'small', label: 'S' },
                    { id: 'medium', label: 'M' },
                    { id: 'large', label: 'L' },
                    { id: 'xlarge', label: 'XL' }
                  ].map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setFontSize(size.id)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        fontSize === size.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Style Toggles: Bold, Italic, Underline */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Font Style
                </label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setIsBold(!isBold)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isBold
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Bold"
                  >
                    B
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsItalic(!isItalic)}
                    className={`py-1.5 text-xs font-bold italic rounded-lg border transition-all cursor-pointer ${
                      isItalic
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Italic"
                  >
                    I
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`py-1.5 text-xs font-bold underline rounded-lg border transition-all cursor-pointer ${
                      isUnderline
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Underline"
                  >
                    U
                  </button>
                </div>
              </div>
            </div>

            {/* Font Color Swatches */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Font Color
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFontColor(c.hex)}
                    style={{ backgroundColor: c.hex || '#94a3b8' }}
                    className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer flex items-center justify-center ${
                      fontColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    {!c.hex && <span className="material-symbols-outlined text-xs text-white">do_not_disturb_alt</span>}
                  </button>
                ))}

                <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Font Color">
                  <input
                    type="color"
                    value={fontColor || '#000000'}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Real-time Live Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-3.5 bg-indigo-50/40">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
              Live Preview:
            </span>
            <div
              style={getPreviewStyle()}
              className={`text-center transition-all ${getFontSizeClass()}`}
            >
              {bioText ? (
                bioText.split('\n').filter(Boolean).map((line, idx) => (
                  <p key={idx} className="leading-normal">{line}</p>
                ))
              ) : (
                <p className="text-slate-400 italic text-xs">Bio text preview will appear here...</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 cursor-pointer text-white text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">check</span>
              Save Bio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
