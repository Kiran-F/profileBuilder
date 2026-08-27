import React from 'react';

export function getYoutubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Match YouTube Video IDs (11 alphanumeric chars including _ and -)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}`;
  }

  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('youtube-nocookie.com/embed/')) {
    return trimmed;
  }

  return null;
}

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

export default function YoutubeElement({ data, textColor, isPreview = false }) {
  if (!data) return null;

  const {
    title,
    videoUrl,
    borderWidth = 2,
    borderColor = '#ffffff',
    shadowSize = 'medium',
    shadowColor = '#0f172a'
  } = data;

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  return (
    <div className="w-full flex flex-col items-center py-2 px-1">
      {title && (
        <h4
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-3 text-center opacity-80"
          style={{ color: textColor }}
        >
          {title}
        </h4>
      )}

      {/* Video Outer Border & Shadow Frame Container */}
      <div
        style={{
          backgroundColor: borderWidth > 0 ? borderColor : 'transparent',
          padding: `${borderWidth}px`,
          boxShadow: buildShadowStyle(shadowSize, shadowColor)
        }}
        className="w-full aspect-video rounded-2xl transition-all duration-300 flex items-center justify-center"
      >
        {/* Inner Video Container */}
        <div className="w-full h-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || 'YouTube Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className={`w-full h-full border-0 ${!isPreview ? 'pointer-events-none' : ''}`}
            ></iframe>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 text-indigo-400">
                play_circle
              </span>
              <p className="text-xs font-semibold text-slate-300">No valid YouTube Video URL added</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Click edit to paste a YouTube video link</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
