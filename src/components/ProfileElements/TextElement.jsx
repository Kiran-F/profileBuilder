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

export default function TextElement({ data, textColor }) {
  if (!data) return null;

  const {
    heading,
    content,
    alignment = 'center',
    fontSize = 'medium',
    fontColor = '',
    isBold = false,
    isItalic = false,
    isUnderline = false,
    fontFamily = 'Inter'
  } = data;

  const getAlignClass = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      case 'center':
      default:
        return 'text-center items-center';
    }
  };

  const getContentFontClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-xs sm:text-sm leading-relaxed';
      case 'large':
        return 'text-base sm:text-lg leading-relaxed';
      case 'xlarge':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'medium':
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
  };

  const getCustomStyle = () => {
    const selectedFamily = FONT_MAP[fontFamily] || 'inherit';
    const effectiveColor = fontColor || textColor || 'inherit';

    return {
      fontFamily: selectedFamily,
      color: effectiveColor,
      fontWeight: isBold ? '700' : '400',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      wordBreak: 'break-word',
      textAlign: alignment
    };
  };

  const hasHeading = heading && heading.trim() !== '';
  const hasContent = content && content.trim() !== '';

  if (!hasHeading && !hasContent) {
    return (
      <div className="w-full py-4 px-3 border border-dashed border-slate-300 rounded-xl text-center text-slate-400 text-xs">
        Empty text block. Click edit to add custom text.
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col ${getAlignClass()} py-2 px-1 space-y-1.5 transition-all`}
      style={getCustomStyle()}
    >
      {hasHeading && (
        <h3 className="text-base sm:text-lg font-bold tracking-wide mb-0.5">
          {heading}
        </h3>
      )}

      {hasContent && (
        <p className={`w-full whitespace-pre-line opacity-90 ${getContentFontClass()}`}>
          {content}
        </p>
      )}
    </div>
  );
}
