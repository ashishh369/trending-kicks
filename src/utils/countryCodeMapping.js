// Currency to Country Code Mapping
export const currencyToCountry = {
  'USD': { code: '+1', name: 'United States', country: 'US' },
  'EUR': { code: '+39', name: 'Europe', country: 'EU' },
  'GBP': { code: '+44', name: 'United Kingdom', country: 'UK' },
  'JPY': { code: '+81', name: 'Japan', country: 'JP' },
  'AUD': { code: '+61', name: 'Australia', country: 'AU' },
  'CAD': { code: '+1', name: 'Canada', country: 'CA' },
  'INR': { code: '+91', name: 'India', country: 'IN' },
  'CNY': { code: '+86', name: 'China', country: 'CN' },
};

// Get country code from currency
export const getCountryCodeFromCurrency = (currency) => {
  return currencyToCountry[currency] || currencyToCountry['USD'];
};

// Format phone number with country code
export const formatPhoneNumber = (phone, countryCode) => {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Remove leading 0 or 1 if exists
  let formatted = cleanPhone.replace(/^(0|1)/, '');
  
  // Add country code if not present
  if (!formatted.startsWith(countryCode.substring(1))) {
    formatted = countryCode + formatted;
  } else {
    formatted = countryCode + formatted;
  }
  
  return formatted;
};

// Validate phone number format
export const validatePhoneNumber = (phone, countryCode) => {
  const cleanPhone = phone.replace(/\D/g, '');
  const minLength = 9;
  const maxLength = 15;
  
  return cleanPhone.length >= minLength && cleanPhone.length <= maxLength;
};
