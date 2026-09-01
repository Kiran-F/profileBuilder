import React, { useState } from 'react';
import { FONT_MAP } from '../../constants/fonts';

const formatUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed === 'https://' || trimmed === 'http://') return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
};

function GalleryElement({ data, textColor, isPreview = false }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) return null;

  const {
    sectionTitle = '',
    items = [],
    layoutStyle = 'grid',
    gridCols = 2,
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

  // Image Aspect Ratio Classes:
  // Portrait (4:5 ratio): Height > Width (Height is 1.33x Width)
  const getAspectClass = () => {
    switch (imageAspect) {
      case 'square':
        return 'aspect-square object-cover';
      case 'portrait':
        return 'aspect-[4/5] object-cover object-top';
      case 'natural':
        return 'h-auto max-h-[300px] object-contain';
      case 'landscape':
      default:
        return 'aspect-[16/9] object-cover';
    }
  };

  // Card Width Wrapper based on Aspect Mode:
  // For Portrait: Limit width to 210px-240px so Height (280px-320px) is strictly GREATER than Width!
  const getCardWidthClass = () => {
    switch (imageAspect) {
      case 'portrait':
        return 'w-[250px] sm:w-[290px] mx-auto';
      case 'square':
        return 'w-[220px] sm:w-[260px] mx-auto';
      case 'landscape':
      default:
        return 'w-full max-w-md mx-auto';
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
          <span className="material-symbols-outlined text-3xl">image</span>
        </div>
      )}

      {/* Optional Label / Caption Heading */}
      {item.title && (
        <div className="p-2.5 sm:p-3 text-center bg-white">
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
            href={isPreview ? targetUrl : 'javascript:void(0)'}
            target={isPreview ? '_blank' : '_self'}
            rel={isPreview ? 'noopener noreferrer' : undefined}
            onClick={(e) => {
              if (!isPreview) {
                e.preventDefault();
              }
            }}
            title={!isPreview ? 'Target link active on Preview page' : undefined}
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

  const getGridColsClass = () => {
    switch (gridCols) {
      case 1:
        return 'grid-cols-1 max-w-md';
      case 3:
        return 'grid-cols-2 sm:grid-cols-3 max-w-xl';
      case 4:
        return 'grid-cols-2 sm:grid-cols-4 max-w-2xl';
      case 2:
      default:
        return 'grid-cols-2 max-w-lg';
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-2 px-1">
      {/* Optional Section Heading */}
      {sectionTitle && (
        <h4
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 text-center opacity-80"
          style={{ color: textColor }}
        >
          {sectionTitle}
        </h4>
      )}

      {/* Grid Layout (Supports 1, 2, 3, or 4 columns) */}
      {(layoutStyle === 'grid' || layoutStyle === 'stacked') && (
        <div className={`w-full grid gap-3 sm:gap-4 ${getGridColsClass()}`}>
          {validItems.map((item) => renderImageCard(item))}
        </div>
      )}

      {/* Carousel Layout with Left & Right Arrows */}
      {layoutStyle === 'scroll' && (
        <div className={`w-full flex flex-col items-center ${getCardWidthClass()}`}>
          <div className="w-full flex items-center justify-between gap-2 sm:gap-3 relative">
            {/* Left Arrow Button */}
            {validItems.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white border border-slate-200 shadow-md text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 z-10 -ml-3 sm:-ml-4"
                title="Previous Image"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">chevron_left</span>
              </button>
            )}

            {/* Main Active Compact Card */}
            <div className="flex-1 min-w-0 transition-all duration-300">
              {renderImageCard(validItems[activeIndex] || validItems[0])}
            </div>

            {/* Right Arrow Button */}
            {validItems.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 hover:bg-white border border-slate-200 shadow-md text-slate-700 hover:text-indigo-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer flex-shrink-0 z-10 -mr-3 sm:-mr-4"
                title="Next Image"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">chevron_right</span>
              </button>
            )}
          </div>

          {/* Pagination Indicators / Dots */}
          {validItems.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {validItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx
                      ? 'w-5 bg-indigo-600'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(GalleryElement);
