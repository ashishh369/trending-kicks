// Postal code validation by country
export const postalCodePatterns = {
  'US': { pattern: /^\d{5}(-\d{4})?$/, example: '12345 or 12345-6789' },
  'UK': { pattern: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, example: 'SW1A 1AA' },
  'CA': { pattern: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, example: 'K1A 0B1' },
  'AU': { pattern: /^\d{4}$/, example: '2000' },
  'JP': { pattern: /^\d{3}-\d{4}$/, example: '100-0001' },
  'CN': { pattern: /^\d{6}$/, example: '100000' },
  'IN': { pattern: /^\d{6}$/, example: '110001' },
  'EU': { pattern: /^\d{5}(-\d{4})?$/, example: '28001' },
};

// Country code to country mapping for postal validation
export const currencyToPostalCountry = {
  'USD': 'US',
  'EUR': 'EU',
  'GBP': 'UK',
  'JPY': 'JP',
  'AUD': 'AU',
  'CAD': 'CA',
  'INR': 'IN',
  'CNY': 'CN',
};

// Validate postal code based on country
export const validatePostalCode = (postalCode, countryCode) => {
  const country = currencyToPostalCountry[countryCode] || 'US';
  const pattern = postalCodePatterns[country];
  
  if (!pattern) {
    // If country not in list, accept any alphanumeric with hyphens/spaces
    return /^[A-Z0-9\s-]{3,}$/i.test(postalCode);
  }
  
  return pattern.pattern.test(postalCode);
};

// Get postal code example for country
export const getPostalCodeExample = (countryCode) => {
  const country = currencyToPostalCountry[countryCode] || 'US';
  const pattern = postalCodePatterns[country];
  return pattern ? pattern.example : '12345';
};

// States/Provinces by country
export const statesByCountry = {
  'US': [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  'CA': [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ],
  'AU': [
    'New South Wales', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia',
    'Australian Capital Territory', 'Northern Territory'
  ],
  'UK': [
    'England', 'Scotland', 'Wales', 'Northern Ireland'
  ],
  'IN': [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ],
  'JP': ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Hyogo'],
  'CN': ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan', 'Jiangsu'],
  'EU': ['Berlin', 'Paris', 'Madrid', 'Rome', 'Amsterdam', 'Vienna'],
};

// Get states for country
export const getStatesForCountry = (countryCode) => {
  const country = currencyToPostalCountry[countryCode] || 'US';
  return statesByCountry[country] || [];
};
