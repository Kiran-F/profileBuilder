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

export function buildShadowStyle(size, color = '#0f172a') {
  if (size === 'none') return 'none';
  const c = color || '#0f172a';
  switch (size) {
    case 'small':
      return `0 6px 20px 2px ${c}66`;
    case 'large':
      return `0 20px 45px 6px ${c}b3`;
    case 'glow':
      return `0 0 32px 8px ${c}cc`;
    case 'medium':
    default:
      return `0 12px 30px 4px ${c}8c`;
  }
}

export function buildDropShadowFilter(size, color = '#0f172a') {
  if (size === 'none') return 'none';
  const c = color || '#0f172a';
  switch (size) {
    case 'small':
      return `drop-shadow(0px 6px 14px ${c}66)`;
    case 'large':
      return `drop-shadow(0px 18px 32px ${c}b3)`;
    case 'glow':
      return `drop-shadow(0px 0px 24px ${c}cc)`;
    case 'medium':
    default:
      return `drop-shadow(0px 10px 22px ${c}8c)`;
  }
}

export default function IdentityElement({ data, textColor }) {
  const {
    avatarUrl,
    name,
    firstName,
    lastName,
    jobTitle,
    designation,
    department,
    companyName,
    avatarShape = 'circle',
    avatarBorderColor = '#ffffff',
    avatarBorderWidth = 4,
    avatarShadowSize = 'medium',
    avatarShadowColor = '#0f172a',
    fontSize = 'medium',
    fontColor = '',
    isBold = false,
    isItalic = false,
    isUnderline = false,
    fontFamily = 'Inter'
  } = data || {};

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || name;
  const titleAndDesignation = [jobTitle, designation].filter(Boolean).join(' • ');
  const departmentAndCompany = [department, companyName].filter(Boolean).join(' at ');

  const hasWorkInfo = titleAndDesignation || departmentAndCompany;

  const isPolygonShape = [
    'triangle',
    'pentagon',
    'hexagon',
    'heptagon',
    'octagon',
    'nonagon',
    'decagon',
    'burst-12'
  ].includes(avatarShape);

  const getOuterShapeClass = () => {
    switch (avatarShape) {
      case 'square':
        return 'w-28 h-28 sm:w-32 sm:h-32 rounded-2xl';
      case 'square-sharp':
        return 'w-28 h-28 sm:w-32 sm:h-32 rounded-none';
      case 'triangle':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]';
      case 'pentagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]';
      case 'hexagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]';
      case 'heptagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_90%_20%,_100%_60%,_75%_100%,_25%_100%,_0%_60%,_10%_20%)]';
      case 'octagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(30%_0%,_70%_0%,_100%_30%,_100%_70%,_70%_100%,_30%_100%,_0%_70%,_0%_30%)]';
      case 'nonagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_83%_12%,_100%_43%,_94%_78%,_68%_100%,_32%_100%,_6%_78%,_0%_43%,_17%_12%)]';
      case 'decagon':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_65%,_80%_90%,_50%_100%,_20%_90%,_0%_65%,_0%_35%,_20%_10%)]';
      case 'burst-12':
        return 'w-28 h-28 sm:w-32 sm:h-32 [clip-path:polygon(50%_0%,_61%_14%,_78%_6%,_82%_23%,_97%_25%,_93%_42%,_100%_57%,_89%_70%,_91%_87%,_74%_88%,_66%_100%,_50%_92%,_34%_100%,_26%_88%,_9%_87%,_11%_70%,_0%_57%,_7%_42%,_3%_25%,_18%_23%,_22%_6%,_39%_14%)]';
      case 'tv-screen':
        return 'w-36 h-28 sm:w-40 sm:h-30 rounded-[35px/24px]';
      case 'oval-h':
        return 'w-36 h-24 sm:w-40 sm:h-28 rounded-full';
      case 'oval-v':
        return 'w-24 h-36 sm:w-28 sm:h-40 rounded-full';
      case 'rectangle':
        return 'w-36 h-24 sm:w-40 sm:h-28 rounded-2xl';
      case 'circle':
      default:
        return 'w-28 h-28 sm:w-32 sm:h-32 rounded-full';
    }
  };

  const getInnerShapeClass = () => {
    switch (avatarShape) {
      case 'square':
        return 'rounded-xl';
      case 'square-sharp':
        return 'rounded-none';
      case 'triangle':
        return '[clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]';
      case 'pentagon':
        return '[clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]';
      case 'hexagon':
        return '[clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]';
      case 'heptagon':
        return '[clip-path:polygon(50%_0%,_90%_20%,_100%_60%,_75%_100%,_25%_100%,_0%_60%,_10%_20%)]';
      case 'octagon':
        return '[clip-path:polygon(30%_0%,_70%_0%,_100%_30%,_100%_70%,_70%_100%,_30%_100%,_0%_70%,_0%_30%)]';
      case 'nonagon':
        return '[clip-path:polygon(50%_0%,_83%_12%,_100%_43%,_94%_78%,_68%_100%,_32%_100%,_6%_78%,_0%_43%,_17%_12%)]';
      case 'decagon':
        return '[clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_65%,_80%_90%,_50%_100%,_20%_90%,_0%_65%,_0%_35%,_20%_10%)]';
      case 'burst-12':
        return '[clip-path:polygon(50%_0%,_61%_14%,_78%_6%,_82%_23%,_97%_25%,_93%_42%,_100%_57%,_89%_70%,_91%_87%,_74%_88%,_66%_100%,_50%_92%,_34%_100%,_26%_88%,_9%_87%,_11%_70%,_0%_57%,_7%_42%,_3%_25%,_18%_23%,_22%_6%,_39%_14%)]';
      case 'tv-screen':
        return 'rounded-[30px/20px]';
      case 'oval-h':
      case 'oval-v':
      case 'circle':
        return 'rounded-full';
      case 'rectangle':
        return 'rounded-xl';
      default:
        return 'rounded-full';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small':
        return 'text-lg sm:text-xl';
      case 'large':
        return 'text-2xl sm:text-3xl';
      case 'xlarge':
        return 'text-3xl sm:text-4xl';
      case 'medium':
      default:
        return 'text-xl sm:text-2xl';
    }
  };

  const getCustomStyle = () => {
    const selectedFamily = FONT_MAP[fontFamily] || 'inherit';
    const effectiveColor = fontColor || textColor || 'inherit';

    return {
      fontFamily: selectedFamily,
      color: effectiveColor,
      fontWeight: isBold ? '800' : '700',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      wordBreak: 'break-word'
    };
  };

  return (
    <div className="flex flex-col items-center justify-center text-center w-full mt-2">
      {/* Profile Picture Avatar */}
      <div className="relative mb-6 flex justify-center">
        {isPolygonShape ? (
          /* Unclipped Outer Wrapper carrying CSS filter: drop-shadow(...) */
          <div
            style={{
              filter: buildDropShadowFilter(avatarShadowSize, avatarShadowColor)
            }}
            className="relative flex items-center justify-center transition-all duration-300"
          >
            {/* Polygon Clipped Border Container */}
            <div
              style={{
                backgroundColor: avatarBorderWidth > 0 ? avatarBorderColor : 'transparent',
                padding: `${avatarBorderWidth}px`
              }}
              className={`transition-all duration-300 flex items-center justify-center ${getOuterShapeClass()}`}
            >
              {/* Inner Photo Frame */}
              <div className={`w-full h-full overflow-hidden bg-slate-100 flex items-center justify-center ${getInnerShapeClass()}`}>
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName || 'Profile Photo'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Standard Rounded Border & Shadow Container */
          <div
            style={{
              backgroundColor: avatarBorderWidth > 0 ? avatarBorderColor : 'transparent',
              padding: `${avatarBorderWidth}px`,
              boxShadow: buildShadowStyle(avatarShadowSize, avatarShadowColor)
            }}
            className={`transition-all duration-300 flex items-center justify-center ${getOuterShapeClass()}`}
          >
            <div className={`w-full h-full overflow-hidden bg-slate-100 flex items-center justify-center ${getInnerShapeClass()}`}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName || 'Profile Photo'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Profile Full Name */}
      <h1
        className={`font-bold tracking-tight mb-1 transition-all ${getFontSizeClass()}`}
        style={getCustomStyle()}
      >
        {fullName || <span className="text-slate-400 italic text-base font-normal">Add Name & Photo...</span>}
      </h1>

      {/* Job Title & Designation */}
      {titleAndDesignation && (
        <h2
          className="text-xs sm:text-sm font-semibold opacity-90 mb-0.5"
          style={getCustomStyle()}
        >
          {titleAndDesignation}
        </h2>
      )}

      {/* Department & Company */}
      {departmentAndCompany && (
        <p
          className="text-xs font-medium opacity-75"
          style={getCustomStyle()}
        >
          {departmentAndCompany}
        </p>
      )}

      {!fullName && !hasWorkInfo && (
        <p className="text-xs text-slate-400 mt-1">Click edit to enter your profile information.</p>
      )}
    </div>
  );
}
