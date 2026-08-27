import React, { useState } from 'react';
import BaseModal from './BaseModal';

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
  { hex: '#0f172a', name: 'Slate Dark' },
  { hex: '#ffffff', name: 'Pure White' },
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#22c55e', name: 'Emerald' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#000000', name: 'Black' }
];

export default function EditGalleryModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle !== undefined ? element.data.sectionTitle : '');
  const [layoutStyle, setLayoutStyle] = useState(element.data.layoutStyle || 'grid');
  const [gridCols, setGridCols] = useState(element.data.gridCols || 2);
  const [imageAspect, setImageAspect] = useState(element.data.imageAspect || 'landscape');
  const [imageRadius, setImageRadius] = useState(element.data.imageRadius || 'rounded-2xl');
  const [hasShadow, setHasShadow] = useState(element.data.hasShadow !== undefined ? element.data.hasShadow : true);
  const [shadowColor, setShadowColor] = useState(element.data.shadowColor || '#000000');
  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');
  const [fontColor, setFontColor] = useState(element.data.fontColor || '#0f172a');
  const [isBold, setIsBold] = useState(element.data.isBold !== undefined ? element.data.isBold : true);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);

  const [items, setItems] = useState(element.data.items || []);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handlePreviewPrev = () => {
    setPreviewIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handlePreviewNext = () => {
    setPreviewIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleAddImageItem = () => {
    const newItem = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      image: '',
      title: '',
      linkUrl: ''
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size is too large! Please choose an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      handleUpdateItem(id, 'image', event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      sectionTitle,
      layoutStyle,
      gridCols,
      imageAspect,
      imageRadius,
      hasShadow,
      shadowColor,
      fontSize,
      fontFamily,
      fontColor,
      isBold,
      isItalic,
      items
    });
  };

  const getPreviewTextStyle = () => {
    const selectedFont = FONT_FAMILIES.find((f) => f.id === fontFamily)?.family || 'inherit';
    return {
      fontFamily: selectedFont,
      color: fontColor || '#0f172a',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal'
    };
  };

  const getPreviewAspectClass = () => {
    switch (imageAspect) {
      case 'square':
        return 'aspect-square object-cover';
      case 'portrait':
        return 'aspect-[3/4] object-cover object-top';
      case 'natural':
        return 'h-32 object-contain';
      case 'landscape':
      default:
        return 'aspect-[16/9] object-cover';
    }
  };

  const getPreviewCardWidthClass = () => {
    switch (imageAspect) {
      case 'portrait':
        return 'w-44 sm:w-48 mx-auto';
      case 'square':
        return 'w-48 sm:w-52 mx-auto';
      case 'landscape':
      default:
        return 'w-full max-w-xs mx-auto';
    }
  };

  return (
    <BaseModal
      title="Edit Gallery & Certificates"
      subtitle="Upload images, certificates, layout styles & optional labels"
      icon="photo_library"
      onClose={onClose}
      onSave={handleSubmit}
      saveButtonText="Save Gallery Elements"
      maxWidthClass="max-w-xl"
    >
          {/* Section Heading Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Title (Optional)
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. My Certificates / Event Gallery"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Layout & Aspect Ratio Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">view_quilt</span>
              Layout & Image Shape Controls
            </span>

            {/* Layout Style */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Layout Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'grid', label: 'Grid Layout', desc: 'Custom 1-4 columns' },
                  { id: 'scroll', label: 'Scroll Carousel', desc: 'Horizontal swipe' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setLayoutStyle(st.id)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                      (layoutStyle === st.id || (st.id === 'grid' && layoutStyle === 'stacked'))
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Columns Option (Visible when layoutStyle === 'grid' or 'stacked') */}
            {(layoutStyle === 'grid' || layoutStyle === 'stacked') && (
              <div className="animate-fadeIn">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Grid Columns Count
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { cols: 1, label: '1 Col' },
                    { cols: 2, label: '2 Cols' },
                    { cols: 3, label: '3 Cols' },
                    { cols: 4, label: '4 Cols' }
                  ].map((c) => (
                    <button
                      key={c.cols}
                      type="button"
                      onClick={() => {
                        setLayoutStyle('grid');
                        setGridCols(c.cols);
                      }}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer text-center ${
                        gridCols === c.cols
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Image Aspect Ratio & Corner Radius */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Aspect Ratio */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'landscape', label: 'Landscape (4:3)' },
                    { id: 'square', label: 'Square (1:1)' },
                    { id: 'portrait', label: 'Portrait (3:4)' }
                  ].map((asp) => (
                    <button
                      key={asp.id}
                      type="button"
                      onClick={() => setImageAspect(asp.id)}
                      className={`py-1.5 text-[10px] sm:text-xs font-bold rounded-lg border transition-all cursor-pointer ${imageAspect === asp.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {asp.label.split(' ')[0]}
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
                    { id: 'rounded-3xl', label: 'Extra Rounded' }
                  ].map((rad) => (
                    <button
                      key={rad.id}
                      type="button"
                      onClick={() => setImageRadius(rad.id)}
                      className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${imageRadius === rad.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      {rad.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Typography Controls Panel */}
          <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
              Image Label Typography
            </span>

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

              {/* Label Text Color */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Label Text Color
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setFontColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-5 h-5 rounded-full border border-slate-300 transition-all cursor-pointer ${fontColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                        }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Text Color">
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
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

          {/* Real-time Live Gallery Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/40 text-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-3">
              Live Gallery & Certificate Preview:
            </span>
            <div className="w-full flex justify-center items-center gap-2">
              {items.length > 0 ? (
                <>
                  {layoutStyle === 'scroll' && items.length > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviewPrev}
                      className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-700 hover:text-indigo-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                      title="Previous"
                    >
                      <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                  )}
                  <div className={`bg-white border border-slate-200 overflow-hidden shadow-md ${getPreviewCardWidthClass()} ${imageRadius}`}>
                    {(items[previewIndex] || items[0])?.image ? (
                      <img
                        src={(items[previewIndex] || items[0]).image}
                        alt="Preview"
                        className={`w-full ${getPreviewAspectClass()}`}
                      />
                    ) : (
                      <div className={`w-full bg-slate-100 flex items-center justify-center text-slate-300 ${getPreviewAspectClass()}`}>
                        <span className="material-symbols-outlined text-3xl">image</span>
                      </div>
                    )}
                    {(items[previewIndex] || items[0])?.title && (
                      <div className="p-2.5 text-center bg-white">
                        <span className="text-xs truncate block" style={getPreviewTextStyle()}>
                          {(items[previewIndex] || items[0]).title}
                        </span>
                      </div>
                    )}
                  </div>
                  {layoutStyle === 'scroll' && items.length > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviewNext}
                      className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-700 hover:text-indigo-600 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                      title="Next"
                    >
                      <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                  )}
                </>
              ) : (
                <p className="text-xs text-slate-400 italic py-2">
                  Click "+ Upload Image / Certificate" below to preview your gallery!
                </p>
              )}
            </div>
          </div>

          {/* Images List Header & Add Button */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Gallery Items ({items.length})
            </span>
            <button
              type="button"
              onClick={handleAddImageItem}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add_photo_alternate</span>
              Upload Image / Certificate
            </button>
          </div>

          {/* Items List */}
          {items.length === 0 ? (
            <div className="py-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">
                photo_library
              </span>
              <p className="text-xs text-slate-500 font-medium">No images or certificates added yet.</p>
              <button
                type="button"
                onClick={handleAddImageItem}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                + Add your first image / certificate
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 border border-slate-200 rounded-2xl bg-slate-50/40 relative space-y-3"
                >
                  {/* Delete Item Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    {/* Image Preview & Upload Button */}
                    <div className="sm:col-span-4 flex flex-col items-center gap-2">
                      <div className="w-24 h-20 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center relative group">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt="Uploaded preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-slate-400 text-2xl">
                            add_a_photo
                          </span>
                        )}
                        <label className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-semibold cursor-pointer transition-opacity">
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(item.id, e)}
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <label className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer">
                        {item.image ? 'Replace Image' : 'Choose File'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(item.id, e)}
                          className="sr-only"
                        />
                      </label>
                    </div>

                    {/* Image URL & Labels */}
                    <div className="sm:col-span-8 space-y-2 pr-6">
                      {/* Title Label (Optional) */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Heading / Label (Optional)
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                          placeholder="e.g. AWS Certified Developer"
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      {/* Image URL fallback / Link URL */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                          Link Target URL (Optional)
                        </label>
                        <input
                          type="url"
                          value={item.linkUrl || ''}
                          onChange={(e) => handleUpdateItem(item.id, 'linkUrl', e.target.value)}
                          placeholder="https://verify.credential.com/..."
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

    </BaseModal>
  );
}
