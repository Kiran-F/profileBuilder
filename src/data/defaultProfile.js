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
      { platform: 'website', name: 'Portfolio Website', url: '', active: false, color: '#0d9488' },
      { platform: 'tiktok', name: 'TikTok', url: '', active: false, color: '#111827' },
      { platform: 'instagram', name: 'Instagram', url: '', active: false, color: '#db2777' },
      { platform: 'telegram', name: 'Telegram', url: '', active: false, color: '#0088cc' },
      { platform: 'snapchat', name: 'Snapchat', url: '', active: false, color: '#fffc00' },
      { platform: 'dribbble', name: 'Dribbble', url: '', active: false, color: '#ea4c89' },
      { platform: 'x', name: 'X', url: '', active: false, color: '#000000' },
      { platform: 'document', name: 'Document', url: '', active: false, color: '#64748b' }
    ]
  },
  badges: {
    sectionTitle: 'Badges & Credentials',
    items: []
  },
  youtube: {
    title: '',
    videoUrl: ''
  },
  text: {
    heading: '',
    content: '',
    alignment: 'center',
    fontSize: 'medium'
  },
  contact: {
    sectionTitle: 'Contact Information',
    email: '',
    phone: '',
    website: '',
    location: ''
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
  badges: {
    type: 'badges',
    title: 'Badges',
    description: 'Square Badges & Credentials',
    icon: 'workspace_premium'
  },
  youtube: {
    type: 'youtube',
    title: 'YouTube Video',
    description: 'Embed YouTube Video',
    icon: 'play_circle'
  },
  text: {
    type: 'text',
    title: 'Text Block',
    description: 'Custom Heading & Text',
    icon: 'text_fields'
  },
  contact: {
    type: 'contact',
    title: 'Contact Info',
    description: 'Email, Phone, Web & Location',
    icon: 'contacts'
  }
};
