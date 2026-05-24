import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import * as cheerio from 'cheerio';
import axios from 'axios';

class WebsiteScraper extends BaseScraper {
  constructor(options = {}) {
    super('website', {
      maxRetries: 2,
      retryDelay: 3000,
      rateLimitDelay: 1000,
      timeout: 15000,
      ...options,
    });
  }

  async scrape(searchCriteria) {
    this.isRunning = true;
    this.results = [];
    this.errors = [];

    try {
      const urls = searchCriteria.urls || [];

      if (urls.length === 0) {
        logger.warn('No URLs provided for website scrape');
        return [];
      }

      for (const url of urls) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.scrapeUrl(url));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ url, error: error.message });
          logger.warn(`Failed to scrape ${url}: ${error.message}`);
        }
      }

      logger.info(`Website scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async scrapeUrl(url) {
    const { data: html } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(html);
    const leads = [];

    // Extract email addresses
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const bodyText = $('body').text();
    const emails = bodyText.match(emailRegex) || [];

    // Extract names (look for common patterns)
    const nameSelectors = [
      '.name', '.full-name', '.contact-name',
      '[itemprop="name"]', '.author', '.profile-name',
    ];

    const names = [];
    nameSelectors.forEach((selector) => {
      $(selector).each((_, el) => {
        const name = $(el).text().trim();
        if (name && name.length > 2 && name.length < 100) {
          names.push(name);
        }
      });
    });

    // Pair emails with names where possible
    const uniqueEmails = [...new Set(emails)];
    uniqueEmails.forEach((email, index) => {
      leads.push(
        this.normalizeLead({
          email: this.sanitizeEmail(email),
          name: names[index] || '',
          company: this.extractDomain(url),
          sourceUrl: url,
        })
      );
    });

    return leads;
  }
}

export default new WebsiteScraper();