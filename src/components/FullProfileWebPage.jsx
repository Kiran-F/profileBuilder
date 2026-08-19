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

export default function FullProfileWebPage({
  initialElements,
  initialCardBgColor,
  initialCardBgType,
  initialCardBgGradient,
  initialCustomGradientStart,
  initialCustomGradientEnd,
  initialTextColor
}) {
  const [elements, setElements] = useState(initialElements || []);
  const [cardBgColor, setCardBgColor] = useState(initialCardBgColor || '#ffffff');
  const [cardBgType, setCardBgType] = useState(initialCardBgType || 'solid');
  const [cardBgGradient, setCardBgGradient] = useState(initialCardBgGradient || 'sunset-fire');
  const [customGradientStart, setCustomGradientStart] = useState(initialCustomGradientStart || '#ff416c');
  const [customGradientEnd, setCustomGradientEnd] = useState(initialCustomGradientEnd || '#ff4b2b');
  const [textColor, setTextColor] = useState(initialTextColor || '#191c1e');

  useEffect(() => {
    // 1. Check direct props if provided with elements
    if (initialElements && Array.isArray(initialElements) && initialElements.length > 0) {
      setElements(initialElements);
      if (initialCardBgColor) setCardBgColor(initialCardBgColor);
      if (initialCardBgType) setCardBgType(initialCardBgType);
      if (initialCardBgGradient) setCardBgGradient(initialCardBgGradient);
      if (initialCustomGradientStart) setCustomGradientStart(initialCustomGradientStart);
      if (initialCustomGradientEnd) setCustomGradientEnd(initialCustomGradientEnd);
      if (initialTextColor) setTextColor(initialTextColor);
      return;
    }

    // 2. Otherwise load payload from storage or window.name
    let saved = null;
    try {
      saved = localStorage.getItem('profile_studio_preview_data') || sessionStorage.getItem('profile_studio_preview_data');
      if (!saved) {
        saved = localStorage.getItem('profile_studio_drag_elements_v4') || sessionStorage.getItem('profile_studio_drag_elements_v4');
      }
      if (!saved && typeof window !== 'undefined' && window.name && window.name.startsWith('{')) {
        saved = window.name;
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.elements && Array.isArray(parsed.elements)) {
          setElements(parsed.elements);
        } else if (Array.isArray(parsed)) {
          setElements(parsed);
        }
        if (parsed.cardBgColor) setCardBgColor(parsed.cardBgColor);
        if (parsed.cardBgType) setCardBgType(parsed.cardBgType);
        if (parsed.cardBgGradient) setCardBgGradient(parsed.cardBgGradient);
        if (parsed.customGradientStart) setCustomGradientStart(parsed.customGradientStart);
        if (parsed.customGradientEnd) setCustomGradientEnd(parsed.customGradientEnd);
        if (parsed.textColor) setTextColor(parsed.textColor);
      } catch (e) { }
    }

    // Direct standalone storage key fallbacks
    try {
      const storedType = localStorage.getItem('profile_studio_bg_type') || sessionStorage.getItem('profile_studio_bg_type');
      if (storedType) setCardBgType(storedType);
      const storedGradient = localStorage.getItem('profile_studio_bg_gradient') || sessionStorage.getItem('profile_studio_bg_gradient');
      if (storedGradient) setCardBgGradient(storedGradient);
      const storedStart = localStorage.getItem('profile_studio_grad_start') || sessionStorage.getItem('profile_studio_grad_start');
      if (storedStart) setCustomGradientStart(storedStart);
      const storedEnd = localStorage.getItem('profile_studio_grad_end') || sessionStorage.getItem('profile_studio_grad_end');
      if (storedEnd) setCustomGradientEnd(storedEnd);
    } catch (e) { }
  }, [initialElements, initialCardBgColor, initialCardBgType, initialCardBgGradient, initialCustomGradientStart, initialCustomGradientEnd, initialTextColor]);

  const renderElementBody = (elem) => {
    switch (elem.type) {
      case 'banner':
        return <BannerElement data={elem.data} isPreview={true} />;
      case 'identity':
        return <IdentityElement data={elem.data} textColor={textColor} hasBannerAbove={hasTopBanner} />;
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

  const hasTopBanner = elements.length > 0 && elements[0]?.type === 'banner';
  const topBannerElem = hasTopBanner ? elements[0] : null;
  const mainElements = hasTopBanner ? elements.slice(1) : elements;

  const profileBgStyle = computeProfileBackgroundStyle({
    bgType: cardBgType,
    bgColor: cardBgColor,
    bgGradient: cardBgGradient,
    customGradientStart,
    customGradientEnd
  });

  return (
    <div
      style={{ ...profileBgStyle, color: textColor }}
      className={`min-h-screen w-full font-sans antialiased flex flex-col items-center justify-start ${hasTopBanner ? 'pt-0 pb-12 sm:pb-16 px-0 sm:px-4 md:px-6' : 'py-12 sm:py-16 px-4 sm:px-6 md:px-8'
        } selection:bg-indigo-600 selection:text-white transition-colors duration-300`}
    >
      {/* 1. Flush Top Banner (Zero top padding & zero top margin) */}
      {hasTopBanner && (
        <div className={`w-full mt-0 pt-0 mb-4 sm:mb-6 ${topBannerElem?.data?.fullWidth ? 'max-w-none' : 'max-w-2xl'}`}>
          {renderElementBody(topBannerElem)}
        </div>
      )}

      {/* 2. Remaining Digital Profile Elements */}
      <main className="w-full max-w-2xl flex flex-col items-center gap-2 px-4 sm:px-0">
        {mainElements.length === 0 && !hasTopBanner ? (
          <div className="py-20 text-center opacity-60">
            <span className="material-symbols-outlined text-5xl mb-3">visibility_off</span>
            <p className="text-sm font-medium">No elements added to this profile yet.</p>
          </div>
        ) : (
          mainElements.map((elem) => (
            <div key={elem.id} className="w-full">
              {renderElementBody(elem)}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
