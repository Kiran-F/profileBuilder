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

export default function BadgesElement({ data, textColor, isPreview = false }) {
  if (!data) return null;

  const {
    sectionTitle,
    items = [],
    fontSize = 'medium',
    fontColor = '',
    isBold = false,
    isItalic = false,
    isUnderline = false,
    fontFamily = 'Inter'
  } = data;

  // Filter out any badge credentials that are completely empty (no image, title, or link)
  const validItems = items.filter((badge) => {
    const hasImage = badge.imageUrl && badge.imageUrl.trim() !== '';
    const hasTitle = badge.title && badge.title.trim() !== '';
    const hasLink = badge.linkUrl && badge.linkUrl.trim() !== '';
    return hasImage || hasTitle || hasLink;
  });

  if (validItems.length === 0) {
    return (
      <div className="w-full py-4 px-3 border border-dashed border-slate-300 rounded-xl text-center text-slate-400 text-xs">
        No badges added yet. Click edit to add badges.
      </div>
    );
  }

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
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 text-center opacity-80"
          style={getCustomStyle()}
        >
          {sectionTitle}
        </h4>
      )}

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-full">
        {validItems.map((badge) => {
          const BadgeCard = (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-2.5 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-300">
                {badge.imageUrl ? (
                  <img
                    src={badge.imageUrl}
                    alt={badge.title || 'Badge'}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-500">
                    workspace_premium
                  </span>
                )}
              </div>
              {badge.title && (
                <span
                  className={`text-center truncate max-w-[96px] sm:max-w-[128px] opacity-90 transition-all ${getFontSizeClass()}`}
                  style={getCustomStyle()}
                  title={badge.title}
                >
                  {badge.title}
                </span>
              )}
            </div>
          );

          if (badge.linkUrl && badge.linkUrl.trim() !== '') {
            return (
              <a
                key={badge.id}
                href={isPreview ? badge.linkUrl : 'javascript:void(0)'}
                target={isPreview ? '_blank' : '_self'}
                rel={isPreview ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!isPreview) {
                    e.preventDefault();
                  }
                }}
                title={!isPreview ? 'Verification link active on Preview page' : undefined}
                className="no-underline"
              >
                {BadgeCard}
              </a>
            );
          }

          return BadgeCard;
        })}
      </div>
    </div>
  );
}
