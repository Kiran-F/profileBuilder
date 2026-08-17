export const EMPTY_ELEMENT_DATA = {
  identity: {
    avatarUrl: '',
    firstName: '',
    lastName: '',
    name: '',
    jobTitle: '',
    designation: '',
    department: '',
    companyName: '',
    subtitle: '',
    fontSize: 'medium',
    fontColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontFamily: 'Inter'
  },
  bio: {
    bioLines: [],
    bioText: '',
    fontSize: 'medium',
    fontColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontFamily: 'Inter'
  },
  social: {
    iconStyle: 'filled',
    colorMode: 'colored',
    iconShape: 'circle',
    iconSize: 'medium',
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
      { platform: 'document', name: 'Document', url: '', active: false, color: '#64748b' },
      { platform: 'discord', name: 'Discord Server', url: '', active: false, color: '#5865f2' }
    ]
  },
  badges: {
    sectionTitle: 'Badges & Credentials',
    items: [],
    fontSize: 'medium',
    fontColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontFamily: 'Inter'
  },
  youtube: {
    title: '',
    videoUrl: '',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowSize: 'medium',
    shadowColor: '#0f172a'
  },
  text: {
    heading: '',
    content: '',
    alignment: 'center',
    fontSize: 'medium',
    fontColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontFamily: 'Inter'
  },
  contact: {
    sectionTitle: 'Contact Information',
    email: '',
    phone: '',
    website: '',
    location: '',
    fontSize: 'medium',
    fontColor: '',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    fontFamily: 'Inter'
  },
  links: {
    sectionTitle: '',
    buttonShape: 'rounded-full',
    buttonBgColor: '#ffffff',
    buttonTextColor: '#0f172a',
    buttonBorderColor: '#000000',
    borderWidth: 2,
    hasShadow: true,
    shadowColor: '#000000',
    fontSize: 'medium',
    fontFamily: 'Inter',
    isBold: true,
    isItalic: false,
    items: []
  },
  gallery: {
    sectionTitle: '',
    layoutStyle: 'grid',
    imageAspect: 'landscape',
    imageRadius: 'rounded-2xl',
    hasShadow: true,
    shadowColor: '#000000',
    fontSize: 'medium',
    fontFamily: 'Inter',
    fontColor: '#0f172a',
    isBold: true,
    isItalic: false,
    items: []
  },
  banner: {
    bannerType: 'gradient', // 'image' or 'gradient'
    imageUrl: '',
    gradientPreset: 'indigo-purple', // 'indigo-purple', 'emerald-teal', 'sunset-orange', 'midnight-dark', 'rose-pink'
    bgColor: '#4648d4',
    bannerHeight: 'medium', // 'compact' (100px), 'medium' (160px), 'tall' (220px)
    bannerRadius: 'rounded-2xl', // 'rounded-none', 'rounded-2xl', 'rounded-3xl'
    title: '', // Optional overlay text (e.g. "Welcome to my profile")
    fontSize: 'medium',
    fontFamily: 'Inter',
    textColor: '#ffffff',
    isBold: true,
    isItalic: false,
    hasOverlay: true
  }
};

export const TEMPLATE_ELEMENTS = {
  identity: {
    type: 'identity',
    title: 'Identity',
    description: 'Avatar, Name & Work Info',
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
