// Business contact information
export const BUSINESS_CONTACT = {
  phone: '+918651070831',
  phoneFormatted: '+91 8651070831',
  phoneSecondary: '+918541849118',
  phoneSecondaryFormatted: '+91 8541849118',
  email: 'jkinteriorofficial@gmail.com',
  website: 'https://www.jkinterior.online',
  address: {
    street: 'Forbesganj Dumariya',
    city: 'Forbesganj',
    region: 'Bihar',
    postalCode: '854318',
    country: 'IN'
  }
}

// Gallery configuration
export const GALLERY_CONFIG = {
  VISIBLE_COUNT: 12,
  SWIPE_THRESHOLD: 50,
  COLUMNS: {
    mobile: 2,
    tablet: 3,
    desktop: 4
  },
  BREAKPOINTS: {
    mobile: 768,
    tablet: 1024
  }
} as const

// Form validation patterns
export const VALIDATION_PATTERNS = {
  phone: /^[+]?[0-9]{10,15}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-zA-Z\s]{2,50}$/
} as const
