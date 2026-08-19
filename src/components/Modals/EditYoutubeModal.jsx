import React, { useState } from 'react';
import { getYoutubeEmbedUrl } from '../ProfileElements/YoutubeElement';

const PRESET_COLORS = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#0f172a', name: 'Slate' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#06b6d4', name: 'Cyan' }
];

export function buildShadowStyle(size, color = '#0f172a') {
  if (size === 'none') return 'none';
  const c = color || '#0f172a';
  switch (size) {
    case 'small':
      return `0 6px 20px 2px ${c}66`;
    case 'large':
      return `0 20px 45px 6px ${c}b3`;
    case 'glow':
      return `0 0 32px 8px ${c}cc`;
    case 'medium':
    default:
      return `0 12px 30px 4px ${c}8c`;
  }
}

export default function EditYoutubeModal({ element, onSave, onClose }) {
  const [title, setTitle] = useState(element.data.title || '');
  const [videoUrl, setVideoUrl] = useState(element.data.videoUrl || '');
  const [borderWidth, setBorderWidth] = useState(element.data.borderWidth !== undefined ? element.data.borderWidth : 2);
  const [borderColor, setBorderColor] = useState(element.data.borderColor || '#ffffff');
  const [shadowSize, setShadowSize] = useState(element.data.shadowSize || 'medium');
  const [shadowColor, setShadowColor] = useState(element.data.shadowColor || '#0f172a');

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      title,
      videoUrl,
      borderWidth,
      borderColor,
      shadowSize,
      shadowColor
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-600 material-symbols-outlined text-xl">
              play_circle
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit YouTube Video & Frame Border
              </h3>
              <p className="text-xs text-slate-500">
                Customize video URL, frame border width, color & shadow
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
          {/* Video Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Video Heading Title (Optional)
            </legend>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Portfolio Showcase Video"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* YouTube Video URL */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              YouTube Video Link URL
            </legend>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>
          <p className="text-[10px] text-slate-400 px-1 -mt-2">
            Supports YouTube links e.g. <span className="font-mono text-indigo-600">youtube.com/watch?v=...</span> or <span className="font-mono text-indigo-600">youtu.be/...</span>
          </p>

          {/* Border Customization Controls */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">border_style</span>
              Video Frame Border Width & Color
            </span>

            {/* Border Width Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                <span>Border Width</span>
                <span className="font-mono text-indigo-600">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={borderWidth}
                onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Border Color Swatches + Custom Picker */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Border Color:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setBorderColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${
                      borderColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  ></button>
                ))}
                <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Border Color">
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Shadow Customization Controls */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">shadow</span>
              Video Frame Shadow Style & Color
            </span>

            {/* Shadow Intensity Selector */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { key: 'none', label: 'None' },
                { key: 'small', label: 'Soft' },
                { key: 'medium', label: 'Medium' },
                { key: 'large', label: 'Deep' },
                { key: 'glow', label: 'Glow' }
              ].map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setShadowSize(s.key)}
                  className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                    shadowSize === s.key
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Shadow Color Swatches */}
            {shadowSize !== 'none' && (
              <div className="pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setShadowColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${
                        shadowColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Shadow Color">
                    <input
                      type="color"
                      value={shadowColor}
                      onChange={(e) => setShadowColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Live Video Preview Box */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Live Video Frame Preview:
            </span>
            <div
              style={{
                backgroundColor: borderWidth > 0 ? borderColor : 'transparent',
                padding: `${borderWidth}px`,
                boxShadow: buildShadowStyle(shadowSize, shadowColor)
              }}
              className="w-full aspect-video rounded-2xl transition-all duration-300 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title="Live YouTube Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                    <span className="material-symbols-outlined text-3xl mb-1 text-slate-500">
                      movie
                    </span>
                    <span className="text-xs">Paste YouTube link to see video preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>

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
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
