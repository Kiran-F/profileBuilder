import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import EditIdentityModal from './components/Modals/EditIdentityModal';
import EditBioModal from './components/Modals/EditBioModal';
import EditSocialModal from './components/Modals/EditSocialModal';
import EditBadgesModal from './components/Modals/EditBadgesModal';
import EditYoutubeModal from './components/Modals/EditYoutubeModal';
import FullProfileWebPage from './components/FullProfileWebPage';
import { EMPTY_ELEMENT_DATA } from './data/defaultProfile';

const BG_PRESET_COLORS = [
  { hex: '#ffffff', name: 'Pure White' },
  { hex: '#f8fafc', name: 'Slate Light' },
  { hex: '#fefce8', name: 'Soft Cream' },
  { hex: '#eef2ff', name: 'Soft Indigo' },
  { hex: '#ecfdf5', name: 'Soft Emerald' },
  { hex: '#fff1f2', name: 'Soft Rose' },
  { hex: '#f3e8ff', name: 'Soft Lavender' },
  { hex: '#0f172a', name: 'Dark Slate' }
];

const TEXT_PRESET_COLORS = [
  { hex: '#191c1e', name: 'Deep Charcoal' },
  { hex: '#0f172a', name: 'Midnight Slate' },
  { hex: '#334155', name: 'Slate Gray' },
  { hex: '#ffffff', name: 'Pure White' },
  { hex: '#4338ca', name: 'Deep Indigo' },
  { hex: '#047857', name: 'Deep Emerald' },
  { hex: '#be123c', name: 'Deep Rose' },
  { hex: '#6b21a8', name: 'Deep Purple' }
];

