import React from 'react';

export default function BadgesElement({ data, textColor }) {
  if (!data) return null;

  const { sectionTitle, items = [] } = data;

  // Filter out any badge credentials that are completely empty (no image, title, or link)
  const validItems = items.filter((badge) => {
    const hasImage = badge.imageUrl && badge.imageUrl.trim() !== '';
    const hasTitle = badge.title && badge.title.trim() !== '';
    const hasLink = badge.linkUrl && badge.linkUrl.trim() !== '';
    return hasImage || hasTitle || hasLink;
  });

  if (validItems.length === 0) {
    return (
      <div className="w-full py-4 px-3 border border-dashed border-slate-300 rounded-xl text-center text-slate-400 text-xs">
        No badges added yet. Click edit to add badges.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-2 px-1">
      {sectionTitle && (
        <h4
          className="text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 text-center opacity-80"
          style={{ color: textColor }}
        >
          {sectionTitle}
        </h4>
      )}

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-full">
        {validItems.map((badge) => {
          const BadgeCard = (
            <div
              key={badge.id}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200/90 shadow-xs p-2.5 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-300">
                {badge.imageUrl ? (
                  <img
                    src={badge.imageUrl}
                    alt={badge.title || 'Badge'}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-indigo-500">
                    workspace_premium
                  </span>
                )}
              </div>
              {badge.title && (
                <span
                  className="text-xs sm:text-sm font-semibold text-center truncate max-w-[96px] sm:max-w-[128px] opacity-90"
                  style={{ color: textColor }}
                  title={badge.title}
                >
                  {badge.title}
                </span>
              )}
            </div>
          );

          if (badge.linkUrl && badge.linkUrl.trim() !== '') {
            return (
              <a
                key={badge.id}
                href={badge.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                {BadgeCard}
              </a>
            );
          }

          return BadgeCard;
        })}
      </div>
    </div>
  );
}
