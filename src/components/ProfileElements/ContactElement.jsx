import React from 'react';

const FONT_MAP = {
  'Inter': "'Inter', sans-serif",
  'Bebas Neue': "'Bebas Neue', cursive",
  'Roboto': "'Roboto', sans-serif",
  'sans-serif': 'sans-serif',
  'Open Sans': "'Open Sans', sans-serif",
  'Lato': "'Lato', sans-serif",
  'Sekuya': "'Sekuya', 'Cinzel', serif",
  'Roboto Mono': "'Roboto Mono', monospace",
  'Arimo': "'Arimo', sans-serif",
  'Montserrat': "'Montserrat', sans-serif",
  'Bitcount Prop Single': "'Bitcount Prop Single', 'Pixelify Sans', 'Silkscreen', cursive",
  'Rubik Spray Paint': "'Rubik Spray Paint', cursive",
  'Merriweather': "'Merriweather', serif",
  'Oswald': "'Oswald', sans-serif",
  'Edu VIC WA NT Hand Precursive': "'Edu VIC WA NT Hand Precursive', cursive",
  'Inconsolata': "'Inconsolata', monospace",
  'JetBrains Mono': "'JetBrains Mono', monospace",
  'Dancing Script': "'Dancing Script', cursive",
  'Caveat': "'Caveat', cursive",
  'Archivo Black': "'Archivo Black', sans-serif",
  'Black Ops One': "'Black Ops One', display",
  'Saira': "'Saira', sans-serif",
  'Changa One': "'Changa One', display",
  'Orbitron': "'Orbitron', sans-serif",
  'Indie Flower': "'Indie Flower', cursive"
};

const formatUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

const formatPhoneUrl = (phone) => {
  if (!phone) return '';
  const digits = phone.replace(/[^0-9+]/g, '');
  return `tel:${digits}`;
};

export default function ContactElement({ data, textColor }) {
  if (!data) return null;

  const {
    sectionTitle,
    email,
    phone,
    website,
    location,
    fontSize = 'medium',
    fontColor = '',
    isBold = false,
    isItalic = false,
    isUnderline = false,
    fontFamily = 'Inter'
  } = data;

  const hasEmail = email && email.trim() !== '';
  const hasPhone = phone && phone.trim() !== '';
  const hasWebsite = website && website.trim() !== '';
  const hasLocation = location && location.trim() !== '';

  const isAllEmpty = !hasEmail && !hasPhone && !hasWebsite && !hasLocation;

  if (isAllEmpty) {
    return (
      <div className="w-full py-4 px-3 border border-dashed border-slate-300 rounded-xl text-center text-slate-400 text-xs">
        Empty contact block. Click edit to enter your contact details.
      </div>
    );
  }

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-[11px] sm:text-xs';
      case 'large':
        return 'text-sm sm:text-base';
      case 'xlarge':
        return 'text-base sm:text-lg';
      case 'medium':
      default:
        return 'text-xs sm:text-sm';
    }
  };

  const getCustomStyle = () => {
    const selectedFamily = FONT_MAP[fontFamily] || 'inherit';
    const effectiveColor = fontColor || textColor || 'inherit';

    return {
      fontFamily: selectedFamily,
      color: effectiveColor,
      fontWeight: isBold ? '700' : '600',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      wordBreak: 'break-word'
    };
  };

  return (
    <div className="w-full flex flex-col items-center py-2 px-1">
      {sectionTitle && (
        <h4
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 text-center opacity-80"
          style={getCustomStyle()}
        >
          {sectionTitle}
        </h4>
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Email */}
        {hasEmail && (
          <a
            href={`mailto:${email.trim()}`}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-transparent hover:border-indigo-400 transition-all group"
          >
            {/* Intact Material Symbol Icon */}
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">mail</span>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden" style={getCustomStyle()}>
              <span className="text-[10px] uppercase font-semibold leading-tight opacity-60">
                Email
              </span>
              <span className={`font-semibold truncate leading-snug ${getFontSizeClass()}`}>
                {email}
              </span>
            </div>
          </a>
        )}

        {/* Contact / WhatsApp Phone */}
        {hasPhone && (
          <a
            href={formatPhoneUrl(phone)}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-transparent hover:border-emerald-400 transition-all group"
          >
            {/* Intact Material Symbol Icon */}
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">call</span>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden" style={getCustomStyle()}>
              <span className="text-[10px] uppercase font-semibold leading-tight opacity-60">
                Phone / WhatsApp
              </span>
              <span className={`font-semibold truncate leading-snug ${getFontSizeClass()}`}>
                {phone}
              </span>
            </div>
          </a>
        )}

        {/* Portfolio Website */}
        {hasWebsite && (
          <a
            href={formatUrl(website)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-transparent hover:border-blue-400 transition-all group"
          >
            {/* Intact Material Symbol Icon */}
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">language</span>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden" style={getCustomStyle()}>
              <span className="text-[10px] uppercase font-semibold leading-tight opacity-60">
                Portfolio Website
              </span>
              <span className={`font-semibold truncate leading-snug ${getFontSizeClass()}`}>
                {website.replace(/^https?:\/\//, '')}
              </span>
            </div>
          </a>
        )}

        {/* Location */}
        {hasLocation && (
          <div
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-transparent hover:border-rose-400 transition-all group cursor-default"
          >
            {/* Intact Material Symbol Icon */}
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">location_on</span>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden" style={getCustomStyle()}>
              <span className="text-[10px] uppercase font-semibold leading-tight opacity-60">
                Location
              </span>
              <span className={`font-semibold truncate leading-snug ${getFontSizeClass()}`}>
                {location}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
