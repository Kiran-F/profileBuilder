---
name: Tactile Studio
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464554'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#4b41e1'
  on-secondary: '#ffffff'
  secondary-container: '#645efb'
  on-secondary-container: '#fffbff'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  mono-label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 280px
  canvas-padding: 64px
---

## Brand & Style

This design system establishes a "Neo-Skeuomorphic Minimalist" aesthetic tailored for a high-end creative utility. The brand personality is professional yet tactile, bridging the gap between functional SaaS efficiency and the sensory satisfaction of physical design tools.

The visual language relies on subtle depth, soft lighting, and precise geometry. It avoids the heavy clutter of traditional skueomorphism, opting instead for "pickable" elements that feel like physical objects resting on a clean, digital workspace. The emotional response should be one of focused creativity, where the UI recedes to let the user's work take center stage, while providing clear, haptic-like feedback during interaction.

## Colors

The palette is anchored by **Digital Indigo**, a vibrant hue used sparingly for primary actions and active states to maintain focus. 

- **Primary**: Used for the most important calls to action and active tool states.
- **Background**: A cool, very light gray (#f8fafc) serves as the "infinite" workspace, providing a soft contrast against the white surfaces.
- **Surface**: Pure white (#ffffff) is reserved for the Profile Canvas and floating panels, making them appear elevated and distinct from the workspace.
- **Interactive Accents**: Soft slate and zinc tones are used for borders and icons to ensure they feel like structural tools rather than decorative elements.

## Typography

The design system utilizes **Inter** across all roles to ensure maximum legibility and a systematic, clean feel. 

- **Headlines**: Use tighter letter spacing and semi-bold weights to create a strong visual anchor for page titles.
- **Body**: Standard weight with generous line height to ensure readability during long editing sessions.
- **Labels**: Slightly smaller and occasionally uppercase for tooltips and sidebar categories, providing a "technical" look to the interface.
- **Numeric Data**: Use tabular figures for coordinates or sizing inputs within the element controls.

## Layout & Spacing

The layout employs a **hybrid grid model**. The outer interface (sidebars, toolbars) follows a fixed-width structure to maximize the workspace, while the **Profile Canvas** sits on a fluid workspace with a minimum padding of 64px on all sides.

- **Sidebar**: Fixed at 280px to accommodate tool categories and property inspectors.
- **Spacing Rhythm**: Based on a 4px baseline. Most components use 8px (sm), 16px (md), or 24px (lg) padding.
- **Canvas Focus**: The central workspace uses a "Stage" philosophy, where the content is centered and given significant breathing room to prevent visual fatigue.

## Elevation & Depth

Depth is the defining characteristic of this design system. We use a "Level" system to define how high an object sits above the background:

- **Level 0 (Background)**: The cool gray workspace (#f8fafc). Flat.
- **Level 1 (The Canvas)**: A white surface with a soft, diffused shadow (15% opacity, 20px blur) and a subtle 1px border (#e2e8f0). This makes the canvas feel like a piece of paper on a desk.
- **Level 2 (Floating Controls)**: Small toolbars or pop-overs use a sharper shadow (20% opacity, 8px blur) to appear closer to the user.
- **Level 3 (Modals)**: High elevation with a backdrop blur (8px) on the workspace to focus attention.

Interaction surfaces use a "pressed" effect on click, slightly reducing the shadow and shifting the element 1px downward to mimic physical resistance.

## Shapes

The design system uses a "Medium Rounded" language to balance friendliness with professional precision.

- **Standard Elements (Buttons, Inputs)**: 0.5rem (8px) corner radius.
- **The Canvas**: 1rem (16px) corner radius to give it a modern, mobile-device feel.
- **Small Controls (Grabbers, Pencil Icons)**: 0.25rem (4px) or fully circular for specific tool icons.

## Components

### Profile Canvas
The "Center Stage." It must always have a subtle `#e2e8f0` border and a soft drop shadow. Inside the canvas, elements should have a hover state that reveals a thin Indigo outline.

### Sidebar Icons & Tools
Icons are 20px outlined paths. Active tools use the Primary Digital Indigo color for the icon and a very light Indigo background tint (5% opacity).

### Element Controls
Contextual controls that appear on hover over a canvas element:
- **Grabber**: A six-dot icon on the left for dragging.
- **Action Group**: Tiny (24x24px) circular buttons for Edit and Delete, positioned at the top-right of the active element. Use a subtle semi-transparent white background to ensure visibility over any content.

### Buttons
- **Primary**: Solid Digital Indigo with white text. Use a very subtle top-light inner shadow to create a "beveled" feel.
- **Secondary**: White background with a 1px slate-200 border and slate-700 text.

### Inputs
Fields should feel "recessed" rather than flat. Use a subtle inner shadow (top only) and a 1px border. On focus, the border transitions to Digital Indigo with a soft glow (3px spread).

### Pop-ups & Modals
Modals feature a 1.5rem (24px) padding and use the Level 3 elevation. Headers should be clearly separated with a subtle horizontal rule.