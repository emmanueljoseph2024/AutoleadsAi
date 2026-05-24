import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

class GoogleMapsScraper extends BaseScraper {
  constructor(options = {}) {
    super('google_maps', {
      maxRetries: 2,
      retryDelay: 5000,
      rateLimitDelay: 2000,
      timeout: 20000,
      ...options,
    });
  }

  async scrape(searchCriteria) {
    this.isRunning = true;
    this.results = [];
    this.errors = [];

    try {
      const locations = searchCriteria.locations || [];
      const businessType = searchCriteria.businessType || 'real estate agency';

      for (const location of locations) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.searchBusinesses(businessType, location));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ location, error: error.message });
          logger.warn(`Failed to scrape Google Maps for ${location}: ${error.message}`);
        }
      }

      logger.info(`Google Maps scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async searchBusinesses(businessType, location) {
    const query = encodeURIComponent(`${businessType} in ${location}`);
    const url = `https://www.google.com/maps/search/${query}`;

    const { data: html } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(html);

    // Extract business info from Google Maps results
    const leads = [];
    $('.section-result').each((_, el) => {
      const name = $(el).find('.section-result-title').text().trim();
      const address = $(el).find('.section-result-location').text().trim();
      const rating = $(el).find('.section-result-rating').text().trim();

      if (name) {
        leads.push(
          this.normalizeLead({
            name,
            company: name,
            address,
            rating,
            sourceUrl: url,
          })
        );
      }
    });

    return leads;
  }
}

export default new GoogleMapsScraper();