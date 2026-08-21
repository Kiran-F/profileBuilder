import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import EditIdentityModal from './components/Modals/EditIdentityModal';
import EditBioModal from './components/Modals/EditBioModal';
import EditSocialModal from './components/Modals/EditSocialModal';
import EditBadgesModal from './components/Modals/EditBadgesModal';
import EditYoutubeModal from './components/Modals/EditYoutubeModal';
import EditTextModal from './components/Modals/EditTextModal';
import EditContactModal from './components/Modals/EditContactModal';
import EditLinksModal from './components/Modals/EditLinksModal';
import EditGalleryModal from './components/Modals/EditGalleryModal';
import EditBannerModal from './components/Modals/EditBannerModal';
import EditContactFormModal from './components/Modals/EditContactFormModal';
import FullProfileWebPage from './components/FullProfileWebPage';
import { EMPTY_ELEMENT_DATA, enforceFixedOrder } from './data/defaultProfile';
import { PROFILE_BACKGROUND_GRADIENTS } from './utils/backgroundStyles';

const BG_PRESET_COLORS = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#0f172a', name: 'Slate Dark' },
  { hex: '#1e1b4b', name: 'Midnight Indigo' },
  { hex: '#064e3b', name: 'Deep Emerald' },
  { hex: '#312e81', name: 'Deep Purple' },
  { hex: '#450a0a', name: 'Deep Rose' },
  { hex: '#0f766e', name: 'Ocean Teal' },
  { hex: '#000000', name: 'Black' }
];

const TEXT_PRESET_COLORS = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#0f172a', name: 'Slate Dark' },
  { hex: '#4338ca', name: 'Indigo' },
  { hex: '#000000', name: 'Black' }
];

export const cleanAndRefreshLocalStorage = (
  elements,
  cardBgColor,
  textColor,
  cardBgType = 'solid',
  cardBgGradient = 'sunset-fire',
  customGradientStart = '#ff416c',
  customGradientEnd = '#ff4b2b'
) => {
  try {
    // Wipe all old/stale entries from localStorage & sessionStorage to free up quota
    localStorage.clear();
    sessionStorage.clear();
  } catch (err) {
    console.warn('Storage clear warning:', err);
  }

  // Save ONLY the fresh active snapshot
  const freshPayload = JSON.stringify({
    elements,
    cardBgColor,
    textColor,
    cardBgType,
    cardBgGradient,
    customGradientStart,
    customGradientEnd
  });

  try {
    localStorage.setItem('profile_studio_drag_elements_v4', JSON.stringify(elements));
    localStorage.setItem('profile_studio_card_bg', cardBgColor);
    localStorage.setItem('profile_studio_text_color', textColor);
    localStorage.setItem('profile_studio_bg_type', cardBgType);
    localStorage.setItem('profile_studio_bg_gradient', cardBgGradient);
    localStorage.setItem('profile_studio_grad_start', customGradientStart);
    localStorage.setItem('profile_studio_grad_end', customGradientEnd);
    localStorage.setItem('profile_studio_preview_data', freshPayload);
  } catch (err) {
    console.warn('localStorage full after wipe, writing to sessionStorage fallback:', err);
    try {
      sessionStorage.setItem('profile_studio_drag_elements_v4', JSON.stringify(elements));
      sessionStorage.setItem('profile_studio_card_bg', cardBgColor);
      sessionStorage.setItem('profile_studio_text_color', textColor);
      sessionStorage.setItem('profile_studio_bg_type', cardBgType);
      sessionStorage.setItem('profile_studio_bg_gradient', cardBgGradient);
      sessionStorage.setItem('profile_studio_grad_start', customGradientStart);
      sessionStorage.setItem('profile_studio_grad_end', customGradientEnd);
      sessionStorage.setItem('profile_studio_preview_data', freshPayload);
    } catch (sErr) {
      console.warn('sessionStorage also full:', sErr);
    }
  }
};

export const safeSetLocalStorage = (key, data) => {
  try {
    const stringified = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, stringified);
  } catch (err) {
    console.warn(`localStorage quota exceeded for key "${key}". Fallback to sessionStorage used.`, err);
    try {
      const stringified = typeof data === 'string' ? data : JSON.stringify(data);
      sessionStorage.setItem(key, stringified);
    } catch (sessionErr) {
      console.warn(`sessionStorage also full for key "${key}". Active in-memory React state is preserved.`, sessionErr);
    }
  }
};

