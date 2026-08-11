import React, { useState, useEffect } from 'react';
import IdentityElement from './ProfileElements/IdentityElement';
import BioElement from './ProfileElements/BioElement';
import SocialElement from './ProfileElements/SocialElement';
import BadgesElement from './ProfileElements/BadgesElement';
import YoutubeElement from './ProfileElements/YoutubeElement';
import TextElement from './ProfileElements/TextElement';
import ContactElement from './ProfileElements/ContactElement';

export default function FullProfileWebPage({ initialElements, initialCardBgColor, initialTextColor }) {
  const [elements, setElements] = useState(initialElements || []);
  const [cardBgColor, setCardBgColor] = useState(initialCardBgColor || '#ffffff');
  const [textColor, setTextColor] = useState(initialTextColor || '#191c1e');

  useEffect(() => {
    const saved = localStorage.getItem('profile_studio_preview_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.elements) setElements(parsed.elements);
        if (parsed.cardBgColor) setCardBgColor(parsed.cardBgColor);
        if (parsed.textColor) setTextColor(parsed.textColor);
      } catch (e) {
        if (Array.isArray(JSON.parse(saved))) {
          setElements(JSON.parse(saved));
        }
      }
    }
  }, [initialElements, initialCardBgColor, initialTextColor]);

  const renderElementBody = (elem) => {
    switch (elem.type) {
      case 'identity':
        return <IdentityElement data={elem.data} textColor={textColor} />;
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
      default:
        return null;
    }
  };

  return (
    <div
      style={{ backgroundColor: cardBgColor, color: textColor }}
      className="min-h-screen w-full font-sans antialiased flex flex-col items-center justify-start py-12 sm:py-16 px-4 sm:px-6 md:px-8 selection:bg-indigo-600 selection:text-white transition-colors duration-300"
    >
      {/* Seamless Full-Page Digital Profile Web Layout */}
      <main className="w-full max-w-2xl flex flex-col items-center gap-2 my-auto">
        {elements.length === 0 ? (
          <div className="py-20 text-center opacity-60">
            <span className="material-symbols-outlined text-5xl mb-3">visibility_off</span>
            <p className="text-sm font-medium">No elements added to this profile yet.</p>
          </div>
        ) : (
          elements.map((elem) => (
            <div key={elem.id} className="w-full">
              {renderElementBody(elem)}
            </div>
          ))
        )}
      </main>
    </div>
  );
}
