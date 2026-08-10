import React from 'react';

export default function IdentityElement({ data, textColor }) {
  const { avatarUrl, name } = data || {};

  return (
    <div className="flex flex-col items-center justify-center text-center w-full mt-4">
      {/* Profile Picture Avatar */}
      <div className="relative mb-4 flex justify-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-200/60 bg-slate-100 flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name || 'Profile Photo'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <span className="material-symbols-outlined text-5xl text-slate-400">person</span>
          )}
        </div>
      </div>

      {/* Profile Name */}
      <h1
        className="text-2xl font-bold tracking-normal mb-1"
        style={textColor ? { color: textColor } : {}}
      >
        {name || <span className="text-slate-400 italic text-lg font-normal">Add Name & Photo...</span>}
      </h1>
    </div>
  );
}
