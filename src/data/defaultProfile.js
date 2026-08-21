export const EMPTY_ELEMENT_DATA = {
  identity: {
    avatarUrl: '',
    rawAvatarUrl: '',
    firstName: '',
    lastName: '',
    name: '',
    jobTitle: '',
    designation: '',
    department: '',
    companyName: '',
    alignment: 'left', // 'left', 'center', 'right'
    avatarShape: 'circle',
    avatarBorderColor: '#ffffff',
    avatarBorderWidth: 4,
    avatarShadowSize: 'medium',
    avatarShadowColor: '#0f172a',
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
    alignment: 'center', // 'left', 'center', 'right'
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
    gridCols: 2, // 1, 2, 3, or 4 columns
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
    fullWidth: false, // false (card width), true (full 100vw viewport width)
    title: '', // Optional overlay text (e.g. "Welcome to my profile")
    fontSize: 'medium',
    fontFamily: 'Inter',
    textColor: '#ffffff',
    isBold: true,
    isItalic: false,
    hasOverlay: true
  },
  contactForm: {
    saveContactLabel: 'Save Contact',
    connectLabel: 'Connect',
    contactName: 'Kiran Fatima AccessIT',
    contactEmail: 'fazaian2004@gmail.com',
    contactPhone: '+92 839-2893829',
    contactTitle: 'Intern',
    buttonColor: '#4648d4',
    buttonTextColor: '#ffffff',
    buttonShape: 'pill', // 'pill', 'rounded', 'square'
    buttonStyle: 'solid', // 'solid', 'outline'
    formTitle: 'Get in Touch',
    formSubtitle: 'Send a direct message and I will get back to you shortly.'
  },
  contact_form: {
    saveContactLabel: 'Save Contact',
    connectLabel: 'Connect',
    contactName: 'Kiran Fatima AccessIT',
    contactEmail: 'fazaian2004@gmail.com',
    contactPhone: '+92 839-2893829',
    contactTitle: 'Intern',
    buttonColor: '#4648d4',
    buttonTextColor: '#ffffff',
    buttonShape: 'pill',
    buttonStyle: 'solid',
    formTitle: 'Get in Touch',
    formSubtitle: 'Send a direct message and I will get back to you shortly.'
  }
};

export function enforceFixedOrder(elements) {
  if (!Array.isArray(elements) || elements.length <= 1) return elements || [];

  const banner = elements.find((e) => e.type === 'banner');
  const identity = elements.find((e) => e.type === 'identity');
  const remaining = elements.filter((e) => e.type !== 'banner' && e.type !== 'identity');

  const fixed = [];
  if (banner) fixed.push(banner);
  if (identity) fixed.push(identity);

  return [...fixed, ...remaining];
}
