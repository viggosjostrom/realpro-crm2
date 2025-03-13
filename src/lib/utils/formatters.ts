import { format, formatDistance } from 'date-fns';
import { sv } from 'date-fns/locale';

// Format currency in SEK
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date in Swedish format
export const formatDate = (date: Date): string => {
  return format(date, 'PPP', { locale: sv });
};

// Format date and time in Swedish format
export const formatDateTime = (date: Date): string => {
  return format(date, 'PPpp', { locale: sv });
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (date: Date, referenceDate?: Date): string => {
  return formatDistance(date, referenceDate || new Date(), { addSuffix: true, locale: sv });
};

// Format address with city and postal code
export const formatAddress = (address: string, city: string, postalCode: string): string => {
  return `${address}, ${postalCode} ${city}`;
};

// Format property size with rooms
export const formatPropertySize = (size: number, rooms: number): string => {
  return `${size} m² | ${rooms} ${rooms === 1 ? 'rum' : 'rum'}`;
};

// Format property price per square meter
export const formatPricePerSquareMeter = (price: number, size: number): string => {
  const pricePerSqm = Math.round(price / size);
  return formatCurrency(pricePerSqm) + '/m²';
};

// Format full name
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  // Swedish phone numbers are often formatted as 070-123 45 67
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 10) {
    // Format as 070-123 45 67
    return `${digits.substring(0, 3)}-${digits.substring(3, 6)} ${digits.substring(6, 8)} ${digits.substring(8, 10)}`;
  }
  
  // Return original if not matching expected format
  return phone;
}; 