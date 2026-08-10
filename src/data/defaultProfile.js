export const EMPTY_ELEMENT_DATA = {
  identity: {
    avatarUrl: '',
    name: '',
    title: '',
    subtitle: ''
  },
  bio: {
    bioLines: [],
    bioText: ''
  },
  social: {
    links: [
      { platform: 'whatsapp', name: 'WhatsApp', url: '', active: false, color: '#22c55e' },
      { platform: 'facebook', name: 'Facebook', url: '', active: false, color: '#2563eb' },
      { platform: 'youtube', name: 'YouTube', url: '', active: false, color: '#dc2626' },
      { platform: 'linkedin', name: 'LinkedIn', url: '', active: false, color: '#1d4ed8' },
      { platform: 'website', name: 'Global / Website', url: '', active: false, color: '#0d9488' },
      { platform: 'tiktok', name: 'TikTok', url: '', active: false, color: '#111827' },
      { platform: 'instagram', name: 'Instagram', url: '', active: false, color: '#db2777' },
      { platform: 'email', name: 'Email', url: '', active: false, color: '#ef4444' },
      { platform: 'github', name: 'GitHub', url: '', active: false, color: '#181717' }
    ]
  },
  custom: {
    title: '',
    url: '',
    buttonStyle: 'primary',
    iconName: 'link'
  }
};

export const TEMPLATE_ELEMENTS = {
  identity: {
    type: 'identity',
    title: 'Identity',
    description: 'Avatar & Name',
    icon: 'person'
  },
  bio: {
    type: 'bio',
    title: 'Bio',
    description: 'Roles & Description',
    icon: 'description'
  },
  social: {
    type: 'social',
    title: 'Social',
    description: 'Social Icons & Links',
    icon: 'share'
  },
  custom: {
    type: 'custom',
    title: 'Custom Block',
    description: 'Action Button / CTA',
    icon: 'link'
  }
};
