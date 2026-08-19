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
  const [alignment, setAlignment] = useState(element.data.alignment || 'left'); // 'left', 'center', 'right'

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
    const file = e.target.files?.[0];
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
      alignment,
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

  const getPreviewAlignmentConfig = () => {
    switch (alignment) {
      case 'center':
        return {
          wrapper: 'items-center text-center px-4',
          avatarRow: 'justify-center',
          textRow: 'items-center text-center'
        };
      case 'right':
        return {
          wrapper: 'items-end text-right px-6',
          avatarRow: 'justify-end',
          textRow: 'items-end text-right'
        };
      case 'left':
      default:
        return {
          wrapper: 'items-start text-left px-6',
          avatarRow: 'justify-start',
          textRow: 'items-start text-left'
        };
    }
  };

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || name || 'John Doe';
  const titleText = [jobTitle, designation].filter(Boolean).join(' • ') || 'Software Engineer';

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh] my-auto">
          {/* Modal Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600 text-2xl p-2 bg-indigo-50 rounded-xl">person</span>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">Edit Identity & Alignment</h2>
                <p className="text-xs text-slate-500">Update photo, name, work info, alignment & font styles</p>
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
            {/* NEW: Identity Alignment Selector (Left, Center, Right) */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-2 bg-indigo-50/30">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Identity Element Alignment (Banner Overlap)
              </span>
              <p className="text-[11px] text-slate-500">
                Choose where to align your profile photo (half-overlapping top banner) and text:
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { id: 'left', label: 'Left', icon: 'align_horizontal_left' },
                  { id: 'center', label: 'Center', icon: 'align_horizontal_center' },
                  { id: 'right', label: 'Right', icon: 'align_horizontal_right' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setAlignment(pos.id)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-1 ${alignment === pos.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <span className="material-symbols-outlined text-lg">{pos.icon}</span>
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Avatar Upload / Selector & Shape Editor */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Profile Photo & Shape
              </span>

              {/* Current Avatar & Actions */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border border-slate-300 shadow-2xs">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-2xl">person</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center gap-2 flex-wrap">
                  <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-2xs transition-colors">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
                  </label>

                  <button
                    type="button"
                    onClick={() => handleOpenCropModal()}
                    disabled={!avatarUrl && !rawAvatarUrl}
                    className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">crop</span>
                    Adjust Photo & Crop
                  </button>
                </div>
              </div>

              {/* Preset Avatar Selection */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Or Pick a Preset Avatar:
                </span>
                <div className="flex items-center gap-2">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAvatarUrl(url);
                        setRawAvatarUrl(url);
                      }}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${avatarUrl === url ? 'border-indigo-600 scale-110 shadow-xs' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Kiran"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Fatima"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Work Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Job Title / Headline
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Senior Tech Lead"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Engineering & IT"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Company / Institution Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google / GDG Pakistan"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Typography Controls */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Typography Controls
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

            {/* Real-time Live Identity Text & Alignment Preview Box */}
            <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/40 text-center">
              <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-2">
                Live Alignment & Text Preview:
              </span>
              <div className="w-full max-w-sm mx-auto bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs pb-3">
                <div className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl" />
                <div className={`w-full flex flex-col ${getPreviewAlignmentConfig().wrapper}`}>
                  <div className={`w-full flex ${getPreviewAlignmentConfig().avatarRow}`}>
                    <div className="-mt-6 relative z-10 w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-xs">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined text-xl">person</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={getPreviewStyle()} className={`mt-1.5 w-full flex flex-col ${getPreviewAlignmentConfig().textRow} ${getFontSizeClass()}`}>
                    <h3 className="font-bold tracking-tight mb-0.5">{fullName}</h3>
                    <p className="text-xs opacity-90">{titleText}</p>
                    {companyName && <p className="text-[11px] opacity-75">{companyName}</p>}
                  </div>
                </div>
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
