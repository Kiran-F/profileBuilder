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

export const GRADIENT_PRESETS = {
  'indigo-purple': 'linear-gradient(135deg, #4648d4 0%, #8b5cf6 100%)',
  'emerald-teal': 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
  'sunset-orange': 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)',
  'midnight-dark': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
  'rose-pink': 'linear-gradient(135deg, #ec4899 0%, #831843 100%)',
  'gold-amber': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
};

export default function BannerElement({ data }) {
  if (!data) return null;

  const {
    bannerType = 'gradient',
    imageUrl = '',
    gradientPreset = 'indigo-purple',
    bgColor = '#4648d4',
    bannerHeight = 'medium',
    bannerRadius = 'rounded-2xl',
    title = '',
    fontSize = 'medium',
    fontFamily = 'Inter',
    textColor = '#ffffff',
    isBold = true,
    isItalic = false,
    hasOverlay = true
  } = data;

  const getHeightClass = () => {
    switch (bannerHeight) {
      case 'compact':
        return 'h-24 sm:h-28';
      case 'tall':
        return 'h-48 sm:h-56';
      case 'medium':
      default:
        return 'h-36 sm:h-44';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-xs sm:text-sm';
      case 'large':
        return 'text-lg sm:text-xl';
      case 'xlarge':
        return 'text-xl sm:text-2xl';
      case 'medium':
      default:
        return 'text-sm sm:text-base';
    }
  };

  const getCustomTextStyle = () => {
    const selectedFamily = FONT_MAP[fontFamily] || 'inherit';
    return {
      fontFamily: selectedFamily,
      color: textColor || '#ffffff',
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal'
    };
  };

  const getBannerBackgroundStyle = () => {
    if (bannerType === 'image' && imageUrl) {
      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    if (GRADIENT_PRESETS[gradientPreset]) {
      return {
        background: GRADIENT_PRESETS[gradientPreset]
      };
    }

    return {
      backgroundColor: bgColor || '#4648d4'
    };
  };

  return (
    <div className="w-full pb-2 select-none">
      <div
        style={getBannerBackgroundStyle()}
        className={`w-full relative overflow-hidden flex items-end justify-center p-4 sm:p-5 shadow-sm transition-all duration-300 ${getHeightClass()} ${bannerRadius}`}
      >
        {/* Dark subtle overlay for text legibility if text exists */}
        {title && hasOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
        )}

        {/* Text Overlay Headline */}
        {title && (
          <div className="relative z-10 text-center max-w-lg w-full drop-shadow-md">
            <h3 className={`leading-snug px-2 truncate ${getFontSizeClass()}`} style={getCustomTextStyle()}>
              {title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
