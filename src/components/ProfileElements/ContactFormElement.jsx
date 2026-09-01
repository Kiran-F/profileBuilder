import React, { useState } from 'react';
import VisitorContactModal from '../Modals/VisitorContactModal';
import { generateAndDownloadVCard } from '../../utils/vcardGenerator';

function ContactFormElement({ data, isPreview = false }) {
  const {
    saveContactLabel = 'Save Contact',
    connectLabel = 'Connect',
    contactName = '',
    contactEmail = '',
    contactPhone = '',
    contactTitle = '',
    buttonColor = '#4648d4',
    buttonTextColor = '#ffffff',
    buttonShape = 'pill',
    buttonStyle = 'solid',
    formTitle = 'Get in Touch',
    formSubtitle = 'Fill out your details below and I will get back to you shortly.'
  } = data || {};

  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);

  const getShapeClass = () => {
    switch (buttonShape) {
      case 'square':
        return 'rounded-xl';
      case 'rounded':
        return 'rounded-2xl';
      case 'pill':
      default:
        return 'rounded-full';
    }
  };

  const getPrimaryButtonStyle = () => {
    const bg = buttonColor || '#4648d4';
    const text = buttonTextColor || '#ffffff';
    if (buttonStyle === 'outline') {
      return {
        borderColor: bg,
        color: bg,
        borderWidth: '2px',
        backgroundColor: 'transparent'
      };
    }
    return {
      backgroundColor: bg,
      color: text,
      borderColor: bg,
      borderWidth: '2px'
    };
  };

  const getSecondaryButtonStyle = () => {
    const bg = buttonColor || '#4648d4';
    const text = buttonTextColor || '#ffffff';
    if (buttonStyle === 'outline') {
      return {
        backgroundColor: bg,
        color: text,
        borderColor: bg,
        borderWidth: '2px'
      };
    }
    return {
      backgroundColor: text, // Text color of Button 1 becomes background of Button 2
      color: bg,           // Background color of Button 1 becomes text color of Button 2
      borderColor: bg,
      borderWidth: '2px'
    };
  };

  const handleSaveContactClick = (e) => {
    e.stopPropagation();
    if (isPreview) {
      generateAndDownloadVCard({
        name: contactName || 'Profile Contact',
        email: contactEmail,
        phone: contactPhone,
        title: contactTitle
      });
    }
  };

  const handleConnectClick = (e) => {
    e.stopPropagation();
    if (isPreview) {
      setIsVisitorModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-full my-3 px-2 sm:px-4">
        {/* Two Side-by-Side Action Buttons */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md mx-auto">
          {/* 1. Save Contact vCard Button */}
          <button
            type="button"
            onClick={handleSaveContactClick}
            style={getPrimaryButtonStyle()}
            className={`w-full py-2.5 sm:py-3 px-3 sm:px-5 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${getShapeClass()}`}
            title={isPreview ? "Download vCard contact to phone" : "Save Contact active on Preview page"}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">badge</span>
            <span className="truncate">{saveContactLabel}</span>
          </button>

          {/* 2. Connect Button (Opens Visitor Contact Modal) */}
          <button
            type="button"
            onClick={handleConnectClick}
            style={getSecondaryButtonStyle()}
            className={`w-full py-2.5 sm:py-3 px-3 sm:px-5 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 ${getShapeClass()}`}
            title={isPreview ? "Open contact message form" : "Connect form active on Preview page"}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">connect_without_contact</span>
            <span className="truncate">{connectLabel}</span>
          </button>
        </div>
      </div>

      {/* Visitor Contact Modal */}
      {isVisitorModalOpen && (
        <VisitorContactModal
          formTitle={formTitle}
          formSubtitle={formSubtitle}
          onClose={() => setIsVisitorModalOpen(false)}
        />
      )}
    </>
  );
}

export default React.memo(ContactFormElement);
