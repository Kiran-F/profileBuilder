import React from 'react';

const normalizeUrl = (url) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url;
  }
  return `https://${url}`;
};

export default function CustomLinkElement({ data }) {
  const { title, url, buttonStyle, iconName } = data || {};

  const getStyleClass = () => {
    switch (buttonStyle) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md hover:opacity-95';
      case 'secondary':
        return 'bg-slate-900 text-white shadow-sm hover:bg-slate-800';
      case 'outline':
        return 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5';
      default: // 'primary'
        return 'bg-primary text-white shadow-md hover:bg-indigo-700';
    }
  };

  return (
    <div className="w-full px-2 py-1">
      <a
        href={normalizeUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${getStyleClass()}`}
      >
        {iconName && <span className="material-symbols-outlined text-[18px]">{iconName}</span>}
        <span>{title || 'Custom CTA Link'}</span>
      </a>
    </div>
  );
}
