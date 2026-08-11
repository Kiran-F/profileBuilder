import React, { useState } from 'react';
import { getYoutubeEmbedUrl } from '../ProfileElements/YoutubeElement';

export default function EditYoutubeModal({ element, onSave, onClose }) {
  const [title, setTitle] = useState(element.data.title || '');
  const [videoUrl, setVideoUrl] = useState(element.data.videoUrl || '');

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      title,
      videoUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 text-red-600 material-symbols-outlined text-xl">
              play_circle
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit YouTube Video
              </h3>
              <p className="text-xs text-slate-500">
                Embed YouTube video on your portfolio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Video Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Video Heading Title (Optional)
            </legend>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Portfolio Showcase Video"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* YouTube Video URL */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              YouTube Video Link URL
            </legend>
            <input
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>
          <p className="text-[10px] text-slate-400 px-1 -mt-2">
            Supports YouTube links e.g. <span className="font-mono text-indigo-600">youtube.com/watch?v=...</span> or <span className="font-mono text-indigo-600">youtu.be/...</span>
          </p>

          {/* Live Video Preview Box */}
          <div className="mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Live Preview:
            </span>
            <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Live YouTube Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                  <span className="material-symbols-outlined text-3xl mb-1 text-slate-500">
                    movie
                  </span>
                  <span className="text-xs">Paste YouTube link to see video preview</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