export default function App() {
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  const [elements, setElements] = useState(() => {
    let saved = localStorage.getItem('profile_studio_preview_data') || localStorage.getItem('profile_studio_drag_elements_v4') || sessionStorage.getItem('profile_studio_preview_data') || sessionStorage.getItem('profile_studio_drag_elements_v4');
    if (!saved && isPreviewMode && typeof window !== 'undefined' && window.name && window.name.startsWith('{')) {
      saved = window.name;
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const list = parsed.elements ? parsed.elements : (Array.isArray(parsed) ? parsed : []);
        return enforceFixedOrder(list);
      } catch (e) { }
    }
    return [];
  });

  const [cardBgColor, setCardBgColor] = useState(() => {
    let saved = localStorage.getItem('profile_studio_preview_data') || localStorage.getItem('profile_studio_card_bg') || sessionStorage.getItem('profile_studio_card_bg');
    if (!saved && isPreviewMode && typeof window !== 'undefined' && window.name && window.name.startsWith('{')) {
      try {
        const parsed = JSON.parse(window.name);
        if (parsed.cardBgColor) return parsed.cardBgColor;
      } catch (e) { }
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cardBgColor) return parsed.cardBgColor;
      } catch (e) { }
    }
    return saved || '#ffffff';
  });

  const [cardBgType, setCardBgType] = useState(() => {
    let saved = localStorage.getItem('profile_studio_preview_data') || localStorage.getItem('profile_studio_bg_type');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cardBgType) return parsed.cardBgType;
      } catch (e) { }
    }
    return 'solid';
  });

  const [cardBgGradient, setCardBgGradient] = useState(() => {
    let saved = localStorage.getItem('profile_studio_preview_data') || localStorage.getItem('profile_studio_bg_gradient');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cardBgGradient) return parsed.cardBgGradient;
      } catch (e) { }
    }
    return 'sunset-fire';
  });

  const [customGradientStart, setCustomGradientStart] = useState('#ff416c');
  const [customGradientEnd, setCustomGradientEnd] = useState('#ff4b2b');

  const [textColor, setTextColor] = useState(() => {
    let saved = localStorage.getItem('profile_studio_preview_data') || localStorage.getItem('profile_studio_text_color') || sessionStorage.getItem('profile_studio_text_color');
    if (!saved && isPreviewMode && typeof window !== 'undefined' && window.name && window.name.startsWith('{')) {
      try {
        const parsed = JSON.parse(window.name);
        if (parsed.textColor) return parsed.textColor;
      } catch (e) { }
    }
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.textColor) return parsed.textColor;
      } catch (e) { }
    }
    return saved || '#191c1e';
  });

  const [editingElement, setEditingElement] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeColorTab, setActiveColorTab] = useState('background');
  const [activeDraggedType, setActiveDraggedType] = useState(null);
  const colorPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setIsColorPickerOpen(false);
      }
    };

    if (isColorPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isColorPickerOpen]);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (!isPreviewMode) {
      safeSetLocalStorage('profile_studio_drag_elements_v4', elements);
      safeSetLocalStorage('profile_studio_card_bg', cardBgColor);
      safeSetLocalStorage('profile_studio_bg_type', cardBgType);
      safeSetLocalStorage('profile_studio_bg_gradient', cardBgGradient);
      safeSetLocalStorage('profile_studio_grad_start', customGradientStart);
      safeSetLocalStorage('profile_studio_grad_end', customGradientEnd);
      safeSetLocalStorage('profile_studio_text_color', textColor);
    }
  }, [elements, cardBgColor, cardBgType, cardBgGradient, customGradientStart, customGradientEnd, textColor, isPreviewMode]);

  if (isPreviewMode) {
    return (
      <FullProfileWebPage
        initialElements={elements}
        initialCardBgColor={cardBgColor}
        initialCardBgType={cardBgType}
        initialCardBgGradient={cardBgGradient}
        initialCustomGradientStart={customGradientStart}
        initialCustomGradientEnd={customGradientEnd}
        initialTextColor={textColor}
      />
    );
  }

  const handleAddElementAtIndex = (type, index) => {
    const emptyData = EMPTY_ELEMENT_DATA[type] || {};

    const newElement = {
      id: `elem-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      data: JSON.parse(JSON.stringify(emptyData))
    };

    setElements((prev) => {
      // Remove any pre-existing instance of fixed elements if re-adding banner or identity
      const filtered = (type === 'banner' || type === 'identity')
        ? prev.filter((item) => item.type !== type)
        : [...prev];

      const targetIdx = index >= 0 && index <= filtered.length ? index : filtered.length;
      filtered.splice(targetIdx, 0, newElement);
      return enforceFixedOrder(filtered);
    });

    setEditingElement(newElement);
  };

  const handleSaveElementData = (id, newData) => {
    setElements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, data: newData } : item))
    );
    setEditingElement(null);
  };

  const handleDeleteElement = (id) => {
    setElements((prev) => enforceFixedOrder(prev.filter((item) => item.id !== id)));
  };

  const handleReorderElements = (newElements) => {
    setElements(enforceFixedOrder(newElements));
  };

  const handleClearCanvas = () => {
    setElements([]);
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) { }
  };

  const handleOpenPreviewTab = () => {
    cleanAndRefreshLocalStorage(
      elements,
      cardBgColor,
      textColor,
      cardBgType,
      cardBgGradient,
      customGradientStart,
      customGradientEnd
    );
    const freshPayload = JSON.stringify({
      elements,
      cardBgColor,
      textColor,
      cardBgType,
      cardBgGradient,
      customGradientStart,
      customGradientEnd
    });
    const previewUrl = `${window.location.origin}${window.location.pathname}?preview=true`;
    const newTab = window.open(previewUrl, '_blank');
    if (newTab) {
      try {
        newTab.name = freshPayload;
      } catch (e) { }
    }
  };

  const handleMobileDragStart = (e, type) => {
    window.__draggedSidebarType = type;
    window.__draggedSource = 'sidebar';
    setActiveDraggedType(type);
    try {
      e.dataTransfer.setData('text/plain', type); // Ensures every browser understands the drag data payload
      e.dataTransfer.setData('application/x-profile-block', type); // Ensures the Canvas knows this is a VALID profile block (and NOT an external image/file/link)
      e.dataTransfer.effectAllowed = 'copy';
    } catch (err) { }
  };

  const handleMobileDragEnd = () => {
    window.__draggedSidebarType = null;
    window.__draggedSource = null;
    setActiveDraggedType(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] font-sans antialiased text-slate-900 selection:bg-[#4648d4] selection:text-white pb-16 sm:pb-0">
      {/* Top Header Bar */}
      <header className="h-14 ml-0 sm:ml-44 md:ml-60 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-[100] sticky top-0 transition-all duration-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 truncate max-w-[140px] sm:max-w-none">
            Profile Studio
          </span>
        </div>

        {/* Action Controls & Color Picker */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* "Change Colors" Button */}
          <div ref={colorPickerRef} className="relative">
            <button
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] sm:text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-2xs"
              title="Customize Background Color & Text Color"
            >
              <span className="material-symbols-outlined text-base text-indigo-600">palette</span>
              <span className="hidden sm:inline">Change Colors</span>
              <div className="flex items-center gap-1 ml-0.5 sm:ml-1 border-l border-slate-200 pl-1 sm:pl-1.5">
                <span
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: cardBgColor }}
                  title="Current Background"
                ></span>
                <span
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-slate-300 shadow-2xs"
                  style={{ backgroundColor: textColor }}
                  title="Current Text Color"
                ></span>
              </div>
            </button>

            {/* Color & Background Picker Dropdown Popover */}
            {isColorPickerOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-84 bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 sm:p-4 z-[110] animate-fadeIn max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="material-symbols-outlined text-base text-indigo-600">palette</span>
                    Background & Theme Styling
                  </span>
                  <button
                    onClick={() => setIsColorPickerOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                {/* Top Category Tabs: Background vs Text Color */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-3.5 gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveColorTab('background')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${activeColorTab === 'background'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span className="material-symbols-outlined text-sm">wallpaper</span>
                    Background
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveColorTab('text')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${activeColorTab === 'text'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span className="material-symbols-outlined text-sm">format_color_text</span>
                    Text Color
                  </button>
                </div>

                {/* BACKGROUND TAB */}
                {activeColorTab === 'background' && (
                  <div className="space-y-3.5">
                    {/* Background Type Segmented Switch: Solid | Gradient */}
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setCardBgType('solid')}
                        className={`py-1 rounded-lg transition-all cursor-pointer ${cardBgType === 'solid' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Solid Color
                      </button>
                      <button
                        type="button"
                        onClick={() => setCardBgType('gradient')}
                        className={`py-1 rounded-lg transition-all cursor-pointer ${cardBgType === 'gradient' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Gradient Theme
                      </button>
                    </div>

                    {/* 1. SOLID COLOR MODE */}
                    {(cardBgType === 'solid' || cardBgType === 'pattern') && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-semibold text-slate-700 block">
                          Choose Solid Color:
                        </span>
                        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                          <input
                            type="color"
                            value={cardBgColor}
                            onChange={(e) => setCardBgColor(e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                          />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-slate-500">Hex Code</span>
                            <span className="text-xs font-mono font-bold text-slate-800 uppercase">{cardBgColor}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase text-slate-400 block">Solid Color Presets</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {BG_PRESET_COLORS.map((preset) => (
                            <button
                              key={preset.hex}
                              type="button"
                              onClick={() => setCardBgColor(preset.hex)}
                              className={`h-7 rounded-lg border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${cardBgColor.toLowerCase() === preset.hex.toLowerCase()
                                ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                                : 'border-slate-200'
                                }`}
                              style={{ backgroundColor: preset.hex }}
                              title={preset.name}
                            >
                              {cardBgColor.toLowerCase() === preset.hex.toLowerCase() && (
                                <span className={`material-symbols-outlined text-xs ${preset.hex === '#ffffff' ? 'text-indigo-600' : 'text-white'}`}>
                                  check
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. GRADIENT THEME MODE */}
                    {cardBgType === 'gradient' && (
                      <div className="space-y-3">
                        <span className="text-[11px] font-semibold text-slate-700 block">
                          Select Vibrant Gradient Theme:
                        </span>

                        {/* 12 Curated Vibrant Gradient Presets */}
                        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                          {PROFILE_BACKGROUND_GRADIENTS.map((g) => (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => {
                                setCardBgGradient(g.id);
                                setCardBgType('gradient');
                              }}
                              style={{ background: g.css }}
                              className={`h-11 rounded-xl border flex items-end p-2 text-[10px] font-bold text-white transition-all cursor-pointer shadow-2xs ${cardBgGradient === g.id
                                ? 'ring-2 ring-indigo-600 ring-offset-2 scale-102 border-white'
                                : 'border-transparent opacity-95 hover:opacity-100 hover:scale-102'
                                }`}
                            >
                              <span className="truncate drop-shadow-md">{g.name}</span>
                            </button>
                          ))}
                        </div>

                        {/* Custom Gradient Builder */}
                        <div className="pt-2.5 border-t border-slate-100 space-y-2">
                          <span className="text-[11px] font-semibold text-slate-700 block">
                            Or Custom Gradient Colors:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {/* Color 1 */}
                            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                              <input
                                type="color"
                                value={customGradientStart}
                                onChange={(e) => {
                                  setCustomGradientStart(e.target.value);
                                  setCardBgGradient('custom');
                                  setCardBgType('gradient');
                                }}
                                className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent p-0"
                              />
                              <div className="flex flex-col">
                                <span className="text-[9px] font-medium text-slate-500">Start</span>
                                <span className="text-[10px] font-mono font-bold text-slate-800 uppercase">{customGradientStart}</span>
                              </div>
                            </div>

                            {/* Color 2 */}
                            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
                              <input
                                type="color"
                                value={customGradientEnd}
                                onChange={(e) => {
                                  setCustomGradientEnd(e.target.value);
                                  setCardBgGradient('custom');
                                  setCardBgType('gradient');
                                }}
                                className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent p-0"
                              />
                              <div className="flex flex-col">
                                <span className="text-[9px] font-medium text-slate-500">End</span>
                                <span className="text-[10px] font-mono font-bold text-slate-800 uppercase">{customGradientEnd}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TEXT COLOR TAB */}
                {activeColorTab === 'text' && (
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                      Choose Global Text Color:
                    </span>
                    <div className="flex items-center gap-3 mb-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-slate-500">Hex Code</span>
                        <span className="text-xs font-mono font-bold text-slate-800 uppercase">{textColor}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Presets</span>
                    <div className="grid grid-cols-2 gap-2">
                      {TEXT_PRESET_COLORS.map((preset) => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setTextColor(preset.hex)}
                          className={`w-full h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${textColor.toLowerCase() === preset.hex.toLowerCase()
                            ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                            : 'border-slate-200'
                            }`}
                          style={{ backgroundColor: preset.hex }}
                          title={preset.name}
                        >
                          {textColor.toLowerCase() === preset.hex.toLowerCase() && (
                            <span
                              className={`material-symbols-outlined text-sm ${preset.hex === '#ffffff' ? 'text-indigo-600' : 'text-white'
                                }`}
                            >
                              check
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PREVIEW BUTTON */}
          <button
            onClick={handleOpenPreviewTab}
            className="px-2.5 md:px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Preview Profile in new tab"
          >
            <span className="material-symbols-outlined text-base">open_in_new</span>
            <span className="hidden md:inline">Preview</span>
          </button>
        </div>
      </header>

      {/* Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Center Canvas */}
        <Canvas
          elements={elements}
          cardBgColor={cardBgColor}
          cardBgType={cardBgType}
          cardBgGradient={cardBgGradient}
          customGradientStart={customGradientStart}
          customGradientEnd={customGradientEnd}
          textColor={textColor}
          onReorderElements={handleReorderElements}
          onAddElementAtIndex={handleAddElementAtIndex}
          onEditElement={(elem) => setEditingElement(elem)}
          onDeleteElement={handleDeleteElement}
        />
      </div>

      {/* FIXED BOTTOM DRAGGABLE / TAP BAR FOR MOBILE (VISIBLE ON ALL SCREENS < 640px) */}
      <nav
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{ touchAction: 'pan-x', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-3 flex items-center gap-3 overflow-x-auto shadow-lg select-none scrollbar-none overscroll-contain"
      >
        {[
          { key: 'banner', label: 'Banner', icon: 'panorama' },
          { key: 'identity', label: 'Identity', icon: 'fingerprint' },
          { key: 'bio', label: 'Bio', icon: 'description' },
          { key: 'social', label: 'Social', icon: 'share' },
          { key: 'badges', label: 'Badges', icon: 'workspace_premium' },
          { key: 'youtube', label: 'YouTube', icon: 'play_circle' },
          { key: 'text', label: 'Text', icon: 'text_fields' },
          { key: 'contact', label: 'Contact Info', icon: 'contacts' },
          { key: 'contactForm', label: 'Contact Me', icon: 'connect_without_contact' },
          { key: 'links', label: 'Links', icon: 'add_link' },
          { key: 'gallery', label: 'Gallery', icon: 'collections' }
        ].map((item) => {
          const isDragging = activeDraggedType === item.key;
          return (
            <div
              key={item.key}
              draggable="true"
              onDragStart={(e) => handleMobileDragStart(e, item.key)}
              onDragEnd={handleMobileDragEnd}
              onMouseUp={handleMobileDragEnd}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-grab active:cursor-grabbing flex-shrink-0 relative ${
                isDragging
                  ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-400 shadow-md'
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
              title={`Drag onto canvas to add ${item.label}`}
            >
              <span className={`material-symbols-outlined text-xl transition-colors ${isDragging ? 'text-white' : 'text-indigo-600'}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] whitespace-nowrap transition-colors ${isDragging ? 'font-bold text-white' : 'font-semibold'}`}>
                {item.label}
              </span>
            </div>
          );
        })}

        <div className="w-[1px] h-6 bg-slate-200 flex-shrink-0"></div>

        {/* Clear Canvas Option */}
        <button
          type="button"
          disabled={elements.length === 0}
          onClick={handleClearCanvas}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-shrink-0 ${
            elements.length > 0
              ? 'text-red-500 hover:text-red-700 cursor-pointer active:scale-95'
              : 'text-slate-400 opacity-75 pointer-events-none'
          }`}
          title="Clear all canvas elements"
        >
          <span className="material-symbols-outlined text-xl">delete_sweep</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">Clear</span>
        </button>
      </nav>

      {/* Modals */}
      {editingElement && editingElement.type === 'identity' && (
        <EditIdentityModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'bio' && (
        <EditBioModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'social' && (
        <EditSocialModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'badges' && (
        <EditBadgesModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'youtube' && (
        <EditYoutubeModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'text' && (
        <EditTextModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'contact' && (
        <EditContactModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'links' && (
        <EditLinksModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'gallery' && (
        <EditGalleryModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && editingElement.type === 'banner' && (
        <EditBannerModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}

      {editingElement && (editingElement.type === 'contactForm' || editingElement.type === 'contact_form') && (
        <EditContactFormModal
          element={editingElement}
          onSave={handleSaveElementData}
          onClose={() => setEditingElement(null)}
        />
      )}
    </div>
  );
}
