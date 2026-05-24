/**
 * Formats a date string or Date object into a human-readable format.
 * @param date - The date to format (ISO string or Date object)
 * @param format - The desired output format
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date, format: 'short' | 'long' | 'relative' | 'iso' = 'short'): string => {
  const d = new Date(date);

  // Return empty string for invalid dates
  if (isNaN(d.getTime())) return '';

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

    case 'long':
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });

    case 'relative':
      return getRelativeTime(d);

    case 'iso':
      return d.toISOString();

    default:
      return d.toLocaleDateString();
  }
};

/**
 * Returns a relative time string (e.g., "5m ago", "2h ago", "3d ago").
 */
const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // Future date
  if (diffMs < 0) {
    return formatDate(date, 'short');
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 10) return 'Just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes === 1) return '1m ago';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours === 1) return '1h ago';
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (weeks === 1) return '1w ago';
  if (weeks < 4) return `${weeks}w ago`;
  if (months === 1) return '1mo ago';
  if (months < 12) return `${months}mo ago`;

  return formatDate(date, 'short');
};

/**
 * Checks if a date is today.
 */
export const isToday = (date: string | Date): boolean => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a date is within the last N days.
 */
export const isWithinDays = (date: string | Date, days: number): boolean => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days && diffDays >= 0;
};