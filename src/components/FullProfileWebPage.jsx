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
import ContactFormElement from './ProfileElements/ContactFormElement';
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
    let loadedType = initialCardBgType;
    let loadedGradient = initialCardBgGradient;
    let loadedStart = initialCustomGradientStart;
    let loadedEnd = initialCustomGradientEnd;
    let loadedColor = initialCardBgColor;
    let loadedText = initialTextColor;

    // Check payload from localStorage/sessionStorage/window.name
    let savedPayload = null;
    try {
      if (typeof window !== 'undefined' && window.name && window.name.startsWith('{')) {
        savedPayload = window.name;
      } else {
        savedPayload = localStorage.getItem('profile_studio_preview_data') || sessionStorage.getItem('profile_studio_preview_data');
      }
    } catch (e) { }

    if (savedPayload) {
      try {
        const parsed = JSON.parse(savedPayload);
        if (parsed.elements && Array.isArray(parsed.elements)) {
          setElements(parsed.elements);
        }
        if (parsed.cardBgType) loadedType = parsed.cardBgType;
        if (parsed.cardBgGradient) loadedGradient = parsed.cardBgGradient;
        if (parsed.customGradientStart) loadedStart = parsed.customGradientStart;
        if (parsed.customGradientEnd) loadedEnd = parsed.customGradientEnd;
        if (parsed.cardBgColor) loadedColor = parsed.cardBgColor;
        if (parsed.textColor) loadedText = parsed.textColor;
      } catch (e) { }
    } else if (initialElements && Array.isArray(initialElements)) {
      setElements(initialElements);
    }

    // Direct standalone storage key fallbacks
    try {
      const sType = localStorage.getItem('profile_studio_bg_type') || sessionStorage.getItem('profile_studio_bg_type');
      if (sType) loadedType = sType;
      const sGradient = localStorage.getItem('profile_studio_bg_gradient') || sessionStorage.getItem('profile_studio_bg_gradient');
      if (sGradient) loadedGradient = sGradient;
      const sStart = localStorage.getItem('profile_studio_grad_start') || sessionStorage.getItem('profile_studio_grad_start');
      if (sStart) loadedStart = sStart;
      const sEnd = localStorage.getItem('profile_studio_grad_end') || sessionStorage.getItem('profile_studio_grad_end');
      if (sEnd) loadedEnd = sEnd;
      const sColor = localStorage.getItem('profile_studio_card_bg') || sessionStorage.getItem('profile_studio_card_bg');
      if (sColor) loadedColor = sColor;
      const sText = localStorage.getItem('profile_studio_text_color') || sessionStorage.getItem('profile_studio_text_color');
      if (sText) loadedText = sText;
    } catch (e) { }

    if (loadedType) setCardBgType(loadedType);
    if (loadedGradient) setCardBgGradient(loadedGradient);
    if (loadedStart) setCustomGradientStart(loadedStart);
    if (loadedEnd) setCustomGradientEnd(loadedEnd);
    if (loadedColor) setCardBgColor(loadedColor);
    if (loadedText) setTextColor(loadedText);
  }, [initialElements, initialCardBgColor, initialCardBgType, initialCardBgGradient, initialCustomGradientStart, initialCustomGradientEnd, initialTextColor]);

  const renderElementBody = (elem) => {
    switch (elem.type) {
      case 'banner':
        return <BannerElement data={elem.data} isPreview={true} />;
      case 'identity':
        return <IdentityElement data={elem.data} textColor={textColor} hasBannerAbove={hasTopBanner} isPreview={true} />;
      case 'bio':
        return <BioElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'social':
        return <SocialElement data={elem.data} isPreview={true} />;
      case 'badges':
        return <BadgesElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'youtube':
        return <YoutubeElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'text':
        return <TextElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'contact':
        return <ContactElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'links':
        return <LinksElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'gallery':
        return <GalleryElement data={elem.data} textColor={textColor} isPreview={true} />;
      case 'contactForm':
      case 'contact_form':
        return <ContactFormElement data={elem.data} isPreview={true} />;
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
