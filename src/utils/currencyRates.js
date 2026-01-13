// Utility to fetch and cache currency rates from a public API
// For demo: fallback to static rates if API fails

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let cachedRates = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getCurrencyRates() {
  const now = Date.now();
  if (cachedRates && now - lastFetch < CACHE_DURATION) {
    return cachedRates;
  }
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    cachedRates = data.rates;
    lastFetch = now;
    return cachedRates;
  } catch (e) {
    // fallback static rates (as of Jan 2026)
    return {
      USD: 1,
      EUR: 0.92,
      GBP: 0.81,
      JPY: 145.2,
      AUD: 1.48,
      CAD: 1.34,
      INR: 83.1,
      CNY: 7.1,
    };
  }
}

export function convertPrice(amount, from, to, rates) {
  if (!rates[from] || !rates[to]) return amount;
  return (amount / rates[from]) * rates[to];
}
