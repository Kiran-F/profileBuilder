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
    { key: 'banner', label: 'Top Banner', icon: 'panorama', desc: 'Fixed Header Banner at Top' },
    { key: 'identity', label: 'Identity', icon: 'person', desc: 'Avatar & Name' },
    { key: 'bio', label: 'Bio', icon: 'description', desc: 'Roles & Description' },
    { key: 'social', label: 'Social', icon: 'share', desc: 'Social Icons & Links' },
    { key: 'badges', label: 'Badges', icon: 'workspace_premium', desc: 'Square Badges & Credentials' },
    { key: 'youtube', label: 'YouTube Video', icon: 'play_circle', desc: 'Embed YouTube Video' },
    { key: 'text', label: 'Text Block', icon: 'text_fields', desc: 'Custom Heading & Text' },
    { key: 'contact', label: 'Contact Info', icon: 'contacts', desc: 'Email, Phone, Web & Location' },
    { key: 'links', label: 'Links', icon: 'add_link', desc: 'Custom Button Links' },
    { key: 'gallery', label: 'Gallery / Certificates', icon: 'collections', desc: 'Images, Events & Certificates' }
  ];

  return (
    <aside className="hidden sm:flex w-44 md:w-60 bg-white border-r border-slate-200 flex-col py-4 md:py-6 px-3 md:px-4 gap-3 md:gap-4 fixed left-0 top-0 bottom-0 z-40 h-screen overflow-y-auto select-none transition-all duration-200">
      {/* Header section */}
      <div className="flex items-center justify-start gap-2.5 px-2 mb-2">
        <div className="bg-slate-100 p-2 rounded-xl flex items-center justify-center text-indigo-600 shadow-2xs">
          <span className="material-symbols-outlined text-[20px]">category</span>
        </div>
        <div>
          <h2 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">
            Elements
          </h2>
          <p className="text-[10px] md:text-xs text-slate-500">
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
              className={`flex items-center justify-start gap-2.5 px-3 py-3 md:py-3.5 rounded-xl text-sm font-semibold transition-all cursor-grab active:cursor-grabbing border ${
                isActive
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-2xs'
                  : 'bg-slate-50/50 border-slate-200/80 text-slate-700 hover:bg-indigo-50/60 hover:border-indigo-300 hover:text-indigo-600'
              }`}
              title="Drag and drop onto canvas"
            >
              <span className="material-symbols-outlined text-[20px] text-indigo-600 flex-shrink-0">
                {item.icon}
              </span>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs md:text-sm leading-tight">{item.label}</span>
                <span className="text-[10px] font-normal text-slate-400 truncate hidden md:block">{item.desc}</span>
              </div>
              <span className="material-symbols-outlined text-xs text-slate-400 ml-auto opacity-60 hidden md:block">
                drag_indicator
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
