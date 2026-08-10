import React, { useState } from 'react';
import IdentityElement from './ProfileElements/IdentityElement';
import BioElement from './ProfileElements/BioElement';
import SocialElement from './ProfileElements/SocialElement';
import CustomLinkElement from './ProfileElements/CustomLinkElement';

export default function Canvas({
  elements,
  cardBgColor = '#ffffff',
  textColor = '#191c1e',
  onReorderElements,
  onAddElementAtIndex,
  onEditElement,
  onDeleteElement
}) {
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [isCanvasDragOver, setIsCanvasDragOver] = useState(false);

  const getSidebarType = (e) => {
    if (window.__draggedSidebarType) {
      return window.__draggedSidebarType;
    }
    if (e && e.dataTransfer) {
      try {
        const text = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('application/x-profile-block');
        if (text && (text === 'identity' || text === 'bio' || text === 'social' || text === 'custom')) {
          return text;
        }
      } catch (err) { }
    }
    return null;
  };

  const handleMoveUp = (index) => {
    if (index <= 0) return;
    const updated = [...elements];
    const [item] = updated.splice(index, 1);
    updated.splice(index - 1, 0, item);
    onReorderElements(updated);
  };

  const handleMoveDown = (index) => {
    if (index >= elements.length - 1) return;
    const updated = [...elements];
    const [item] = updated.splice(index, 1);
    updated.splice(index + 1, 0, item);
    onReorderElements(updated);
  };

  const handleItemDragOver = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    setIsCanvasDragOver(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const isBottomHalf = offsetY > rect.height / 2;
    const targetIdx = isBottomHalf ? index + 1 : index;

    if (dropTargetIndex !== targetIdx) {
      setDropTargetIndex(targetIdx);
    }
  };

  const handleLineDragOver = (e, positionIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
    setIsCanvasDragOver(true);
    if (dropTargetIndex !== positionIndex) {
      setDropTargetIndex(positionIndex);
    }
  };

  const handleCanvasDragLeave = (e) => {
    e.preventDefault();
    setIsCanvasDragOver(false);
  };

  const handleDropAtPosition = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCanvasDragOver(false);

    const sidebarType = getSidebarType(e);
    const insertPosition = targetIdx !== undefined ? targetIdx : (dropTargetIndex !== null ? dropTargetIndex : elements.length);

    if (sidebarType && (sidebarType === 'identity' || sidebarType === 'bio' || sidebarType === 'social' || sidebarType === 'custom')) {
      onAddElementAtIndex(sidebarType, insertPosition);
    }

    setDropTargetIndex(null);
    window.__draggedSidebarType = null;
    window.__draggedSource = null;
  };

  const renderElementBody = (elem) => {
    switch (elem.type) {
      case 'identity':
        return <IdentityElement data={elem.data} textColor={textColor} />;
      case 'bio':
        return <BioElement data={elem.data} textColor={textColor} />;
      case 'social':
        return <SocialElement data={elem.data} />;
      case 'custom':
        return <CustomLinkElement data={elem.data} />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 ml-60 bg-[#f7f9fb] p-4 sm:p-6 md:p-8 flex justify-center items-start overflow-y-auto min-h-screen select-none">
      {/* Central Profile Card Container */}
      <div
        style={{ backgroundColor: cardBgColor, color: textColor }}
        onDragOver={(e) => handleLineDragOver(e, elements.length)}
        onDragLeave={handleCanvasDragLeave}
        onDrop={(e) => handleDropAtPosition(e, elements.length)}
        onMouseUp={(e) => {
          if (window.__draggedSidebarType) {
            handleDropAtPosition(e, dropTargetIndex !== null ? dropTargetIndex : elements.length);
          }
        }}
        className={`w-full max-w-none rounded-3xl shadow-sm border transition-all p-8 sm:p-12 md:p-14 flex flex-col items-center relative min-h-[640px] my-2 ${isCanvasDragOver
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
            className={`w-full flex-1 min-h-[480px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 text-center transition-all cursor-pointer ${isCanvasDragOver
              ? 'border-indigo-500 bg-indigo-50/40 text-indigo-600 scale-[1.01]'
              : 'border-slate-300 bg-white/50 text-slate-500 hover:border-indigo-400'
              }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 shadow-2xs">
              <span className="material-symbols-outlined text-3xl">add_to_photos</span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Your profile canvas is currently empty
            </h3>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Drag elements (<span className="font-semibold text-indigo-600">Identity</span>, <span className="font-semibold text-indigo-600">Bio</span>, <span className="font-semibold text-indigo-600">Social</span>) from the left side menu and drop them into this center area to display them on your digital profile!
            </p>
          </div>
        )}

        {/* POPULATED CANVAS ELEMENTS */}
        {elements.map((elem, index) => {
          const showTopLine = dropTargetIndex === index;

          return (
            <React.Fragment key={elem.id}>
              {/* Sleek Horizontal Line Drop Indicator before item */}
              {showTopLine && (
                <div
                  onDragOver={(e) => handleLineDragOver(e, index)}
                  onDrop={(e) => handleDropAtPosition(e, index)}
                  className="w-full my-2 flex items-center gap-2 transition-all cursor-pointer z-40"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
                  <div className="flex-1 h-1 bg-indigo-600 rounded-full shadow-xs"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping"></div>
                </div>
              )}

              <div
                onDragOver={(e) => handleItemDragOver(e, index)}
                onDrop={(e) => handleDropAtPosition(e, dropTargetIndex !== null ? dropTargetIndex : index)}
                className="relative w-full group element-wrapper rounded-2xl transition-all border border-transparent hover:border-indigo-400 hover:bg-indigo-50/10 my-1 cursor-default"
              >
                {/* 1. LEFT TYPE BADGE */}
                <div
                  className="element-controls absolute top-2 left-2 flex items-center gap-1.5 z-30 text-slate-400 transition-opacity"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 group-hover:text-indigo-600">
                    {elem.type}
                  </span>
                </div>

                {/* 2. RIGHT CONTROLS TOOLBAR */}
                <div className="element-controls absolute top-2 right-2 flex items-center gap-1 z-30 bg-white/95 backdrop-blur-xs p-1 rounded-lg border border-slate-200 shadow-sm transition-all">
                  {/* Move Up Button */}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveUp(index);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move up"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                  </button>

                  {/* Move Down Button */}
                  <button
                    type="button"
                    disabled={index === elements.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveDown(index);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Move down"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                  </button>

                  <div className="w-[1px] h-4 bg-slate-200 mx-0.5"></div>

                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditElement(elem);
                    }}
                    className="p-1.5 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    title="Edit element"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteElement(elem.id);
                    }}
                    className="p-1.5 rounded-md text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete element"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>

                {/* Element Content */}
                <div className="w-full">{renderElementBody(elem)}</div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Sleek Horizontal Line Drop Indicator at end of list */}
        {dropTargetIndex === elements.length && elements.length > 0 && (
          <div
            onDragOver={(e) => handleLineDragOver(e, elements.length)}
            onDrop={(e) => handleDropAtPosition(e, elements.length)}
            className="w-full my-3 flex items-center gap-2 transition-all cursor-pointer z-40"
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
