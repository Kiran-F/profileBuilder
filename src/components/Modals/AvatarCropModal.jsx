import React, { useState, useRef } from 'react';

const SHAPES = [
  { id: 'circle', label: 'Circle', icon: 'radio_button_unchecked', shapeClass: 'rounded-full w-48 h-48' },
  { id: 'square', label: 'Rounded Square', icon: 'square', shapeClass: 'rounded-3xl w-48 h-48' },
  { id: 'square-sharp', label: 'Sharp Square', icon: 'crop_square', shapeClass: 'rounded-none w-48 h-48' },
  { id: 'triangle', label: 'Triangle', icon: 'change_history', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]' },
  { id: 'pentagon', label: 'Pentagon (5)', icon: 'pentagon', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_100%_38%,_82%_100%,_18%_100%,_0%_38%)]' },
  { id: 'hexagon', label: 'Hexagon (6)', icon: 'hexagon', shapeClass: 'w-48 h-48 [clip-path:polygon(25%_0%,_75%_0%,_100%_50%,_75%_100%,_25%_100%,_0%_50%)]' },
  { id: 'heptagon', label: 'Heptagon (7)', icon: 'polyline', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_90%_20%,_100%_60%,_75%_100%,_25%_100%,_0%_60%,_10%_20%)]' },
  { id: 'octagon', label: 'Octagon (8)', icon: 'token', shapeClass: 'w-48 h-48 [clip-path:polygon(30%_0%,_70%_0%,_100%_30%,_100%_70%,_70%_100%,_30%_100%,_0%_70%,_0%_30%)]' },
  { id: 'nonagon', label: 'Nonagon (9)', icon: 'shapes', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_83%_12%,_100%_43%,_94%_78%,_68%_100%,_32%_100%,_6%_78%,_0%_43%,_17%_12%)]' },
  { id: 'decagon', label: 'Decagon (10)', icon: 'stars', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_65%,_80%_90%,_50%_100%,_20%_90%,_0%_65%,_0%_35%,_20%_10%)]' },
  { id: 'burst-12', label: '12-Point Burst', icon: 'brightness_7', shapeClass: 'w-48 h-48 [clip-path:polygon(50%_0%,_61%_14%,_78%_6%,_82%_23%,_97%_25%,_93%_42%,_100%_57%,_89%_70%,_91%_87%,_74%_88%,_66%_100%,_50%_92%,_34%_100%,_26%_88%,_9%_87%,_11%_70%,_0%_57%,_7%_42%,_3%_25%,_18%_23%,_22%_6%,_39%_14%)]' },
  { id: 'tv-screen', label: 'TV Screen', icon: 'tv', shapeClass: 'w-52 h-40 rounded-[44px/32px]' },
  { id: 'oval-h', label: 'Oval (Horizontal)', icon: 'egg', shapeClass: 'rounded-full w-52 h-36' },
  { id: 'oval-v', label: 'Oval (Vertical)', icon: 'lens', shapeClass: 'rounded-full w-36 h-52' },
  { id: 'rectangle', label: 'Rectangle', icon: 'crop_landscape', shapeClass: 'rounded-3xl w-52 h-36' }
];

const PRESET_COLORS = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#0f172a', name: 'Slate' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#06b6d4', name: 'Cyan' }
];

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
      return `drop-shadow(0px 20px 45px ${c}b3)`;
    case 'glow':
      return `drop-shadow(0px 0px 32px ${c}cc)`;
    case 'medium':
    default:
      return `drop-shadow(0px 10px 22px ${c}8c)`;
  }
}

const getInnerShapeClass = (shapeId) => {
  switch (shapeId) {
    case 'square':
      return 'rounded-2xl';
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
      return 'rounded-[35px/24px]';
    case 'oval-h':
    case 'oval-v':
    case 'circle':
      return 'rounded-full';
    case 'rectangle':
      return 'rounded-2xl';
    default:
      return 'rounded-full';
  }
};

