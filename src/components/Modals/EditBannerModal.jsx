import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { FONT_FAMILIES } from '../../constants/fonts';
import { GRADIENT_PRESETS } from '../ProfileElements/BannerElement';
import { compressImage } from '../../utils/imageCompressor';

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

const GRADIENT_LIST = [
  { id: 'indigo-purple', name: 'Indigo Purple' },
  { id: 'emerald-teal', name: 'Emerald Teal' },
  { id: 'sunset-orange', name: 'Sunset Orange' },
  { id: 'midnight-dark', name: 'Midnight Dark' },
  { id: 'rose-pink', name: 'Rose Pink' },
  { id: 'gold-amber', name: 'Gold Amber' }
];

export default function EditBannerModal({ element, onSave, onClose }) {
  const [bannerType, setBannerType] = useState(element.data.bannerType || 'gradient');
  const [imageUrl, setImageUrl] = useState(element.data.imageUrl || '');
  const [gradientPreset, setGradientPreset] = useState(element.data.gradientPreset || 'indigo-purple');
  const [bgColor, setBgColor] = useState(element.data.bgColor || '#4648d4');
  const [bannerHeight, setBannerHeight] = useState(element.data.bannerHeight || 'medium');
  const [bannerRadius, setBannerRadius] = useState(element.data.bannerRadius || 'rounded-2xl');
  const [fullWidth, setFullWidth] = useState(element.data.fullWidth || false);
  const [title, setTitle] = useState(element.data.title !== undefined ? element.data.title : '');
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');
  const [textColor, setTextColor] = useState(element.data.textColor || '#ffffff');
  const [isBold, setIsBold] = useState(element.data.isBold !== undefined ? element.data.isBold : true);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 1600, 0.88);
      setImageUrl(compressed);
      setBannerType('image');
    } catch (err) {
      console.error('Banner image compression error:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      bannerType,
      imageUrl,
      gradientPreset,
      bgColor,
      bannerHeight,
      bannerRadius,
      fullWidth,
      title,
      fontSize,
      fontFamily,
      textColor,
      isBold,
      isItalic,
      hasOverlay: true
    });
  };

  const getPreviewTextStyle = () => {
    const selectedFont = FONT_FAMILIES.find((f) => f.id === fontFamily)?.family || 'inherit';
    return {
      fontFamily: selectedFont,
      color: textColor || '#ffffff',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal'
    };
  };

  const getPreviewBackgroundStyle = () => {
    if (bannerType === 'image' && imageUrl) {
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    if (GRADIENT_PRESETS[gradientPreset]) {
      return {
        background: GRADIENT_PRESETS[gradientPreset]
      };
    }

    return {
      backgroundColor: bgColor || '#4648d4'
    };
  };

  return (
    <BaseModal
      title="Edit Fixed Top Banner"
      subtitle="Customize top cover image, gradient colors, height & headline"
      icon="panorama"
      onClose={onClose}
      onSave={handleSubmit}
      saveButtonText="Save Top Banner"
      maxWidthClass="max-w-xl"
    >
          {/* Banner Mode Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setBannerType('gradient')}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${bannerType === 'gradient'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="material-symbols-outlined text-base">palette</span>
              Color / Gradient Theme
            </button>
            <button
              type="button"
              onClick={() => setBannerType('image')}
              className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${bannerType === 'image'
                  ? 'bg-white text-indigo-600 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <span className="material-symbols-outlined text-base">add_a_photo</span>
              Custom Upload Cover
            </button>
          </div>

          {/* Banner Background Settings */}
          {bannerType === 'gradient' ? (
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Gradient Themes
              </span>
              <div className="grid grid-cols-3 gap-2">
                {GRADIENT_LIST.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGradientPreset(g.id)}
                    style={{ background: GRADIENT_PRESETS[g.id] }}
                    className={`h-12 rounded-xl border flex items-end p-2 text-[10px] font-bold text-white transition-all cursor-pointer ${gradientPreset === g.id
                        ? 'ring-2 ring-indigo-600 ring-offset-2 scale-102'
                        : 'hover:scale-102 border-transparent'
                      }`}
                  >
                    <span className="truncate drop-shadow-sm">{g.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Banner Cover Image
              </span>

              {imageUrl ? (
                <div className="w-full h-28 rounded-xl overflow-hidden relative border border-slate-300 bg-slate-100 group">
                  <img src={imageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-opacity">
                    Change Cover Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
                  </label>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-white space-y-2">
                  <span className="material-symbols-outlined text-3xl text-slate-400">add_a_photo</span>
                  <p className="text-xs text-slate-500 font-medium">Upload a wide cover picture or header banner graphic</p>
                  <label className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors">
                    Upload Banner Image
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Banner Height & Corner Style Controls */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">straighten</span>
              Height & Corner Radius
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Height */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Banner Height
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'compact', label: 'Compact' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'tall', label: 'Tall' }
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setBannerHeight(h.id)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${bannerHeight === h.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Corner Radius
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'rounded-2xl', label: 'Curved' },
                    { id: 'rounded-none', label: 'Sharp' },
                    { id: 'rounded-3xl', label: 'Pill Curved' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setBannerRadius(r.id)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${bannerRadius === r.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Banner Container Width Options */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-2 bg-indigo-50/30">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">aspect_ratio</span>
              Banner Container Width
            </span>
            <p className="text-[11px] text-slate-500">
              Expand the banner across the full width of the screen or keep it inside the standard card layout:
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFullWidth(false)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${!fullWidth
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <span className="material-symbols-outlined text-base">fit_screen</span>
                Standard (Card Width)
              </button>

              <button
                type="button"
                onClick={() => setFullWidth(true)}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${fullWidth
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <span className="material-symbols-outlined text-base">fullscreen</span>
                Full Viewport Width
              </button>
            </div>
          </div>

          {/* Text Overlay & Typography Controls */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">title</span>
              Banner Headline Overlay (Optional)
            </span>

            {/* Title Text Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Welcome to my official profile! 🚀"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Font Family */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Text Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setTextColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-5 h-5 rounded-full border border-slate-300 transition-all cursor-pointer ${textColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                        }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Text Color">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Font Size & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsBold(!isBold)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${isBold
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    B (Bold)
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsItalic(!isItalic)}
                    className={`py-1.5 text-xs font-bold italic rounded-lg border transition-all cursor-pointer ${isItalic
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    I (Italic)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Live Banner Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/40 text-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-3">
              Live Top Banner Preview:
            </span>
            <div className="w-full flex justify-center">
              <div
                style={getPreviewBackgroundStyle()}
                className={`w-full max-w-md h-28 relative overflow-hidden flex items-end justify-center p-3.5 shadow-sm transition-all ${bannerRadius}`}
              >
                {title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                )}
                {title && (
                  <span className="relative z-10 text-center truncate text-xs sm:text-sm" style={getPreviewTextStyle()}>
                    {title}
                  </span>
                )}
              </div>
            </div>
          </div>

    </BaseModal>
  );
}
