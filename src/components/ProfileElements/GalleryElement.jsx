import React, { useState } from 'react';

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
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'https://' || trimmed === 'http://') return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
};

export default function GalleryElement({ data, textColor }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) return null;

  const {
    sectionTitle = '',
    items = [],
    layoutStyle = 'grid',
    imageAspect = 'landscape',
    imageRadius = 'rounded-2xl',
    hasShadow = true,
    shadowColor = '#000000',
    fontSize = 'medium',
    fontFamily = 'Inter',
    fontColor = '#0f172a',
    isBold = true,
    isItalic = false
  } = data;

  const validItems = items.filter((item) => item.image || item.title);

  if (validItems.length === 0) {
    return (
      <div className="w-full py-6 px-4 border border-dashed border-slate-300 rounded-2xl text-center text-slate-400 text-xs">
        <span className="material-symbols-outlined text-3xl mb-1 text-slate-300 block">photo_library</span>
        No images or certificates added yet. Click edit to upload images & add optional labels.
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : validItems.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < validItems.length - 1 ? prev + 1 : 0));
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-base sm:text-lg';
      case 'xlarge':
        return 'text-lg sm:text-xl';
      case 'medium':
      default:
        return 'text-sm';
    }
  };

  const getCustomTextStyle = () => {
    const selectedFamily = FONT_MAP[fontFamily] || 'inherit';
    return {
      fontFamily: selectedFamily,
      color: fontColor || '#0f172a',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal'
    };
  };

  const getAspectClass = () => {
    switch (imageAspect) {
      case 'square':
        return 'aspect-square object-cover';
      case 'portrait':
        return 'aspect-[3/4] object-cover';
      case 'natural':
        return 'h-auto object-contain';
      case 'landscape':
      default:
        return 'aspect-[4/3] object-cover';
    }
  };

  const getItemCardShadow = () => {
    if (!hasShadow) return 'none';
    return `0px 4px 12px ${shadowColor ? shadowColor + '25' : 'rgba(0,0,0,0.1)'}`;
  };

  const renderCardInnerContent = (item) => (
    <>
      {/* Image Container */}
      {item.image ? (
        <div className="w-full bg-slate-100 overflow-hidden relative">
          <img
            src={item.image}
            alt={item.title || 'Gallery image'}
            className={`w-full transition-transform duration-300 group-hover:scale-105 ${getAspectClass()}`}
          />
        </div>
      ) : (
        <div className={`w-full bg-slate-100 flex items-center justify-center text-slate-300 ${getAspectClass()}`}>
          <span className="material-symbols-outlined text-4xl">image</span>
        </div>
      )}

      {/* Optional Label / Caption Heading */}
      {item.title && (
        <div className="p-3.5 text-center bg-white">
          <h5 className={`leading-snug truncate ${getFontSizeClass()}`} style={getCustomTextStyle()}>
            {item.title}
          </h5>
        </div>
      )}
    </>
  );

  const renderImageCard = (item) => {
    if (!item) return null;
    const targetUrl = formatUrl(item.linkUrl);

    return (
      <div
        key={item.id}
        style={{ boxShadow: getItemCardShadow() }}
        className={`group bg-white border border-slate-200/80 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${imageRadius}`}
      >
        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full no-underline outline-none border-none text-inherit cursor-pointer"
          >
            {renderCardInnerContent(item)}
          </a>
        ) : (
          renderCardInnerContent(item)
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center py-3 px-1">
      {/* Optional Section Heading */}
      {sectionTitle && (
        <h4
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-3.5 text-center opacity-80"
          style={{ color: textColor }}
        >
          {sectionTitle}
        </h4>
      )}

      {/* Grid Layout */}
      {layoutStyle === 'grid' && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl">
          {validItems.map((item) => renderImageCard(item))}
        </div>
      )}

      {/* Carousel Layout with Left & Right Arrows (Clean Single Certificate Display) */}
      {layoutStyle === 'scroll' && (
        <div className="w-full flex flex-col items-center max-w-xl">
          <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3.5 relative">
            {/* Left Arrow Button */}
            {validItems.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white border border-slate-200 shadow-md text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 z-10"
                title="Previous Image"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
              </button>
            )}

            {/* Main Active Clean Card */}
            <div className="flex-1 min-w-0 transition-all duration-300">
              {renderImageCard(validItems[activeIndex] || validItems[0])}
            </div>

            {/* Right Arrow Button */}
            {validItems.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white border border-slate-200 shadow-md text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 z-10"
                title="Next Image"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
              </button>
            )}
          </div>

          {/* Pagination Indicators / Dots */}
          {validItems.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-3.5">
              {validItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-indigo-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Stacked Vertical Rows Layout */}
      {layoutStyle === 'stacked' && (
        <div className="w-full flex flex-col gap-4 max-w-xl">
          {validItems.map((item) => renderImageCard(item))}
        </div>
      )}
    </div>
  );
}
