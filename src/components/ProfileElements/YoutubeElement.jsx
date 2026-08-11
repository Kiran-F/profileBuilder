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

export default function YoutubeElement({ data, textColor }) {
  if (!data) return null;

  const { title, videoUrl } = data;
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

      <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-950 flex items-center justify-center relative">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title || 'YouTube Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
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
  );
}
