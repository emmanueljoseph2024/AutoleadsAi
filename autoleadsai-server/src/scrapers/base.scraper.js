import { logger } from '../utils/logger.js';

// Base scraper class that all platform scrapers extend
export class BaseScraper {
  constructor(sourceName, options = {}) {
    this.sourceName = sourceName;
    this.options = {
      maxRetries: 3,
      retryDelay: 5000,
      timeout: 30000,
      rateLimitDelay: 2000,
      maxConcurrent: 3,
      ...options,
    };
    this.isRunning = false;
    this.results = [];
    this.errors = [];
  }

  // Template method – subclasses must implement this
  async scrape(searchCriteria) {
    throw new Error(`scrape() must be implemented by ${this.sourceName} scraper`);
  }

  // Normalize raw data to common lead format
  normalizeLead(rawData) {
    return {
      email: rawData.email || '',
      name: rawData.name || '',
      company: rawData.company || '',
      sourceUrl: rawData.sourceUrl || '',
      source: this.sourceName,
      raw: rawData,
    };
  }

  // Retry wrapper with exponential backoff
  async withRetry(fn, retries = this.options.maxRetries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === retries) {
          logger.error(
            { source: this.sourceName, attempt, error: error.message },
            `Max retries reached for ${this.sourceName}`
          );
          throw error;
        }
        const delay = this.options.retryDelay * Math.pow(2, attempt - 1);
        logger.warn(
          { source: this.sourceName, attempt, delay },
          `Retrying ${this.sourceName} scrape`
        );
        await this.sleep(delay);
      }
    }
  }

  // Rate limiting helper
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Respect rate limits between batches
  async rateLimit() {
    await this.sleep(this.options.rateLimitDelay);
  }

  // Run with timeout
  async withTimeout(fn, timeout = this.options.timeout) {
    return Promise.race([
      fn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout)
      ),
    ]);
  }

  // Sanitize email
  sanitizeEmail(email) {
    if (!email) return '';
    return email.toLowerCase().trim();
  }

  // Extract domain from URL
  extractDomain(url) {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return '';
    }
  }

  // Validate lead has minimum required fields
  isValidLead(lead) {
    return !!(lead.email || (lead.name && lead.company));
  }

  // Get run statistics
  getStats() {
    return {
      source: this.sourceName,
      totalFound: this.results.length,
      errors: this.errors.length,
      isRunning: this.isRunning,
    };
  }
}

export default BaseScraper;