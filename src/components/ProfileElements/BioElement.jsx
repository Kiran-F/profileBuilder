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

export default function BioElement({ data, textColor }) {
  const {
    bioLines,
    bioText,
    alignment = 'center', // 'left', 'center', 'right'
    fontSize = 'medium',
    fontColor = '',
    isBold = false,
    isItalic = false,
    isUnderline = false,
    fontFamily = 'Inter'
  } = data || {};

  let lines = bioLines;
  if (!lines && bioText) {
    lines = bioText.split('\n').filter(Boolean);
  }

  if (!lines || lines.length === 0) {
    return (
      <div className="w-full text-center my-2 text-slate-400 italic text-sm">
        Click edit to add Bio & Roles...
      </div>
    );
  }

  const getAlignmentClass = () => {
    switch (alignment) {
      case 'left':
        return 'text-left items-start px-2 sm:px-4';
      case 'right':
        return 'text-right items-end px-2 sm:px-4';
      case 'center':
      default:
        return 'text-center items-center px-2 sm:px-4';
    }
  };

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
      fontWeight: isBold ? '700' : '500',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      textAlign: alignment,
      wordBreak: 'break-word',
      overflowWrap: 'anywhere'
    };
  };

  return (
    <div className={`w-full my-2 flex flex-col ${getAlignmentClass()}`}>
      <div
        className={`flex flex-col w-full gap-1 opacity-90 transition-all ${getAlignmentClass()} ${getFontSizeClass()}`}
        style={getCustomStyle()}
      >
        {lines.map((line, idx) => (
          <p
            key={idx}
            className={`w-full break-words max-w-full overflow-hidden ${idx === lines.length - 1 && lines.length > 2 ? 'mt-1.5 opacity-80' : ''}`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
