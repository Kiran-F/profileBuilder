import React from 'react';
import { FONT_MAP } from '../../constants/fonts';

function BioElement({ data, textColor }) {
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

export default React.memo(BioElement);
