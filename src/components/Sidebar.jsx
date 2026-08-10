import React, { useState } from 'react';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(null);

  const startDragging = (type) => {
    window.__draggedSidebarType = type;
    window.__draggedSource = 'sidebar';
  };

  const handleDragStart = (e, type) => {
    startDragging(type);
    try {
      e.dataTransfer.setData('text/plain', type);
      e.dataTransfer.setData('text/html', type);
      e.dataTransfer.effectAllowed = 'copy';
    } catch (err) {}
  };

  const navItems = [
    { key: 'identity', label: 'Identity', icon: 'person', desc: 'Avatar & Name' },
    { key: 'bio', label: 'Bio', icon: 'description', desc: 'Roles & Description' },
    { key: 'social', label: 'Social', icon: 'share', desc: 'Social Icons & Links' }
  ];

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col py-6 px-4 gap-4 fixed left-0 top-0 bottom-0 z-30 h-screen overflow-y-auto select-none">
      {/* Header section */}
      <div className="flex items-center gap-3 px-2 mb-2">
        <div className="bg-slate-100 p-2 rounded-md flex items-center justify-center text-indigo-600">
          <span className="material-symbols-outlined text-[20px]">category</span>
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            Elements
          </h2>
          <p className="text-xs text-slate-500">
            Drag to canvas
          </p>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <div
              key={item.key}
              draggable="true"
              onMouseDown={() => startDragging(item.key)}
              onTouchStart={() => startDragging(item.key)}
              onDragStart={(e) => {
                setActiveTab(item.key);
                handleDragStart(e, item.key);
              }}
              className={`flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-grab active:cursor-grabbing border ${
                isActive
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-2xs'
                  : 'bg-slate-50/50 border-slate-200/80 text-slate-700 hover:bg-indigo-50/60 hover:border-indigo-300 hover:text-indigo-600'
              }`}
              title="Drag and drop onto canvas"
            >
              <span className="material-symbols-outlined text-[20px] text-indigo-600">
                {item.icon}
              </span>
              <div className="flex flex-col">
                <span>{item.label}</span>
                <span className="text-[10px] font-normal text-slate-400">{item.desc}</span>
              </div>
              <span className="material-symbols-outlined text-xs text-slate-400 ml-auto opacity-60">
                drag_indicator
              </span>
            </div>
          );
        })}
      </nav>

      {/* Add Custom Block button */}
      <div className="mt-auto pt-4 border-t border-slate-200/80">
        <div
          draggable="true"
          onMouseDown={() => startDragging('custom')}
          onTouchStart={() => startDragging('custom')}
          onDragStart={(e) => handleDragStart(e, 'custom')}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-dashed border-indigo-400 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50/40 hover:bg-indigo-100/60 transition-colors cursor-grab active:cursor-grabbing shadow-2xs"
          title="Drag onto canvas to add custom link"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Drag Custom Block
        </div>
      </div>
    </aside>
  );
}
