/**
 * Format a number as currency with proper localization
 */
export const formatCurrency = (amount: number, currency: string = 'EGP', locale: string = 'ar-EG'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format a number with thousands separators
 */
export const formatNumber = (num: number, locale: string = 'ar-SA'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Calculate time ago from a date string
 */
export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) {
    return 'الآن';
  } else if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `منذ ${hours} ساعة`;
  } else if (diffInMinutes < 10080) {
    const days = Math.floor(diffInMinutes / 1440);
    return `منذ ${days} يوم`;
  } else if (diffInMinutes < 43200) {
    const weeks = Math.floor(diffInMinutes / 10080);
    return `منذ ${weeks} أسبوع`;
  } else {
    const months = Math.floor(diffInMinutes / 43200);
    return `منذ ${months} شهر`;
  }
};

/**
 * Format a date to Arabic date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation for Saudi Arabia format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?966[0-9]{9}$|^05[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Generate a unique ID
 */
export const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Sanitize and validate file uploads
 */
export const validateFile = (file: File, maxSize: number = 5 * 1024 * 1024, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']): { isValid: boolean; error?: string } => {
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `حجم الملف كبير جداً. الحد الأقصى هو ${maxSize / (1024 * 1024)}MB`
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'نوع الملف غير مدعوم. يُسمح فقط بالصور (JPEG, PNG, WebP)'
    };
  }
  
  return { isValid: true };
};

/**
 * Calculate subscription expiry status
 */
export const getSubscriptionStatus = (expiryDate: string): { isExpired: boolean; daysLeft: number } => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffInDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    isExpired: diffInDays <= 0,
    daysLeft: Math.max(0, diffInDays)
  };
};

/**
 * Storage utilities for localStorage with error handling
 */
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }
};

export const authStorage = {
  getToken: (): string | null => storage.get<string>('auth_token'),
  setToken: (token: string): boolean => storage.set('auth_token', token),
  clear: (): void => {
    storage.remove('auth_token');
    storage.remove('user_data');
    storage.remove('remember_me');
  }
};

/**
 * URL validation
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Get initials from a name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};