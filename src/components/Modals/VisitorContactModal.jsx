import React, { useState } from 'react';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s\-\(\)\.]{7,20}$/;

const validateEmail = (val) => {
  if (!val || !val.trim()) return 'Email address is required.';
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

export default function VisitorContactModal({ formTitle, formSubtitle, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) setEmailError(validateEmail(val));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) setPhoneError(validatePhone(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errName = '';
    if (!fullName.trim()) errName = 'Full Name is required.';

    const errEmail = validateEmail(email);
    const errPhone = validatePhone(phone);

    let errMessage = '';
    if (!message.trim()) errMessage = 'Please enter your message or remarks.';

    setNameError(errName);
    setEmailError(errEmail);
    setPhoneError(errPhone);
    setMessageError(errMessage);

    if (errName || errEmail || errPhone || errMessage) {
      return;
    }

    // Success Simulation
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[250] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col my-auto"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              mail
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {formTitle || 'Get in Touch'}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-[220px]">
                {formSubtitle || 'Fill out your details below'}
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

        {/* Body Form or Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">Message Sent!</h4>
            <p className="text-xs text-slate-600 max-w-xs">
              Thank you for reaching out. Your contact details and message have been submitted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            {/* Full Name */}
            <div>
              <fieldset
                className={`border rounded-xl px-3.5 pt-1.5 pb-2 transition-all bg-white ${
                  nameError
                    ? 'border-red-400 ring-2 ring-red-500/10'
                    : 'border-slate-200 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10'
                }`}
              >
                <legend
                  className={`text-[11px] font-semibold px-1 bg-white flex items-center gap-1 ${
                    nameError ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xs ${nameError ? 'text-red-500' : 'text-indigo-500'}`}>
                    person
                  </span>
                  Full Name *
                </legend>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="e.g. John Doe"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
              {nameError && (
                <p className="mt-1 text-[11px] text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {nameError}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <fieldset
                className={`border rounded-xl px-3.5 pt-1.5 pb-2 transition-all bg-white ${
                  emailError
                    ? 'border-red-400 ring-2 ring-red-500/10'
                    : 'border-slate-200 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10'
                }`}
              >
                <legend
                  className={`text-[11px] font-semibold px-1 bg-white flex items-center gap-1 ${
                    emailError ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xs ${emailError ? 'text-red-500' : 'text-indigo-500'}`}>
                    mail
                  </span>
                  Email Address *
                </legend>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailError(validateEmail(email))}
                  placeholder="alex@example.com"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
              {emailError && (
                <p className="mt-1 text-[11px] text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {emailError}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <fieldset
                className={`border rounded-xl px-3.5 pt-1.5 pb-2 transition-all bg-white ${
                  phoneError
                    ? 'border-red-400 ring-2 ring-red-500/10'
                    : 'border-slate-200 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10'
                }`}
              >
                <legend
                  className={`text-[11px] font-semibold px-1 bg-white flex items-center gap-1 ${
                    phoneError ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xs ${phoneError ? 'text-red-500' : 'text-emerald-500'}`}>
                    call
                  </span>
                  Phone Number (Optional)
                </legend>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => setPhoneError(validatePhone(phone))}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
                />
              </fieldset>
              {phoneError && (
                <p className="mt-1 text-[11px] text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {phoneError}
                </p>
              )}
            </div>

            {/* Remarks / Message */}
            <div>
              <fieldset
                className={`border rounded-xl px-3.5 pt-1.5 pb-2 transition-all bg-white ${
                  messageError
                    ? 'border-red-400 ring-2 ring-red-500/10'
                    : 'border-slate-200 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10'
                }`}
              >
                <legend
                  className={`text-[11px] font-semibold px-1 bg-white flex items-center gap-1 ${
                    messageError ? 'text-red-500' : 'text-slate-500'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xs ${messageError ? 'text-red-500' : 'text-indigo-500'}`}>
                    chat
                  </span>
                  Remarks / Message *
                </legend>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (messageError) setMessageError('');
                  }}
                  placeholder="Write your remarks or message here..."
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none resize-y"
                />
              </fieldset>
              {messageError && (
                <p className="mt-1 text-[11px] text-red-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {messageError}
                </p>
              )}
            </div>

            {/* Footer Action Buttons */}
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
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">send</span>
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
