/**
 * Formats a number as currency.
 * @param amount - The amount to format
 * @param currency - ISO 4217 currency code (default: USD)
 * @param locale - BCP 47 language tag (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  if (isNaN(amount)) return '$0.00';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback for invalid currency codes
    return `$${amount.toFixed(2)}`;
  }
};

/**
 * Formats a number as a compact currency string (e.g., "$1.2K", "$3.4M").
 */
export const formatCompactCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  if (isNaN(amount)) return '$0';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(0)}`;
  }
};