import React from 'react';

export default function TextElement({ data, textColor }) {
  if (!data) return null;

  const { heading, content, alignment = 'center', fontSize = 'medium' } = data;

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
        return 'text-base sm:text-lg leading-relaxed font-medium';
      case 'medium':
      default:
        return 'text-sm sm:text-base leading-relaxed';
    }
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
    <div className={`w-full flex flex-col ${getAlignClass()} py-2 px-1 space-y-1.5`}>
      {hasHeading && (
        <h3
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{ color: textColor }}
        >
          {heading}
        </h3>
      )}

      {hasContent && (
        <p
          className={`w-full whitespace-pre-line opacity-90 ${getContentFontClass()}`}
          style={{ color: textColor }}
        >
          {content}
        </p>
      )}
    </div>
  );
}
