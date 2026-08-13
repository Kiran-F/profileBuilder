import React, { useState } from 'react';

const ALL_PLATFORMS = [
  { platform: 'whatsapp', name: 'WhatsApp', placeholder: 'https://wa.me/', color: '#22c55e' },
  { platform: 'facebook', name: 'Facebook', placeholder: 'https://facebook.com/', color: '#2563eb' },
  { platform: 'youtube', name: 'YouTube', placeholder: 'https://youtube.com/', color: '#dc2626' },
  { platform: 'linkedin', name: 'LinkedIn', placeholder: 'https://linkedin.com/', color: '#1d4ed8' },
  { platform: 'website', name: 'Global / Website', placeholder: 'https://example.com', color: '#0d9488' },
  { platform: 'tiktok', name: 'TikTok', placeholder: 'https://tiktok.com/', color: '#111827' },
  { platform: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/', color: '#db2777' },
  { platform: 'telegram', name: 'Telegram', placeholder: 'https://t.me/', color: '#0088cc' },
  { platform: 'snapchat', name: 'Snapchat', placeholder: 'https://snapchat.com/add/', color: '#fffc00' },
  { platform: 'dribbble', name: 'Dribbble', placeholder: 'https://dribbble.com/', color: '#ea4c89' },
  { platform: 'x', name: 'X / Twitter', placeholder: 'https://x.com/', color: '#000000' },
  { platform: 'document', name: 'Document / Resume', placeholder: 'https://example.com/resume.pdf', color: '#64748b' },
  { platform: 'discord', name: 'Discord Server', placeholder: 'https://discord.gg/invite', color: '#5865f2' }
];

export default function EditSocialModal({ element, onSave, onClose }) {
  const existingLinksMap = (element.data.links || []).reduce((acc, item) => {
    acc[item.platform] = item;
    return acc;
  }, {});

  const [iconStyle, setIconStyle] = useState(element.data.iconStyle || 'filled');
  const [colorMode, setColorMode] = useState(element.data.colorMode || 'colored');
  const [iconShape, setIconShape] = useState(element.data.iconShape || 'circle');
  const [iconSize, setIconSize] = useState(element.data.iconSize || 'medium');

  const [links, setLinks] = useState(
    ALL_PLATFORMS.map((p) => ({
      platform: p.platform,
      name: p.name,
      url: existingLinksMap[p.platform]?.url || '',
      active: existingLinksMap[p.platform]?.active ?? (existingLinksMap[p.platform]?.url ? true : false),
      color: p.color
    }))
  );

  const handleToggle = (platform) => {
    setLinks((prev) =>
      prev.map((item) => (item.platform === platform ? { ...item, active: !item.active } : item))
    );
  };

  const handleUrlChange = (platform, newUrl) => {
    setLinks((prev) =>
      prev.map((item) => (item.platform === platform ? { ...item, url: newUrl } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      ...element.data,
      iconStyle,
      colorMode,
      iconShape,
      iconSize,
      links
    });
  };

  const activeCount = links.filter((l) => l.active).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-2xl p-2 bg-indigo-50 rounded-xl">share</span>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">Edit Social Links & Icon Style</h2>
              <p className="text-xs text-slate-500">Configure links, icon fills, colors & shapes</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-5 overflow-y-auto max-h-[65vh] space-y-4">

            {/* Icon Customization Controls Panel */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-base text-indigo-600">palette</span>
                Social Icons Style & Color Mode
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Icon Fill Style */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Fill Style
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'filled', label: 'Filled' },
                      { id: 'unfilled', label: 'Outlined' },
                      { id: 'minimal', label: 'Minimal' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setIconStyle(st.id)}
                        className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                          iconStyle === st.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Theme Mode */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'colored', label: 'Official' },
                      { id: 'black', label: 'Black' },
                      { id: 'white', label: 'White' }
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setColorMode(col.id)}
                        className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                          colorMode === col.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Icon Shape */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Icon Shape
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'circle', label: 'Circle' },
                      { id: 'rounded', label: 'Rounded' },
                      { id: 'square', label: 'Square' }
                    ].map((sh) => (
                      <button
                        key={sh.id}
                        type="button"
                        onClick={() => setIconShape(sh.id)}
                        className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                          iconShape === sh.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {sh.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Size */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Icon Size
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'small', label: 'Small' },
                      { id: 'medium', label: 'Medium' },
                      { id: 'large', label: 'Large' }
                    ].map((sz) => (
                      <button
                        key={sz.id}
                        type="button"
                        onClick={() => setIconSize(sz.id)}
                        className={`py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                          iconSize === sz.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {sz.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Header & List */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Platforms & Links ({activeCount} Active)
              </span>
              <span className="text-[11px] text-slate-400">Toggle green to display on screen</span>
            </div>

            <div className="space-y-2.5">
              {links.map((item) => {
                const meta = ALL_PLATFORMS.find((p) => p.platform === item.platform);
                return (
                  <div
                    key={item.platform}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      item.active
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-2xs'
                        : 'border-slate-200 bg-slate-50/50 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 mr-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.name.substring(0, 2)}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-slate-900">
                            {item.name}
                          </span>
                          {item.active && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                              Visible
                            </span>
                          )}
                        </div>
                        <input
                          type="url"
                          placeholder={meta?.placeholder || 'https://...'}
                          value={item.url}
                          onChange={(e) => handleUrlChange(item.platform, e.target.value)}
                          className="w-full text-xs bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Toggle Switch - GREEN WHEN ACTIVE */}
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0" title={item.active ? 'Click to hide link' : 'Click to display link'}>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={() => handleToggle(item.platform)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">check</span>
              Save Social Links
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