export default function AvatarCropModal({
  imageUrl,
  currentShape = 'circle',
  currentBorderColor = '#ffffff',
  currentBorderWidth = 4,
  currentShadowSize = 'medium',
  currentShadowColor = '#0f172a',
  onSave,
  onClose
}) {
  const [shape, setShape] = useState(currentShape);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [borderColor, setBorderColor] = useState(currentBorderColor);
  const [borderWidth, setBorderWidth] = useState(currentBorderWidth);
  const [shadowSize, setShadowSize] = useState(currentShadowSize);
  const [shadowColor, setShadowColor] = useState(currentShadowColor);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  const isPolygonShape = [
    'triangle',
    'pentagon',
    'hexagon',
    'heptagon',
    'octagon',
    'nonagon',
    'decagon',
    'burst-12'
  ].includes(shape);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - offsetX, y: e.clientY - offsetY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffsetX(e.clientX - dragStartRef.current.x);
    setOffsetY(e.clientY - dragStartRef.current.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - offsetX,
        y: e.touches[0].clientY - offsetY
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    setOffsetX(e.touches[0].clientX - dragStartRef.current.x);
    setOffsetY(e.touches[0].clientY - dragStartRef.current.y);
  };

  const generateCroppedImage = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const frameW = frameRef.current ? frameRef.current.offsetWidth : 192;
        const frameH = frameRef.current ? frameRef.current.offsetHeight : 192;

        const scale = 2.5;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(frameW * scale);
        canvas.height = Math.round(frameH * scale);
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        const domBaseImgW = 256;
        const aspect = img.width / img.height;
        const domBaseImgH = domBaseImgW / aspect;

        const canvasImgW = domBaseImgW * scale;
        const canvasImgH = domBaseImgH * scale;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.translate(offsetX * scale, offsetY * scale);
        ctx.scale(zoom, zoom);

        ctx.drawImage(img, -canvasImgW / 2, -canvasImgH / 2, canvasImgW, canvasImgH);
        ctx.restore();

        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(imageUrl);
      img.src = imageUrl;
    });
  };

  const handleSave = async () => {
    const croppedUrl = await generateCroppedImage();
    onSave({
      croppedAvatarUrl: croppedUrl,
      rawAvatarUrl: imageUrl,
      avatarShape: shape,
      avatarZoom: zoom,
      avatarOffsetX: offsetX,
      avatarOffsetY: offsetY,
      avatarBorderColor: borderColor,
      avatarBorderWidth: borderWidth,
      avatarShadowSize: shadowSize,
      avatarShadowColor: shadowColor
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-[250] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              palette
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Customize Avatar & Frame
              </h3>
              <p className="text-xs text-slate-500">
                Adjust position, scale, shape, border & shadow side-by-side
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content Body - Side by Side Grid Layout */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Column: Fixed / Sticky Live Interactive Preview & Zoom */}
          <div className="md:col-span-5 flex flex-col items-center bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 h-fit md:sticky md:top-0">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Live Preview (Drag to Position):
            </span>

            {/* Viewport Container */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="relative w-64 h-64 bg-slate-100/90 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-slate-300 select-none p-2 mb-4"
            >
              {/* Active Selected Shape Viewport Frame with Custom Border & Shadow */}
              {isPolygonShape ? (
                /* Unclipped Parent Wrapper carrying CSS filter: drop-shadow(...) */
                <div
                  style={{
                    filter: buildDropShadowFilter(shadowSize, shadowColor)
                  }}
                  className="relative flex items-center justify-center transition-all duration-300"
                >
                  <div
                    style={{
                      backgroundColor: borderWidth > 0 ? borderColor : 'transparent',
                      padding: `${borderWidth}px`
                    }}
                    className={`transition-all duration-300 flex items-center justify-center ${SHAPES.find((s) => s.id === shape)?.shapeClass || 'rounded-full w-48 h-48'
                      }`}
                  >
                    <div
                      ref={frameRef}
                      className={`relative overflow-hidden bg-slate-900 flex items-center justify-center w-full h-full ${getInnerShapeClass(shape)}`}
                    >
                      <div
                        className="absolute transition-transform duration-75 flex items-center justify-center"
                        style={{
                          transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
                          transformOrigin: 'center'
                        }}
                      >
                        <img
                          src={imageUrl}
                          alt="Crop Preview"
                          className="max-w-none w-64 h-auto pointer-events-none"
                          draggable="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Rounded Border & Shadow Container */
                <div
                  style={{
                    backgroundColor: borderWidth > 0 ? borderColor : 'transparent',
                    padding: `${borderWidth}px`,
                    boxShadow: buildShadowStyle(shadowSize, shadowColor)
                  }}
                  className={`transition-all duration-300 flex items-center justify-center ${SHAPES.find((s) => s.id === shape)?.shapeClass || 'rounded-full w-48 h-48'
                    }`}
                >
                  <div
                    ref={frameRef}
                    className={`relative overflow-hidden bg-slate-900 flex items-center justify-center w-full h-full ${getInnerShapeClass(shape)}`}
                  >
                    <div
                      className="absolute transition-transform duration-75 flex items-center justify-center"
                      style={{
                        transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
                        transformOrigin: 'center'
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt="Crop Preview"
                        className="max-w-none w-64 h-auto pointer-events-none"
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Zoom Slider */}
            <div className="w-full space-y-1 px-1">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-indigo-600">zoom_in</span>
                  Resize / Zoom
                </span>
                <span className="font-mono text-indigo-600">{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Right Column: Scrollable Customization Controls */}
          <div className="md:col-span-7 space-y-5">
            {/* Shape Selector Options */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Choose Profile Photo Shape:
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-44 overflow-y-auto p-1 border border-slate-200/80 rounded-2xl bg-white">
                {SHAPES.map((item) => {
                  const isSelected = shape === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setShape(item.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-500/20 shadow-2xs'
                        : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                    >
                      <span className="material-symbols-outlined text-xl mb-1 text-indigo-600">
                        {item.icon}
                      </span>
                      <span className="text-[10px] leading-tight text-center">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Border Customization Controls */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-base text-indigo-600">border_style</span>
                Border Color & Thickness
              </span>

              {/* Border Width Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Border Thickness</span>
                  <span className="font-mono text-indigo-600">{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="1"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Border Color Swatches + Custom Picker */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Border Color:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setBorderColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${borderColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                        }`}
                      title={c.name}
                    ></button>
                  ))}
                  <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Border Color">
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Shadow Customization Controls */}
            <div className="border border-slate-200/90 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <span className="material-symbols-outlined text-base text-indigo-600">shadow</span>
                Shadow Style & Color
              </span>

              {/* Shadow Intensity Selector */}
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { key: 'none', label: 'None' },
                  { key: 'small', label: 'Soft' },
                  { key: 'medium', label: 'Medium' },
                  { key: 'large', label: 'Deep' },
                  { key: 'glow', label: 'Glow' }
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setShadowSize(s.key)}
                    className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer text-center ${shadowSize === s.key
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Shadow Color Swatches */}
              {shadowSize !== 'none' && (
                <div className="pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {PRESET_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setShadowColor(c.hex)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer ${shadowColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                          }`}
                        title={c.name}
                      ></button>
                    ))}
                    <label className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform" title="Custom Shadow Color">
                      <input
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setOffsetX(0);
              setOffsetY(0);
              setBorderColor('#ffffff');
              setBorderWidth(4);
              setShadowSize('medium');
              setShadowColor('#0f172a');
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            Reset All Styles
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">check</span>
              Apply Customization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
