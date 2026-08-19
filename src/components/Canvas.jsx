import React, { useState, useEffect } from 'react';
import IdentityElement from './ProfileElements/IdentityElement';
import BioElement from './ProfileElements/BioElement';
import SocialElement from './ProfileElements/SocialElement';
import BadgesElement from './ProfileElements/BadgesElement';
import YoutubeElement from './ProfileElements/YoutubeElement';
import TextElement from './ProfileElements/TextElement';
import ContactElement from './ProfileElements/ContactElement';
import LinksElement from './ProfileElements/LinksElement';
import GalleryElement from './ProfileElements/GalleryElement';
import BannerElement from './ProfileElements/BannerElement';
import { computeProfileBackgroundStyle } from '../utils/backgroundStyles';

export default function Canvas({
  elements,
  cardBgColor = '#ffffff',
  cardBgType = 'solid',
  cardBgGradient = 'sunset-fire',
  customGradientStart = '#ff416c',
  customGradientEnd = '#ff4b2b',
  textColor = '#191c1e',
  onReorderElements,
  onAddElementAtIndex,
  onEditElement,
  onDeleteElement
}) {
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isCanvasDragOver, setIsCanvasDragOver] = useState(false);

  useEffect(() => {
    const handleGlobalRelease = () => {
      if (window.__draggedSidebarType) {
        setTimeout(() => {
          window.__draggedSidebarType = null;
          window.__draggedSource = null;
          setDropTargetIndex(null);
          setIsCanvasDragOver(false);
        }, 50);
      }
    };
    window.addEventListener('mouseup', handleGlobalRelease);
    window.addEventListener('touchend', handleGlobalRelease);
    return () => {
      window.removeEventListener('mouseup', handleGlobalRelease);
      window.removeEventListener('touchend', handleGlobalRelease);
    };
  }, []);

  const getDraggedType = (e) => {
    if (window.__draggedSidebarType) {
      return window.__draggedSidebarType;
    }
    if (e && e.dataTransfer) {
      try {
        const text = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('application/x-profile-block');
        if (text && (text === 'identity' || text === 'bio' || text === 'social' || text === 'badges' || text === 'youtube' || text === 'text' || text === 'contact' || text === 'links' || text === 'gallery' || text === 'banner')) {
          return text;
        }
      } catch (err) { }
    }
    return null;
  };

  const bannerExists = elements.some((e) => e.type === 'banner');
  const identityExists = elements.some((e) => e.type === 'identity');
  const fixedCount = (bannerExists ? 1 : 0) + (identityExists ? 1 : 0);

  const handleMoveUp = (index) => {
    if (index <= fixedCount) return;

    const updated = [...elements];
    const [item] = updated.splice(index, 1);
    updated.splice(index - 1, 0, item);
    onReorderElements(updated);
  };

  const handleMoveDown = (index) => {
    if (index < fixedCount || index >= elements.length - 1) return;

    const updated = [...elements];
    const [item] = updated.splice(index, 1);
    updated.splice(index + 1, 0, item);
    onReorderElements(updated);
  };

  const handleLineDragOver = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setDropTargetIndex(targetIdx);
  };

  const handleItemDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleCanvasDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsCanvasDragOver(false);
      setDropTargetIndex(null);
    }
  };

  const handleDropAtPosition = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanvasDragOver(false);

    const sidebarType = getDraggedType(e);
    // If dragging a top banner element, ALWAYS lock position to index 0!
    let insertPosition = sidebarType === 'banner' ? 0 : (targetIdx !== undefined ? targetIdx : (dropTargetIndex !== null ? dropTargetIndex : elements.length));

    if (sidebarType && (sidebarType === 'identity' || sidebarType === 'bio' || sidebarType === 'social' || sidebarType === 'badges' || sidebarType === 'youtube' || sidebarType === 'text' || sidebarType === 'contact' || sidebarType === 'links' || sidebarType === 'gallery' || sidebarType === 'banner')) {
      onAddElementAtIndex(sidebarType, insertPosition);
    }

    setDropTargetIndex(null);
    window.__draggedSidebarType = null;
    window.__draggedSource = null;
  };

  const renderElementBody = (elem, index) => {
    switch (elem.type) {
      case 'banner':
        return <BannerElement data={elem.data} />;
      case 'identity':
        return <IdentityElement data={elem.data} textColor={textColor} hasBannerAbove={index > 0 && elements[index - 1]?.type === 'banner'} />;
      case 'bio':
        return <BioElement data={elem.data} textColor={textColor} />;
      case 'social':
        return <SocialElement data={elem.data} />;
      case 'badges':
        return <BadgesElement data={elem.data} textColor={textColor} />;
      case 'youtube':
        return <YoutubeElement data={elem.data} textColor={textColor} />;
      case 'text':
        return <TextElement data={elem.data} textColor={textColor} />;
      case 'contact':
        return <ContactElement data={elem.data} textColor={textColor} />;
      case 'links':
        return <LinksElement data={elem.data} textColor={textColor} />;
      case 'gallery':
        return <GalleryElement data={elem.data} textColor={textColor} />;
      default:
        return null;
    }
  };

  const profileBgStyle = computeProfileBackgroundStyle({
    bgType: cardBgType,
    bgColor: cardBgColor,
    bgGradient: cardBgGradient,
    customGradientStart,
    customGradientEnd
  });

  return (
    <main
      onDragOver={(e) => handleLineDragOver(e, elements.length)}
      onDragLeave={handleCanvasDragLeave}
      onDrop={(e) => handleDropAtPosition(e, elements.length)}
      onMouseUp={(e) => {
        if (window.__draggedSidebarType) {
          handleDropAtPosition(e, dropTargetIndex !== null ? dropTargetIndex : elements.length);
        }
      }}
      className="flex-1 ml-0 sm:ml-44 md:ml-60 bg-[#f7f9fb] p-2 sm:p-4 md:p-8 pb-28 sm:pb-8 flex justify-center items-start overflow-y-auto min-h-screen select-none transition-all duration-200"
    >
      {/* Central Profile Card Container */}
      <div
        style={{ ...profileBgStyle, color: textColor }}
        onDragOver={(e) => handleLineDragOver(e, elements.length)}
        onDragLeave={handleCanvasDragLeave}
        onDrop={(e) => handleDropAtPosition(e, elements.length)}
        onMouseUp={(e) => {
          if (window.__draggedSidebarType) {
            handleDropAtPosition(e, dropTargetIndex !== null ? dropTargetIndex : elements.length);
          }
        }}
        className={`w-full max-w-none rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border transition-all p-3 sm:p-6 md:p-12 flex flex-col items-center relative min-h-[500px] sm:min-h-[580px] md:min-h-[640px] my-1 sm:my-2 ${isCanvasDragOver
          ? 'border-indigo-500 ring-4 ring-indigo-500/10'
          : 'border-slate-200'
          }`}
      >
        {/* EMPTY CANVAS INITIAL STATE */}
        {elements.length === 0 && (
          <div
            onDragOver={(e) => handleLineDragOver(e, 0)}
            onDrop={(e) => handleDropAtPosition(e, 0)}
            onMouseUp={(e) => {
              if (window.__draggedSidebarType) {
                handleDropAtPosition(e, 0);
              }
            }}
            className={`w-full flex-1 min-h-[380px] sm:min-h-[440px] border border-slate-200/80 bg-grid-pattern rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 text-center transition-all cursor-pointer ${isCanvasDragOver
              ? 'border-indigo-500 bg-indigo-50/40 text-indigo-600 scale-[1.01]'
              : 'bg-white/60 text-slate-700'
              }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100/90 text-slate-600 flex items-center justify-center mb-4 shadow-2xs">
              <span className="material-symbols-outlined text-3xl sm:text-4xl">edit_note</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 max-w-xs leading-snug">
              Your profile canvas is currently empty
            </h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed px-1">
              Drag elements (<span className="font-semibold text-indigo-600">Identity</span>, <span className="font-semibold text-indigo-600">Bio</span>, <span className="font-semibold text-indigo-600">Social</span>, <span className="font-semibold text-indigo-600">Contact</span>) from the menu and drop them here to build your profile!
            </p>
          </div>
        )}

        {/* POPULATED CANVAS ELEMENTS */}
        {elements.map((elem, index) => {
          const showTopLine = dropTargetIndex === index;

          return (
            <React.Fragment key={elem.id}>
              {/* Horizontal Line Drop Indicator before item */}
              {showTopLine && (
                <div
                  onDragOver={(e) => handleLineDragOver(e, index)}
                  onDrop={(e) => handleDropAtPosition(e, index)}
                  className="w-full my-2 flex items-center gap-2 transition-all cursor-pointer z-10"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
                  <div className="flex-1 h-1 bg-indigo-600 rounded-full shadow-xs"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
                </div>
              )}

              <div
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleDropAtPosition(e, dropTargetIndex !== null ? dropTargetIndex : index)}
                className="relative w-full group element-wrapper p-3 sm:p-4 pt-6 sm:pt-7 rounded-xl transition-all border border-slate-200/80 hover:border-indigo-400 bg-white/10 my-1.5 cursor-default"
              >
                {/* 1. LEFT TYPE BADGE (GLASSMORPHIC) */}
                <div
                  className="element-controls absolute top-1.5 left-1.5 md:top-2 md:left-2 flex items-center gap-1.5 z-30 bg-white/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/70 shadow-xs opacity-100 transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  <span className="text-[8px] md:text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-800">
                    {elem.type}
                  </span>
                </div>

                {/* 2. RIGHT CONTROLS TOOLBAR (GLASSMORPHIC & COMPACT ICONS) */}
                <div className="element-controls absolute top-1.5 right-1.5 md:top-2 md:right-2 flex items-center gap-0.5 z-30 bg-white/65 backdrop-blur-md p-0.5 sm:p-1 rounded-lg border border-white/80 shadow-xs opacity-100 transition-all hover:bg-white/80">
                  {/* Fixed position badge for Banner & Identity elements */}
                  {(elem.type === 'banner' || elem.type === 'identity') ? (
                    <div className="flex items-center gap-0.5 px-1 py-0.5 text-[9px] md:text-[10px] font-semibold text-indigo-600 bg-indigo-50/80 rounded-md border border-indigo-100" title="Fixed position at top of profile">
                      <span className="material-symbols-outlined text-[10px] md:text-[11px]">push_pin</span>
                      <span>Fixed</span>
                    </div>
                  ) : (
                    <>
                      {/* Move Up Button */}
                      <button
                        type="button"
                        disabled={index <= fixedCount}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveUp(index);
                        }}
                        className="element-control-btn p-0.5 sm:p-1 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-white/90 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move up"
                      >
                        <span className="material-symbols-outlined text-[11px] sm:text-[13px] block">arrow_upward</span>
                      </button>

                      {/* Move Down Button */}
                      <button
                        type="button"
                        disabled={index === elements.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveDown(index);
                        }}
                        className="element-control-btn p-0.5 sm:p-1 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-white/90 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
                        title="Move down"
                      >
                        <span className="material-symbols-outlined text-[11px] sm:text-[13px] block">arrow_downward</span>
                      </button>
                    </>
                  )}

                  <div className="w-[1px] h-3 bg-slate-300/80 mx-0.5"></div>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditElement(elem);
                    }}
                    className="element-control-btn p-0.5 sm:p-1 rounded-md text-slate-700 hover:text-indigo-600 hover:bg-white/90 transition-all cursor-pointer"
                    title="Edit element"
                  >
                    <span className="material-symbols-outlined text-[11px] sm:text-[13px] block">edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteElement(elem.id);
                    }}
                    className="element-control-btn p-0.5 sm:p-1 rounded-md text-slate-700 hover:text-red-600 hover:bg-red-50/80 transition-all cursor-pointer"
                    title="Delete element"
                  >
                    <span className="material-symbols-outlined text-[11px] sm:text-[13px] block">delete</span>
                  </button>
                </div>

                {/* Element Content */}
                <div className="w-full pt-2">{renderElementBody(elem, index)}</div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Horizontal Line Drop Indicator at end of list */}
        {dropTargetIndex === elements.length && elements.length > 0 && (
          <div
            onDragOver={(e) => handleLineDragOver(e, elements.length)}
            onDrop={(e) => handleDropAtPosition(e, elements.length)}
            className="w-full my-3 flex items-center gap-2 transition-all cursor-pointer z-10"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
            <div className="flex-1 h-1 bg-indigo-600 rounded-full shadow-xs"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
          </div>
        )}
      </div>
    </main>
  );
}
