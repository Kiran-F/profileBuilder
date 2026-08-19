import React, { useState } from 'react';
import { LINK_ICONS } from '../ProfileElements/LinksElement';

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
  { hex: '#ffffff', name: 'Pure White' },
  { hex: '#0f172a', name: 'Slate Dark' },
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#22c55e', name: 'Emerald' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#000000', name: 'Black' }
];

const ICON_OPTIONS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'medium', label: 'Medium' },
  { id: 'language', label: 'Website' },
  { id: 'link', label: 'Link' },
  { id: 'article', label: 'Article' },
  { id: 'star', label: 'Star' },
  { id: 'bolt', label: 'Bolt' },
  { id: 'shopping_bag', label: 'Store' },
  { id: 'play_circle', label: 'Video' },
  { id: 'description', label: 'Document' },
  { id: 'mail', label: 'Mail' },
  { id: 'call', label: 'Phone' },
  { id: 'x', label: 'X / Twitter' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'github', label: 'GitHub' },
  { id: 'discord', label: 'Discord' }
];

export default function EditLinksModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle !== undefined ? element.data.sectionTitle : '');
  const [buttonShape, setButtonShape] = useState(element.data.buttonShape || 'rounded-full');
  const [buttonBgColor, setButtonBgColor] = useState(element.data.buttonBgColor || '#ffffff');
  const [buttonTextColor, setButtonTextColor] = useState(element.data.buttonTextColor || '#0f172a');
  const [buttonBorderColor, setButtonBorderColor] = useState(element.data.buttonBorderColor || '#000000');
  const [borderWidth, setBorderWidth] = useState(element.data.borderWidth !== undefined ? element.data.borderWidth : 2);
  const [hasShadow, setHasShadow] = useState(element.data.hasShadow !== undefined ? element.data.hasShadow : true);
  const [shadowColor, setShadowColor] = useState(element.data.shadowColor || '#000000');
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');
  const [isBold, setIsBold] = useState(element.data.isBold !== undefined ? element.data.isBold : true);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);

  const [items, setItems] = useState(element.data.items || []);

  const handleAddLink = () => {
    const newLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: '',
      url: '',
      icon: 'link'
    };
    setItems((prev) => [...prev, newLink]);
  };

  const handleRemoveLink = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      sectionTitle,
      buttonShape,
      buttonBgColor,
      buttonTextColor,
      buttonBorderColor,
      borderWidth,
      hasShadow,
      shadowColor,
      fontSize,
      fontFamily,
      isBold,
      isItalic,
      items
    });
  };

  const getPreviewTextStyle = () => {
    const selectedFont = FONT_FAMILIES.find((f) => f.id === fontFamily)?.family || 'inherit';
    return {
      fontFamily: selectedFont,
      color: buttonTextColor || '#0f172a',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal'
    };
  };

  const getPreviewButtonStyle = () => {
    const shadowStyle = hasShadow
      ? `0px 4px 0px ${shadowColor || '#000000'}`
      : 'none';

    return {
      backgroundColor: buttonBgColor || '#ffffff',
      borderColor: buttonBorderColor || '#000000',
      borderWidth: `${borderWidth}px`,
      boxShadow: shadowStyle
    };
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              add_link
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Featured Link Buttons
              </h3>
              <p className="text-xs text-slate-500">
                Customize link buttons, shapes, background & text colors
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Section Heading Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Title (Optional)
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Featured Links"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Button Shape & Color Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">shape_line</span>
              Link Button Shape & Colors
            </span>

            {/* Shape Selector: Rounded (Pill), Curved, Sharp */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Button Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rounded-full', label: 'Rounded (Pill)', desc: 'Full Pill Shape' },
                  { id: 'rounded-2xl', label: 'Curved Corners', desc: 'Rounded Rectangle' },
                  { id: 'rounded-none', label: 'Sharp Corners', desc: 'Square Rectangle' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setButtonShape(s.id)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                      buttonShape === s.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color & Text Color Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Background Color */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Button Background</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setButtonBgColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${
                        buttonBgColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Background Color">
                    <input
                      type="color"
                      value={buttonBgColor}
                      onChange={(e) => setButtonBgColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Text Color */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Button Text Color</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setButtonTextColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${
                        buttonTextColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Text Color">
                    <input
                      type="color"
                      value={buttonTextColor}
                      onChange={(e) => setButtonTextColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Border Width & Color + Offset 3D Shadow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 border-t border-slate-200/60">
              {/* Border Width & Color */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Border Width</span>
                  <span className="font-mono text-indigo-600">{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-semibold text-slate-500">Border Color:</span>
                  <input
                    type="color"
                    value={buttonBorderColor}
                    onChange={(e) => setButtonBorderColor(e.target.value)}
                    className="w-6 h-6 rounded-md cursor-pointer border border-slate-300 bg-transparent p-0"
                  />
                  <span className="text-[11px] font-mono font-bold text-slate-700 uppercase">{buttonBorderColor}</span>
                </div>
              </div>

              {/* Offset 3D Shadow Toggle & Color */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-600">3D Offset Drop Shadow</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasShadow}
                      onChange={(e) => setHasShadow(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                {hasShadow && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-semibold text-slate-500">Shadow Color:</span>
                    <input
                      type="color"
                      value={shadowColor}
                      onChange={(e) => setShadowColor(e.target.value)}
                      className="w-6 h-6 rounded-md cursor-pointer border border-slate-300 bg-transparent p-0"
                    />
                    <span className="text-[11px] font-mono font-bold text-slate-700 uppercase">{shadowColor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Typography Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
              Link Text & Font Styling
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

            {/* Font Size & Font Style Toggles */}
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

              {/* Font Style Toggles: Bold, Italic */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-1.5">
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
                    B (Bold)
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
                    I (Italic)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Live Link Button Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/40 text-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-3">
              Live Link Button Preview:
            </span>
            <div className="w-full flex justify-center">
              {items.length > 0 ? (
                <div
                  style={getPreviewButtonStyle()}
                  className={`w-full max-w-md py-3.5 px-5 flex items-center justify-between transition-all ${buttonShape}`}
                >
                  <div className="flex items-center justify-center w-6" style={{ color: buttonTextColor || '#0f172a' }}>
                    {LINK_ICONS[items[0]?.icon || 'link']}
                  </div>
                  <span className="flex-1 text-center px-3 truncate text-sm" style={getPreviewTextStyle()}>
                    {items[0]?.title || 'Link Title Preview'}
                  </span>
                  <div className="w-6 opacity-0" aria-hidden="true" />
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-2">
                  Click "+ Add Link" below to add custom link buttons!
                </p>
              )}
            </div>
          </div>

          {/* Links List Header & Items */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Link Items ({items.length})
            </span>
            <button
              type="button"
              onClick={handleAddLink}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Link
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">
                link
              </span>
              <p className="text-xs text-slate-500 font-medium">No link buttons added yet.</p>
              <button
                type="button"
                onClick={handleAddLink}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                + Add your first link button
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 border border-slate-200 rounded-2xl bg-slate-50/40 relative space-y-3"
                >
                  {/* Delete Link Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(item.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Link"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pr-6 items-center">
                    {/* Icon Selector */}
                    <div className="sm:col-span-4">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                        Icon
                      </label>
                      <select
                        value={item.icon || 'link'}
                        onChange={(e) => handleUpdateItem(item.id, 'icon', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        {ICON_OPTIONS.map((ico) => (
                          <option key={ico.id} value={ico.id}>
                            {ico.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Title */}
                    <div className="sm:col-span-8">
                      <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                        Button Title Label
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                        placeholder="e.g. Join our WhatsApp Channel"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* URL */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Link Target URL
                    </label>
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => handleUpdateItem(item.id, 'url', e.target.value)}
                      placeholder="https://example.com/..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">check</span>
              Save Link Buttons
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
