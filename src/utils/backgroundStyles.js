export const BACKGROUND_PATTERNS = [];

export const PROFILE_BACKGROUND_GRADIENTS = [
  {
    id: 'sunset-fire',
    name: 'Sunset Fire',
    css: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)'
  },
  {
    id: 'neon-purple',
    name: 'Neon Purple',
    css: 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)'
  },
  {
    id: 'electric-violet',
    name: 'Electric Tri-Color',
    css: 'linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
  },
  {
    id: 'ocean-cyan',
    name: 'Ocean Cyan Abyss',
    css: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)'
  },
  {
    id: 'tropical-magenta',
    name: 'Tropical Coral',
    css: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)'
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Magenta',
    css: 'linear-gradient(135deg, #F355DA 0%, #6E0DD0 100%)'
  },
  {
    id: 'aurora-emerald',
    name: 'Aurora Emerald',
    css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
  },
  {
    id: 'midnight-nebula',
    name: 'Midnight Gold Tri-Color',
    css: 'linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)'
  },
  {
    id: 'cosmic-royal',
    name: 'Cosmic Indigo',
    css: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)'
  },
  {
    id: 'dark-obsidian',
    name: 'Dark Obsidian Galaxy',
    css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
  },
  {
    id: 'hyper-lime',
    name: 'Hyper Light Lime',
    css: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)'
  },
  {
    id: 'royal-blue-purple',
    name: 'Royal Blue Indigo',
    css: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
  }
];

export function computeProfileBackgroundStyle({
  bgType = 'solid',
  bgColor = '#ffffff',
  bgGradient = 'sunset-fire',
  customGradientStart = '#ff416c',
  customGradientEnd = '#ff4b2b'
}) {
  if (bgType === 'gradient') {
    let gradientCss = '';

    if (bgGradient === 'custom') {
      gradientCss = `linear-gradient(135deg, ${customGradientStart || '#4f46e5'} 0%, ${customGradientEnd || '#ec4899'} 100%)`;
    } else {
      const preset = PROFILE_BACKGROUND_GRADIENTS.find(g => g.id === bgGradient);
      if (preset) {
        gradientCss = preset.css;
      } else if (bgGradient.includes('gradient')) {
        gradientCss = bgGradient;
      } else {
        gradientCss = `linear-gradient(135deg, ${bgGradient} 0%, #ffffff 100%)`;
      }
    }

    return {
      background: gradientCss,
      backgroundImage: gradientCss,
      backgroundColor: 'transparent'
    };
  }

  // Default solid color
  return {
    backgroundColor: bgColor || '#ffffff',
    backgroundImage: 'none'
  };
}
