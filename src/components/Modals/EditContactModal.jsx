import React, { useState } from 'react';

export default function EditContactModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle || 'Contact Information');
  const [email, setEmail] = useState(element.data.email || '');
  const [phone, setPhone] = useState(element.data.phone || '');
  const [website, setWebsite] = useState(element.data.website || '');
  const [location, setLocation] = useState(element.data.location || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      sectionTitle,
      email,
      phone,
      website,
      location
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              contacts
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Contact Information
              </h3>
              <p className="text-xs text-slate-500">
                Update email, phone, website & location
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {/* Section Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Title (Optional)
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Contact Information"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Email Address */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-indigo-500">mail</span>
              Email Address
            </legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Contact / WhatsApp Phone */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-emerald-500">call</span>
              Phone / WhatsApp Number
            </legend>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Portfolio Website Link */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-blue-500">language</span>
              Portfolio Website Link
            </legend>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://alex-portfolio.com"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Location */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
              Location / City & Country
            </legend>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="San Francisco, CA, USA"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Save Contact Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
