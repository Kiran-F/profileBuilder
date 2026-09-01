# 🚀 Profile Studio - Interactive Digital Profile & Portfolio Builder

**Profile Studio** is a modern, high-performance React application designed for creating, customizing, and publishing personalized digital profile cards, portfolios, and link-in-bio web pages. Built with **React.js**, **Vite**, and **Tailwind CSS**, it features a fluid drag-and-drop studio editor, real-time customization options, smart client-side image compression, and a standalone live preview mode.

---

## 🌟 Key Features

### 🎨 1. Drag & Drop Studio Editor
- **11 Customizable Profile Elements**:
  - **Identity Block**: Name, designation, company, department, and custom shape avatar photo cropper.
  - **Fixed Top Banner**: Cover image, gradient background presets, headline, and custom height.
  - **Bio & Summary**: Multi-line bio text with custom alignment and typography styling.
  - **Social Media Links**: WhatsApp, LinkedIn, GitHub, Instagram, Facebook, X (Twitter), YouTube, and more with color/minimal modes.
  - **Badges & Credentials**: Verified certifications, badges, and credential URLs.
  - **YouTube Video Embeds**: Responsive YouTube video embeds.
  - **Custom Rich Text**: Formatted headings and paragraph sections.
  - **Contact Details**: Direct email, phone dialer, website, and location links.
  - **Gallery & Certificates**: Multi-layout image/certificate gallery (Grid/Scroll) with 4:3 uncropped ratio options.
  - **Contact & vCard Form**: Downloadable `.vcf` vCard contact files and visitor contact popups.

### 🛡️ 2. Smart Canvas vs. Live Preview Modes
- **Canvas Editor Non-Interactive Mode**: External links, `.vcf` file downloads, and video iframe clicks are disabled on the canvas editor to prevent accidental navigation while editing.
- **Standalone Live Preview (`?preview=true`)**: 100% full interactive behavior for visitors—downloading vCards, opening target URLs, and playing videos.

### 🎨 3. Design System & Theme Presets Manager
- **Custom Color & Gradient Pickers**: Choose solid colors, gradient presets, or custom dual-color gradients.
- **Saved Themes Manager**: Save your favorite color, font, and style presets with custom names and re-apply them anytime without overwriting element text data.
- **Typography & Font Engine**: Integrated Google Fonts (`Inter`, `Roboto`, `Outfit`, `Poppins`, `Fira Code`, etc.) with centralized font mapping.

### ⚡ 4. High-Performance Engineering
- **Smart Client-Side HD Image Compression**: Uploaded high-resolution photos (up to 25MB+) are automatically scaled down to **1400px–1600px** Retina HD dimensions with `imageSmoothingQuality = 'high'`, shrinking Base64 payload size by **~98%** to eliminate browser storage quota errors while keeping text and graphics 100% sharp.
- **Unified `<BaseModal />` Architecture**: Standardized, accessible modal containers across all 11 element editors.
- **Lazy Loading & Code Splitting**: All edit modals are dynamic imports (`React.lazy` + `<Suspense>`), optimizing initial startup time.
- **Component Memoization**: Wrapped all profile elements with `React.memo()` to eliminate unnecessary canvas re-renders.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 / 19
- **Build Tool & Dev Server**: Vite
- **Styling & UI**: Tailwind CSS v4, Google Material Symbols, HSL Hues
- **Utilities**: HTML5 Canvas Image Compressor, Custom vCard Generator
- **Icons & Fonts**: Material Symbols Outlined, Google Fonts

---



## 📁 Project Structure

```
ProfileBuilder/
├── src/
│   ├── components/
│   │   ├── Canvas.jsx                 # Live editing canvas & element renderer
│   │   ├── Sidebar.jsx                # Draggable element block palette
│   │   ├── FullProfileWebPage.jsx     # Standalone live preview page
│   │   ├── Modals/
│   │   │   ├── BaseModal.jsx          # Unified wrapper modal component
│   │   │   ├── EditIdentityModal.jsx  # Identity & avatar editor
│   │   │   ├── EditGalleryModal.jsx   # Gallery & certificates editor
│   │   │   └── ...                    # Other element edit modals
│   │   └── ProfileElements/
│   │       ├── IdentityElement.jsx    # Identity block component
│   │       ├── GalleryElement.jsx     # Gallery block component
│   │       └── ...                    # Profile element components
│   ├── constants/
│   │   └── fonts.js                   # Centralized font mappings & Google Fonts
│   ├── utils/
│   │   ├── imageCompressor.js         # HD offscreen canvas image compressor
│   │   ├── backgroundStyles.js        # Background gradient & color calculator
│   │   └── vcardGenerator.js          # `.vcf` vCard contact downloader
│   ├── App.jsx                        # Main state manager & studio header
│   ├── index.css                      # Custom animations & Tailwind imports
│   └── main.jsx                       # Application entry point
├── index.html
├── package.json
└── README.md
```

---
