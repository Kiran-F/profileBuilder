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

export default function EditBadgesModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle || 'Badges & Credentials');
  const [items, setItems] = useState(element.data.items || []);
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontColor, setFontColor] = useState(element.data.fontColor || '');
  const [isBold, setIsBold] = useState(element.data.isBold || false);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);
  const [isUnderline, setIsUnderline] = useState(element.data.isUnderline || false);
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');

  const handleAddBadge = () => {
    const newBadge = {
      id: `badge-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: '',
      imageUrl: '',
      linkUrl: ''
    };
    setItems((prev) => [...prev, newBadge]);
  };

  const handleRemoveBadge = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64String = uploadEvent.target.result;
      handleUpdateItem(id, 'imageUrl', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      sectionTitle,
      items,
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
      fontWeight: isBold ? '700' : '600',
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              workspace_premium
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Badges & Credentials
              </h3>
              <p className="text-xs text-slate-500">
                Upload badge images, links & customize typography
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
          {/* Section Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Heading Title
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Badges & Credentials"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Typography Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
              Badges Text & Font Styling
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

          {/* Real-time Live Badge Text Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-3.5 bg-indigo-50/40 text-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
              Live Badge Text Preview:
            </span>
            <div style={getPreviewStyle()} className={`transition-all ${getFontSizeClass()}`}>
              <h4 className="font-bold tracking-wider uppercase mb-1">{sectionTitle || 'Badges & Credentials'}</h4>
              <p className="text-xs opacity-90">Sample Certified Badge Title</p>
            </div>
          </div>

          {/* Badges List Header */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Uploaded Badges ({items.length})
            </span>
            <button
              type="button"
              onClick={handleAddBadge}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Badge
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">
                workspace_premium
              </span>
              <p className="text-xs text-slate-500 font-medium">No badges added yet.</p>
              <button
                type="button"
                onClick={handleAddBadge}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                + Add your first square badge
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3.5 border border-slate-200 rounded-2xl bg-slate-50/40 relative space-y-3"
                >
                  {/* Delete Badge Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveBadge(badge.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Badge"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>

                  <div className="flex items-start gap-3.5">
                    {/* Square Image Upload Box with Edit Badge Icon */}
                    <div className="flex flex-col items-center gap-1.5">
                      <label className="w-18 h-18 rounded-2xl bg-white border-2 border-indigo-100 hover:border-indigo-400 shadow-2xs overflow-hidden flex flex-col items-center justify-center relative cursor-pointer group transition-all">
                        {badge.imageUrl ? (
                          <>
                            <img
                              src={badge.imageUrl}
                              alt="Badge"
                              className="w-full h-full object-contain p-1"
                            />
                            <div className="absolute bottom-1 right-1 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                              <span className="material-symbols-outlined text-[11px]">edit</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-2 text-indigo-600">
                            <span className="material-symbols-outlined text-2xl mb-0.5">
                              add_photo_alternate
                            </span>
                            <span className="text-[9px] font-bold">Upload</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(badge.id, e)}
                          className="hidden"
                        />
                      </label>
                      <label className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">upload</span>
                        {badge.imageUrl ? 'Change Image' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(badge.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Badge Title & Link inputs */}
                    <div className="flex-1 space-y-2.5 pr-6">
                      <fieldset className="border border-slate-200 rounded-lg px-3 pt-1 pb-1.5 bg-white hover:border-indigo-300 focus-within:border-indigo-500">
                        <legend className="text-[10px] font-semibold text-slate-400 px-1 bg-white">
                          Badge Title / Name
                        </legend>
                        <input
                          type="text"
                          value={badge.title}
                          onChange={(e) => handleUpdateItem(badge.id, 'title', e.target.value)}
                          placeholder="e.g. Certified Developer"
                          className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </fieldset>

                      <fieldset className="border border-slate-200 rounded-lg px-3 pt-1 pb-1.5 bg-white hover:border-indigo-300 focus-within:border-indigo-500">
                        <legend className="text-[10px] font-semibold text-slate-400 px-1 bg-white">
                          Verification Link URL (Optional)
                        </legend>
                        <input
                          type="url"
                          value={badge.linkUrl}
                          onChange={(e) => handleUpdateItem(badge.id, 'linkUrl', e.target.value)}
                          placeholder="https://credential.com/verify/123"
                          className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </fieldset>
                    </div>
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
              Save Badges
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
