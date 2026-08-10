import React, { useState } from 'react';

const ALL_PLATFORMS = [
  { platform: 'whatsapp', name: 'WhatsApp', placeholder: 'https://wa.me/', color: '#22c55e' },
  { platform: 'facebook', name: 'Facebook', placeholder: 'https://facebook.com/', color: '#2563eb' },
  { platform: 'youtube', name: 'YouTube', placeholder: 'https://youtube.com/', color: '#dc2626' },
  { platform: 'linkedin', name: 'LinkedIn', placeholder: 'https://linkedin.com/', color: '#1d4ed8' },
  { platform: 'website', name: 'Global / Website', placeholder: 'https://example.com', color: '#0d9488' },
  { platform: 'tiktok', name: 'TikTok', placeholder: 'https://tiktok.com/', color: '#111827' },
  { platform: 'instagram', name: 'Instagram', placeholder: 'https://instagram.com/', color: '#db2777' },
  // { platform: 'email', name: 'Email', placeholder: 'mailto:yourname@email.com', color: '#ef4444' },
  { platform: 'github', name: 'GitHub', placeholder: 'https://github.com/username', color: '#181717' }
];

export default function EditSocialModal({ element, onSave, onClose }) {
  const existingLinksMap = (element.data.links || []).reduce((acc, item) => {
    acc[item.platform] = item;
    return acc;
  }, {});

  const [links, setLinks] = useState(
    ALL_PLATFORMS.map((p) => ({
      platform: p.platform,
      name: p.name,
      url: existingLinksMap[p.platform]?.url || '',
      active: existingLinksMap[p.platform]?.active ?? true,
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
      links
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-2xl">share</span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Edit Social Media Links</h2>
              <p className="text-xs text-slate-500">Toggle active icons green to display them on your screen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-200/50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-3">
            {links.map((item) => {
              const meta = ALL_PLATFORMS.find((p) => p.platform === item.platform);
              return (
                <div
                  key={item.platform}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${item.active
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

          {/* Footer */}
          <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 cursor-pointer text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Save Links
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
