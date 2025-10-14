// Application constants
export const APP_CONFIG = {
  NAME: 'منصة المشاريع',
  DESCRIPTION: 'منصة متخصصة في بيع وشراء المشاريع الرقمية',
  VERSION: '1.0.0',
  CONTACT_EMAIL: 'info@platform.com',
  SUPPORT_EMAIL: 'support@platform.com'
};

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  PROJECTS: {
    LIST: '/projects',
    DETAIL: '/projects/:id',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id'
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    DELETE: '/notifications/:id'
  },
  PURCHASE_REQUESTS: {
    CREATE: '/purchase-requests',
    LIST: '/purchase-requests',
    RESPOND: '/purchase-requests/:id/respond'
  }
};

// File upload limits
export const FILE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Countries list
export const COUNTRIES = [
  'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عُمان',
  'مصر', 'الأردن', 'لبنان', 'سوريا', 'العراق', 'المغرب',
  'الجزائر', 'تونس', 'ليبيا', 'السودان', 'اليمن', 'فلسطين'
];

// Programming skills options
export const PROGRAMMING_SKILLS = [
  // Frontend
  'React', 'Next.js', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript',
  'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Bootstrap',
  
  // Backend
  'Node.js', 'Express.js', 'Laravel', 'Django', 'Spring Boot', 'PHP',
  'Python', 'Java', 'C#', '.NET', 'Ruby', 'Go', 'Rust',
  
  // Databases
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Supabase',
  
  // Cloud & DevOps
  'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Vercel', 'Netlify',
  
  // Mobile
  'React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin',
  
  // CMS & E-commerce
  'WordPress', 'Shopify', 'Magento', 'WooCommerce', 'Strapi'
];

// Project categories
export const PROJECT_CATEGORIES = [
  'تطبيقات الجوال',
  'مواقع الويب',
  'متاجر إلكترونية',
  'أنظمة إدارة',
  'منصات تعليمية',
  'أنظمة طبية',
  'تطبيقات مالية',
  'منصات تواصل اجتماعي',
  'أنظمة المخزون',
  'بوتات وذكاء اصطناعي',
  'أنظمة أتمتة',
  'حلول سحابية'
];

// Project types
export const PROJECT_TYPES = [
  'تطبيق جوال',
  'موقع ويب',
  'منصة رقمية',
  'تطبيق سطح المكتب',
  'نظام إدارة محتوى',
  'متجر إلكتروني',
  'نظام إدارة عملاء',
  'بوت تلقائي',
  'API وخدمات ويب',
  'حل سحابي'
];

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    id: 'basic',
    name: 'الخطة الأساسية',
    price: 14,
    duration: 30,
    features: [
      'عرض مشروع واحد',
      'مدة العرض 30 يوم',
      'استقبال طلبات الشراء',
      'إشعارات فورية',
      'دعم فني أساسي'
    ]
  },
  PREMIUM: {
    id: 'premium',
    name: 'الخطة المميزة',
    price: 39,
    duration: 30,
    features: [
      'عرض 5 مشاريع',
      'مدة العرض 30 يوم',
      'استقبال طلبات الشراء',
      'إشعارات فورية',
      'إحصائيات متقدمة',
      'دعم فني مميز',
      'ترويج المشاريع'
    ]
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'خطة الشركات',
    price: 99,
    duration: 30,
    features: [
      'مشاريع غير محدودة',
      'مدة العرض مرنة',
      'استقبال طلبات الشراء',
      'إشعارات فورية',
      'إحصائيات شاملة',
      'دعم فني مخصص',
      'مدير حساب مخصص',
      'ترويج متقدم'
    ]
  }
};

// Notification types
export const NOTIFICATION_TYPES = {
  PURCHASE_REQUEST: 'purchase_request',
  REQUEST_ACCEPTED: 'request_accepted',
  REQUEST_REJECTED: 'request_rejected',
  SUBSCRIPTION: 'subscription',
  GENERAL: 'general',
  SYSTEM: 'system',
  
  // Transaction notification types
  ESCROW_PAYMENT_SECURED: 'escrow_payment_secured',
  ESCROW_DELIVERY_STARTED: 'escrow_delivery_started',
  ESCROW_DELIVERY_COMPLETED: 'escrow_delivery_completed',
  ESCROW_REVIEW_STARTED: 'escrow_review_started',
  ESCROW_REVIEW_REMINDER: 'escrow_review_reminder',
  ESCROW_FUNDS_RELEASED: 'escrow_funds_released',
  ESCROW_DISPUTE_OPENED: 'escrow_dispute_opened',
  ESCROW_DISPUTE_RESOLVED: 'escrow_dispute_resolved',
  ESCROW_TRANSACTION_COMPLETED: 'escrow_transaction_completed',
  ESCROW_PAYMENT_PENDING: 'escrow_payment_pending',
  ESCROW_INSTALLMENT_DUE: 'escrow_installment_due',
  ESCROW_INSTALLMENT_PAID: 'escrow_installment_paid'
};

// Purchase request statuses
export const PURCHASE_REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired'
};

// User roles
export const USER_ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  NOTIFICATIONS: 'notifications',
  PURCHASE_REQUESTS: 'purchaseRequests',
  SELLER_REGISTRATION: 'sellerRegistrationData',
  SELLER_SUBSCRIPTION: 'sellerSubscription',
  CART: 'cart',
  FAVORITES: 'favorites',
  SEARCH_HISTORY: 'searchHistory',
  
  // Transaction storage keys
  TRANSACTIONS: 'transactions',
  ESCROW_PAYMENTS: 'escrowPayments',
  PAYMENT_METHODS: 'paymentMethods',
  INSTALLMENT_PLANS: 'installmentPlans'
};

// Form validation rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  PROJECT_TITLE_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 500,
  PHONE_REGEX: /^\+?966[0-9]{9}$|^05[0-9]{8}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  LOADING: 2000
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};