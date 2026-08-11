import React, { useState } from 'react';

export default function EditBadgesModal({ element, onSave, onClose }) {
  const [sectionTitle, setSectionTitle] = useState(element.data.sectionTitle || 'Badges & Credentials');
  const [items, setItems] = useState(element.data.items || []);

  const handleAddBadge = () => {
    const newBadge = {
      id: `badge-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: '',
      imageUrl: '',
      linkUrl: ''
    };
    setItems((prev) => [...prev, newBadge]);
  };

  const handleRemoveBadge = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64String = uploadEvent.target.result;
      handleUpdateItem(id, 'imageUrl', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(element.id, {
      sectionTitle,
      items
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 material-symbols-outlined text-xl">
              workspace_premium
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Edit Badges & Credentials
              </h3>
              <p className="text-xs text-slate-500">
                Upload badge images and links
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Section Title */}
          <fieldset className="border border-slate-200 rounded-xl px-3.5 pt-1.5 pb-2 hover:border-indigo-400 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all bg-white">
            <legend className="text-[11px] font-semibold text-slate-500 px-1 bg-white">
              Section Heading Title
            </legend>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="e.g. Badges & Credentials"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none"
            />
          </fieldset>

          {/* Badges List Header */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Uploaded Badges ({items.length})
            </span>
            <button
              type="button"
              onClick={handleAddBadge}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Badge
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">
                workspace_premium
              </span>
              <p className="text-xs text-slate-500 font-medium">No badges added yet.</p>
              <button
                type="button"
                onClick={handleAddBadge}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                + Add your first square badge
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((badge, idx) => (
                <div
                  key={badge.id}
                  className="p-3.5 border border-slate-200 rounded-2xl bg-slate-50/40 relative space-y-3"
                >
                  {/* Delete Badge Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveBadge(badge.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:bg-red-50 w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Badge"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>

                  <div className="flex items-start gap-3.5">
                    {/* Square Image Upload Box with ALWAYS VISIBLE Edit Badge Icon */}
                    <div className="flex flex-col items-center gap-1.5">
                      <label className="w-18 h-18 rounded-2xl bg-white border-2 border-indigo-100 hover:border-indigo-400 shadow-2xs overflow-hidden flex flex-col items-center justify-center relative cursor-pointer group transition-all">
                        {badge.imageUrl ? (
                          <>
                            <img
                              src={badge.imageUrl}
                              alt="Badge"
                              className="w-full h-full object-contain p-1"
                            />
                            {/* ALWAYS VISIBLE EDIT OVERLAY ICON BADGE */}
                            <div className="absolute bottom-1 right-1 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                              <span className="material-symbols-outlined text-[11px]">edit</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-2 text-indigo-600">
                            <span className="material-symbols-outlined text-2xl mb-0.5">
                              add_photo_alternate
                            </span>
                            <span className="text-[9px] font-bold">Upload</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(badge.id, e)}
                          className="hidden"
                        />
                      </label>
                      <label className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">upload</span>
                        {badge.imageUrl ? 'Change Image' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(badge.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Badge Title & Link inputs */}
                    <div className="flex-1 space-y-2.5 pr-6">
                      <fieldset className="border border-slate-200 rounded-lg px-3 pt-1 pb-1.5 bg-white hover:border-indigo-300 focus-within:border-indigo-500">
                        <legend className="text-[10px] font-semibold text-slate-400 px-1 bg-white">
                          Badge Title / Name
                        </legend>
                        <input
                          type="text"
                          value={badge.title}
                          onChange={(e) => handleUpdateItem(badge.id, 'title', e.target.value)}
                          placeholder="e.g. Certified Developer"
                          className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </fieldset>

                      <fieldset className="border border-slate-200 rounded-lg px-3 pt-1 pb-1.5 bg-white hover:border-indigo-300 focus-within:border-indigo-500">
                        <legend className="text-[10px] font-semibold text-slate-400 px-1 bg-white">
                          Verification Link URL (Optional)
                        </legend>
                        <input
                          type="url"
                          value={badge.linkUrl}
                          onChange={(e) => handleUpdateItem(badge.id, 'linkUrl', e.target.value)}
                          placeholder="https://credential.com/verify/123"
                          className="w-full bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
                        />
                      </fieldset>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
