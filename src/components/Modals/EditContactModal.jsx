import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { FONT_FAMILIES } from '../../constants/fonts';

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

export default function EditContactModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle || 'Contact Information');
  const [email, setEmail] = useState(element.data.email || '');
  const [phone, setPhone] = useState(element.data.phone || '');
  const [website, setWebsite] = useState(element.data.website || '');
  const [location, setLocation] = useState(element.data.location || '');

  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontColor, setFontColor] = useState(element.data.fontColor || '');
  const [isBold, setIsBold] = useState(element.data.isBold || false);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);
  const [isUnderline, setIsUnderline] = useState(element.data.isUnderline || false);
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      sectionTitle,
      email,
      phone,
      website,
      location,
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
    <BaseModal
      title="Edit Contact & Typography"
      subtitle="Update contact details & text font styling"
      icon="contacts"
      onClose={onClose}
      onSave={handleSubmit}
      saveButtonText="Save Contact Info"
    >
          {/* Section Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Title (Optional)
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Contact Information"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Email Address */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-indigo-500">mail</span>
              Email Address
            </legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Contact / WhatsApp Phone */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-emerald-500">call</span>
              Phone / WhatsApp Number
            </legend>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Portfolio Website Link */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-blue-500">language</span>
              Portfolio Website Link
            </legend>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://alex-portfolio.com"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Location */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
              Location / City & Country
            </legend>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="San Francisco, CA, USA"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Typography Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
              Contact Text Typography Controls
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
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${fontSize === size.id
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
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${isBold
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
                    className={`py-1.5 text-xs font-bold italic rounded-lg border transition-all cursor-pointer ${isItalic
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
                    className={`py-1.5 text-xs font-bold underline rounded-lg border transition-all cursor-pointer ${isUnderline
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
                    className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer flex items-center justify-center ${fontColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
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

          {/* Real-time Live Contact Text Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-3.5 bg-indigo-50/40">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-2">
              Live Contact Text Preview (Icons Unchanged):
            </span>
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-center" style={getPreviewStyle()}>
                {sectionTitle || 'Contact Information'}
              </h4>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-base">mail</span>
                </div>
                <div className="flex flex-col min-w-0" style={getPreviewStyle()}>
                  <span className="text-[9px] uppercase opacity-60">Email</span>
                  <span className={`truncate ${getFontSizeClass()}`}>
                    {email || 'alex@example.com'}
                  </span>
                </div>
              </div>
            </div>
          </div>

    </BaseModal>
  );
}