export default function App() {
  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';

  const [elements, setElements] = useState(() => {
    const saved = localStorage.getItem('profile_studio_drag_elements_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [cardBgColor, setCardBgColor] = useState(() => {
    return localStorage.getItem('profile_studio_card_bg') || '#ffffff';
  });

  const [textColor, setTextColor] = useState(() => {
    return localStorage.getItem('profile_studio_text_color') || '#191c1e';
  });

  const [editingElement, setEditingElement] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeColorTab, setActiveColorTab] = useState('background');

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (!isPreviewMode) {
      localStorage.setItem('profile_studio_drag_elements_v4', JSON.stringify(elements));
      localStorage.setItem('profile_studio_card_bg', cardBgColor);
      localStorage.setItem('profile_studio_text_color', textColor);
    }
  }, [elements, cardBgColor, textColor, isPreviewMode]);

  if (isPreviewMode) {
    return (
      <FullProfileWebPage
        initialElements={elements}
        initialCardBgColor={cardBgColor}
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
      const updated = [...prev];
      const targetIdx = index >= 0 && index <= prev.length ? index : prev.length;
      updated.splice(targetIdx, 0, newElement);
      return updated;
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
    setElements((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReorderElements = (newElements) => {
    setElements(newElements);
  };

  const handleClearCanvas = () => {
    setElements([]);
    localStorage.removeItem('profile_studio_drag_elements_v4');
  };

  const handleOpenPreviewTab = () => {
    localStorage.setItem('profile_studio_preview_data', JSON.stringify({ elements, cardBgColor, textColor }));
    const previewUrl = `${window.location.origin}${window.location.pathname}?preview=true`;
    window.open(previewUrl, '_blank');
  };

  const handleMobileDragStart = (e, type) => {
    window.__draggedSidebarType = type;
    window.__draggedSource = 'sidebar';
    try {
      e.dataTransfer.setData('text/plain', type);
      e.dataTransfer.setData('application/x-profile-block', type);
      e.dataTransfer.effectAllowed = 'copy';
    } catch (err) { }
  };

  const handleMobileDragEnd = () => {
    window.__draggedSidebarType = null;
    window.__draggedSource = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] font-sans antialiased text-slate-900 selection:bg-[#4648d4] selection:text-white pb-16 sm:pb-0">
      {/* Top Header Bar */}
      <header className="h-14 ml-0 sm:ml-44 md:ml-60 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-50 sticky top-0 transition-all duration-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 truncate max-w-[140px] sm:max-w-none">
            Profile Studio
          </span>
        </div>

        {/* Action Controls & Color Picker */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* "Change Colors" Button */}
          <div className="relative">
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

            {/* Color Picker Dropdown Popover */}
            {isColorPickerOpen && (
              <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 sm:p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-indigo-600">tune</span>
                    Color Customizer
                  </span>
                  <button
                    onClick={() => setIsColorPickerOpen(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl mb-4 gap-1">
                  <button
                    onClick={() => setActiveColorTab('background')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${activeColorTab === 'background'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: cardBgColor }}
                    ></span>
                    Background
                  </button>
                  <button
                    onClick={() => setActiveColorTab('text')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${activeColorTab === 'text'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: textColor }}
                    ></span>
                    Text Color
                  </button>
                </div>

                {activeColorTab === 'background' && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                      Choose Background Color:
                    </span>
                    <div className="flex items-center gap-3 mb-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <input
                        type="color"
                        value={cardBgColor}
                        onChange={(e) => setCardBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-slate-500">Hex Code</span>
                        <span className="text-xs font-mono font-bold text-slate-800 uppercase">{cardBgColor}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-2">Presets</span>
                    <div className="grid grid-cols-4 gap-2">
                      {BG_PRESET_COLORS.map((preset) => (
                        <button
                          key={preset.hex}
                          onClick={() => setCardBgColor(preset.hex)}
                          className={`w-full h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer hover:scale-105 ${cardBgColor.toLowerCase() === preset.hex.toLowerCase()
                            ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                            : 'border-slate-200'
                            }`}
                          style={{ backgroundColor: preset.hex }}
                          title={preset.name}
                        >
                          {cardBgColor.toLowerCase() === preset.hex.toLowerCase() && (
                            <span
                              className={`material-symbols-outlined text-sm ${preset.hex === '#0f172a' ? 'text-white' : 'text-indigo-600'
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

                {activeColorTab === 'text' && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-700 block mb-2">
                      Choose Text Color:
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
                    <div className="grid grid-cols-4 gap-2">
                      {TEXT_PRESET_COLORS.map((preset) => (
                        <button
                          key={preset.hex}
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
                              className={`material-symbols-outlined text-sm ${preset.hex === '#ffffff' ? 'text-slate-900' : 'text-white'
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

          {/* PREVIEW BUTTON: SHOW "Preview" TEXT ON SCREENS >= 768px (md), ICON-ONLY ON SMALLER SCREENS */}
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
          textColor={textColor}
          onReorderElements={handleReorderElements}
          onAddElementAtIndex={handleAddElementAtIndex}
          onEditElement={(elem) => setEditingElement(elem)}
          onDeleteElement={handleDeleteElement}
        />
      </div>

      {/* FIXED BOTTOM DRAGGABLE BAR FOR MOBILE (VISIBLE ON ALL SCREENS < 640px) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 flex items-center gap-4 overflow-x-auto shadow-lg select-none scrollbar-none">
        {/* 1. Identity Block Source */}
        <div
          draggable="true"
          onDragStart={(e) => handleMobileDragStart(e, 'identity')}
          onDragEnd={handleMobileDragEnd}
          onMouseUp={handleMobileDragEnd}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-700 hover:text-indigo-600 transition-all cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag onto canvas to add Identity"
        >
          <span className="material-symbols-outlined text-xl text-indigo-600">fingerprint</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">Identity</span>
        </div>

        {/* 2. Bio Block Source */}
        <div
          draggable="true"
          onDragStart={(e) => handleMobileDragStart(e, 'bio')}
          onDragEnd={handleMobileDragEnd}
          onMouseUp={handleMobileDragEnd}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-700 hover:text-indigo-600 transition-all cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag onto canvas to add Bio"
        >
          <span className="material-symbols-outlined text-xl text-indigo-600">description</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">Bio</span>
        </div>

        {/* 3. Social Block Source */}
        <div
          draggable="true"
          onDragStart={(e) => handleMobileDragStart(e, 'social')}
          onDragEnd={handleMobileDragEnd}
          onMouseUp={handleMobileDragEnd}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-700 hover:text-indigo-600 transition-all cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag onto canvas to add Social"
        >
          <span className="material-symbols-outlined text-xl text-indigo-600">share</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">Social</span>
        </div>

        {/* 4. Badges Block Source */}
        <div
          draggable="true"
          onDragStart={(e) => handleMobileDragStart(e, 'badges')}
          onDragEnd={handleMobileDragEnd}
          onMouseUp={handleMobileDragEnd}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-700 hover:text-indigo-600 transition-all cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag onto canvas to add Badges"
        >
          <span className="material-symbols-outlined text-xl text-indigo-600">workspace_premium</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">Badges</span>
        </div>

        {/* 5. YouTube Video Block Source */}
        <div
          draggable="true"
          onDragStart={(e) => handleMobileDragStart(e, 'youtube')}
          onDragEnd={handleMobileDragEnd}
          onMouseUp={handleMobileDragEnd}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-700 hover:text-indigo-600 transition-all cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag onto canvas to add YouTube Video"
        >
          <span className="material-symbols-outlined text-xl text-indigo-600">play_circle</span>
          <span className="text-[10px] font-semibold whitespace-nowrap">YouTube</span>
        </div>

        {/* 6. Clear Canvas Option */}
        <button
          type="button"
          disabled={elements.length === 0}
          onClick={handleClearCanvas}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all cursor-pointer flex-shrink-0 ${elements.length > 0
            ? 'text-red-500 hover:text-red-700'
            : 'text-slate-300 opacity-40 pointer-events-none'
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
    </div>
  );
}
