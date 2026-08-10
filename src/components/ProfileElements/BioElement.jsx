import React from 'react';

export default function BioElement({ data, textColor }) {
  const { bioLines, bioText } = data || {};

  let lines = bioLines;
  if (!lines && bioText) {
    lines = bioText.split('\n').filter(Boolean);
  }

  if (!lines || lines.length === 0) {
    return (
      <div className="w-full text-center my-2 text-slate-400 italic text-sm">
        Add Roles / Bio Description...
      </div>
    );
  }

  return (
    <div className="w-full text-center my-2">
      <div
        className="flex flex-col items-center justify-center gap-1 text-sm font-medium opacity-90"
        style={textColor ? { color: textColor } : {}}
      >
        {lines.map((line, idx) => (
          <p
            key={idx}
            className={idx === lines.length - 1 && lines.length > 2 ? 'mt-2 text-xs opacity-75' : ''}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
