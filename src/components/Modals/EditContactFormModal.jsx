import React, { useState } from 'react';

const PRESET_COLORS = [
  { hex: '#4648d4', name: 'Indigo' },
  { hex: '#10b981', name: 'Emerald' },
  { hex: '#0f172a', name: 'Slate' },
  { hex: '#f43f5e', name: 'Rose' },
  { hex: '#f59e0b', name: 'Amber' },
  { hex: '#8b5cf6', name: 'Purple' },
  { hex: '#06b6d4', name: 'Cyan' },
  { hex: '#000000', name: 'Black' }
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s\-\(\)\.]{7,20}$/;

const validateEmail = (val) => {
  if (!val || !val.trim()) return '';
  if (!EMAIL_REGEX.test(val.trim())) {
    return 'Please enter a valid email address (e.g. alex@example.com)';
  }
  return '';
};

const validatePhone = (val) => {
  if (!val || !val.trim()) return '';
  const digitsOnly = val.replace(/\D/g, '');
  if (!PHONE_REGEX.test(val.trim()) || digitsOnly.length < 7) {
    return 'Please enter a valid phone number (e.g. +1 (555) 123-4567 or 03001234567)';
  }
  return '';
};

export default function EditContactFormModal({ element, onSave, onClose }) {
  const [saveContactLabel, setSaveContactLabel] = useState(element.data.saveContactLabel || 'Save Contact');
  const [connectLabel, setConnectLabel] = useState(element.data.connectLabel || 'Connect');

  const [contactName, setContactName] = useState(element.data.contactName || '');
  const [contactEmail, setContactEmail] = useState(element.data.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(element.data.contactPhone || '');
  const [contactTitle, setContactTitle] = useState(element.data.contactTitle || '');

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [buttonColor, setButtonColor] = useState(element.data.buttonColor || '#4648d4');
  const [buttonTextColor, setButtonTextColor] = useState(element.data.buttonTextColor || '#ffffff');
  const [buttonShape, setButtonShape] = useState(element.data.buttonShape || 'pill');
  const [buttonStyle, setButtonStyle] = useState(element.data.buttonStyle || 'solid');

  const [formTitle, setFormTitle] = useState(element.data.formTitle || 'Get in Touch');
  const [formSubtitle, setFormSubtitle] = useState(
    element.data.formSubtitle || 'Send a direct message and I will get back to you shortly.'
  );

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setContactEmail(val);
    if (emailError) setEmailError(validateEmail(val));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setContactPhone(val);
    if (phoneError) setPhoneError(validatePhone(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errEmail = validateEmail(contactEmail);
    const errPhone = validatePhone(contactPhone);

    setEmailError(errEmail);
    setPhoneError(errPhone);

    if (errEmail || errPhone) {
      return;
    }

    onSave(element.id, {
      ...element.data,
      saveContactLabel,
      connectLabel,
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      contactTitle: contactTitle.trim(),
      buttonColor,
      buttonTextColor,
      buttonShape,
      buttonStyle,
      formTitle,
      formSubtitle
    });
  };

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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] my-auto"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              connect_without_contact
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Contact Card & Buttons
              </h3>
              <p className="text-xs text-slate-500">
                Configure phone vCard contact details & visitor popup settings
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Section 1: Phone vCard Contact Details */}
          <div className="border border-slate-200 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">badge</span>
              Phone Contact vCard Details (Saved to phone)
            </span>

            {/* Contact Name */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Full Contact Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Contact Email */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailError(validateEmail(contactEmail))}
                  placeholder="alex@example.com"
                  className={`w-full bg-white border rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none ${
                    emailError ? 'border-red-400 ring-2 ring-red-500/10' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
                {emailError && <p className="mt-1 text-[10px] text-red-500 font-medium">{emailError}</p>}
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={handlePhoneChange}
                  onBlur={() => setPhoneError(validatePhone(contactPhone))}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full bg-white border rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none ${
                    phoneError ? 'border-red-400 ring-2 ring-red-500/10' : 'border-slate-200 focus:border-indigo-500'
                  }`}
                />
                {phoneError && <p className="mt-1 text-[10px] text-red-500 font-medium">{phoneError}</p>}
              </div>
            </div>

            {/* Job Title / Company */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Job Title / Organization (Optional)
              </label>
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="e.g. Senior Product Designer at Acme Corp"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section 2: Button Labels & Styling */}
          <div className="border border-slate-200 rounded-2xl p-3.5 space-y-3.5 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">design_services</span>
              Button Text Labels & Styling
            </span>

            {/* Side-by-side Button Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Left Button Label
                </label>
                <input
                  type="text"
                  required
                  value={saveContactLabel}
                  onChange={(e) => setSaveContactLabel(e.target.value)}
                  placeholder="Save Contact"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Right Button Label
                </label>
                <input
                  type="text"
                  required
                  value={connectLabel}
                  onChange={(e) => setConnectLabel(e.target.value)}
                  placeholder="Connect"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Button Shape */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Button Shape
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'pill', label: 'Pill' },
                  { id: 'rounded', label: 'Rounded' },
                  { id: 'square', label: 'Square' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setButtonShape(s.id)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      buttonShape === s.id
                        ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Button Fill Style */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Button Fill Style
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'solid', label: 'Solid Accent' },
                  { id: 'outline', label: 'Outline Accent' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setButtonStyle(st.id)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      buttonStyle === st.id
                        ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Accent Color
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {PRESET_COLORS.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setButtonColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full border border-slate-300 transition-all cursor-pointer flex items-center justify-center ${
                      buttonColor === c.hex ? 'ring-2 ring-indigo-600 scale-110' : 'hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
                <label
                  className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-rose-500 to-amber-500 cursor-pointer overflow-hidden relative shadow-2xs hover:scale-105 transition-transform"
                  title="Custom Accent Color"
                >
                  <input
                    type="color"
                    value={buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Visitor Popup Form Title & Subtitle */}
          <div className="border border-slate-200 rounded-2xl p-3.5 space-y-3 bg-slate-50/40">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <span className="material-symbols-outlined text-base text-indigo-600">mail</span>
              Connect Modal Form Text
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Connect Form Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Get in Touch"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Connect Form Subtitle
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Subtitle text..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="border border-indigo-100 rounded-2xl p-4 bg-indigo-50/40 text-center">
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-2.5">
              Side-by-Side Buttons Preview:
            </span>
            <div className="grid grid-cols-2 gap-2.5 max-w-sm mx-auto">
              <button
                type="button"
                style={
                  buttonStyle === 'solid'
                    ? { backgroundColor: buttonColor || '#4648d4', color: buttonTextColor || '#ffffff', borderColor: buttonColor || '#4648d4', borderWidth: '2px' }
                    : { borderColor: buttonColor || '#4648d4', color: buttonColor || '#4648d4', borderWidth: '2px', backgroundColor: 'transparent' }
                }
                className={`py-2 px-3 font-bold text-xs shadow-md ${getShapeClass()} flex items-center justify-center gap-1`}
              >
                <span className="material-symbols-outlined text-base">badge</span>
                <span>{saveContactLabel}</span>
              </button>

              <button
                type="button"
                style={
                  buttonStyle === 'solid'
                    ? { backgroundColor: buttonTextColor || '#ffffff', color: buttonColor || '#4648d4', borderColor: buttonColor || '#4648d4', borderWidth: '2px' }
                    : { backgroundColor: buttonColor || '#4648d4', color: buttonTextColor || '#ffffff', borderColor: buttonColor || '#4648d4', borderWidth: '2px' }
                }
                className={`py-2 px-3 font-bold text-xs shadow-md ${getShapeClass()} flex items-center justify-center gap-1`}
              >
                <span className="material-symbols-outlined text-base">connect_without_contact</span>
                <span>{connectLabel}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">check</span>
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
