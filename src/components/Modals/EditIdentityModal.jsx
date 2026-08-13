import React, { useState } from 'react';
import AvatarCropModal from './AvatarCropModal';

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

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=400'
];

export default function EditIdentityModal({ element, onSave, onClose }) {
  const [firstName, setFirstName] = useState(element.data.firstName || '');
  const [lastName, setLastName] = useState(element.data.lastName || '');
  const [name, setName] = useState(element.data.name || '');
  const [jobTitle, setJobTitle] = useState(element.data.jobTitle || '');
  const [designation, setDesignation] = useState(element.data.designation || '');
  const [department, setDepartment] = useState(element.data.department || '');
  const [companyName, setCompanyName] = useState(element.data.companyName || '');

  const [fontSize, setFontSize] = useState(element.data.fontSize || 'medium');
  const [fontColor, setFontColor] = useState(element.data.fontColor || '');
  const [isBold, setIsBold] = useState(element.data.isBold || false);
  const [isItalic, setIsItalic] = useState(element.data.isItalic || false);
  const [isUnderline, setIsUnderline] = useState(element.data.isUnderline || false);
  const [fontFamily, setFontFamily] = useState(element.data.fontFamily || 'Inter');

  const [avatarUrl, setAvatarUrl] = useState(element.data.avatarUrl || '');
  const [rawAvatarUrl, setRawAvatarUrl] = useState(element.data.rawAvatarUrl || element.data.avatarUrl || '');
  const [avatarShape, setAvatarShape] = useState(element.data.avatarShape || 'circle');
  const [avatarBorderColor, setAvatarBorderColor] = useState(element.data.avatarBorderColor || '#ffffff');
  const [avatarBorderWidth, setAvatarBorderWidth] = useState(element.data.avatarBorderWidth !== undefined ? element.data.avatarBorderWidth : 4);
  const [avatarShadowSize, setAvatarShadowSize] = useState(element.data.avatarShadowSize || 'medium');
  const [avatarShadowColor, setAvatarShadowColor] = useState(element.data.avatarShadowColor || '#0f172a');

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropImageSource, setCropImageSource] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setCropImageSource(result);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCropModal = (imgSrc) => {
    const srcToUse = imgSrc || rawAvatarUrl || avatarUrl;
    if (srcToUse) {
      setCropImageSource(srcToUse);
      setIsCropModalOpen(true);
    }
  };

  const handleCropSave = ({
    croppedAvatarUrl,
    rawAvatarUrl: rawUrl,
    avatarShape: shape,
    avatarBorderColor: bColor,
    avatarBorderWidth: bWidth,
    avatarShadowSize: sSize,
    avatarShadowColor: sColor
  }) => {
    setAvatarUrl(croppedAvatarUrl);
    setRawAvatarUrl(rawUrl);
    setAvatarShape(shape);
    if (bColor !== undefined) setAvatarBorderColor(bColor);
    if (bWidth !== undefined) setAvatarBorderWidth(bWidth);
    if (sSize !== undefined) setAvatarShadowSize(sSize);
    if (sColor !== undefined) setAvatarShadowColor(sColor);
    setIsCropModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || name.trim();
    onSave(element.id, {
      ...element.data,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: fullName,
      jobTitle: jobTitle.trim(),
      designation: designation.trim(),
      department: department.trim(),
      companyName: companyName.trim(),
      fontSize,
      fontColor,
      isBold,
      isItalic,
      isUnderline,
      fontFamily,
      avatarUrl,
      rawAvatarUrl,
      avatarShape,
      avatarBorderColor,
      avatarBorderWidth,
      avatarShadowSize,
      avatarShadowColor
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

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || name || 'John Doe';
  const titleText = [jobTitle, designation].filter(Boolean).join(' • ') || 'Software Engineer';

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh] my-auto">
          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-2xl p-2 bg-indigo-50 rounded-xl">person</span>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">Edit Identity & Typography</h2>
                <p className="text-xs text-slate-500">Update photo, name, work info & font styles</p>
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

          {/* Modal Body */}
          <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
            {/* Avatar Upload / Selector & Shape Editor */}
            <div>
              <div className="mb-2">
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Profile Photo & Shape
                </label>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative group w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-xs bg-slate-100 flex-shrink-0 flex items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-3xl text-slate-400 m-auto">person</span>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL..."
                    value={avatarUrl}
                    onChange={(e) => {
                      setAvatarUrl(e.target.value);
                      setRawAvatarUrl(e.target.value);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                  />

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                      <span className="material-symbols-outlined text-sm">upload</span>
                      Upload Local Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => handleOpenCropModal(rawAvatarUrl || avatarUrl)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">crop</span>
                        Crop / Shape
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="mt-2.5">
                <span className="text-[11px] text-slate-400 block mb-1">Or choose a preset avatar:</span>
                <div className="flex gap-2">
                  {PRESET_AVATARS.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Preset ${idx + 1}`}
                      onClick={() => {
                        setAvatarUrl(url);
                        setRawAvatarUrl(url);
                        handleOpenCropModal(url);
                      }}
                      className={`w-8 h-8 rounded-full object-cover cursor-pointer border-2 transition-all hover:scale-110 ${
                        avatarUrl === url ? 'border-indigo-600 ring-2 ring-indigo-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  First Name
                </legend>
                <input
                  type="text"
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>

              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  Last Name
                </legend>
                <input
                  type="text"
                  placeholder="e.g. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
            </div>

            {/* Job Title & Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  Job Title
                </legend>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>

              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  Designation
                </legend>
                <input
                  type="text"
                  placeholder="e.g. Lead Developer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
            </div>

            {/* Department & Company Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  Department
                </legend>
                <input
                  type="text"
                  placeholder="e.g. Engineering & IT"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>

              <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
                <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
                  Company Name
                </legend>
                <input
                  type="text"
                  placeholder="e.g. Acme Tech Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
            </div>

            {/* Typography Controls Panel */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-base text-indigo-600">text_format</span>
                Identity Font & Style Controls
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

            {/* Real-time Live Identity Text Preview Box */}
            <div className="border border-indigo-100 rounded-2xl p-3.5 bg-indigo-50/40 text-center">
              <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                Live Text Preview:
              </span>
              <div style={getPreviewStyle()} className={`transition-all ${getFontSizeClass()}`}>
                <h3 className="font-bold tracking-tight mb-0.5">{fullName}</h3>
                <p className="text-xs opacity-90">{titleText}</p>
                {companyName && <p className="text-[11px] opacity-75">{companyName}</p>}
              </div>
            </div>

            {/* Footer Buttons */}
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
                Save Identity
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Avatar Crop & Shape Adjustment Modal */}
      {isCropModalOpen && cropImageSource && (
        <AvatarCropModal
          imageUrl={cropImageSource}
          currentShape={avatarShape}
          currentBorderColor={avatarBorderColor}
          currentBorderWidth={avatarBorderWidth}
          currentShadowSize={avatarShadowSize}
          currentShadowColor={avatarShadowColor}
          onSave={handleCropSave}
          onClose={() => setIsCropModalOpen(false)}
        />
      )}
    </>
  );
}
