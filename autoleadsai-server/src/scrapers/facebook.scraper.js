import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';

class FacebookScraper extends BaseScraper {
  constructor(options = {}) {
    super('facebook', {
      maxRetries: 2,
      retryDelay: 10000,
      rateLimitDelay: 5000,
      timeout: 30000,
      ...options,
    });
    this.browser = null;
    this.page = null;
  }

  async scrape(searchCriteria) {
    this.isRunning = true;
    this.results = [];
    this.errors = [];

    try {
      const puppeteer = await import('puppeteer-extra');
      const StealthPlugin = await import('puppeteer-extra-plugin-stealth');
      puppeteer.default.use(StealthPlugin.default());

      this.browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1280, height: 800 });

      // Search Facebook pages/groups
      const searchUrl = this.buildSearchUrl(searchCriteria);
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Extract page info
      const pages = await this.extractPages();
      this.results = pages
        .map((page) => this.normalizeLead(page))
        .filter((lead) => this.isValidLead(lead));

      logger.info(`Facebook scrape completed: ${this.results.length} leads found`);
      return this.results;

    } catch (error) {
      this.errors.push(error.message);
      logger.error('Facebook scrape failed:', error);
      return [];
    } finally {
      await this.cleanup();
      this.isRunning = false;
    }
  }

  buildSearchUrl(criteria) {
    const query = encodeURIComponent(criteria.keywords || 'real estate');
    return `https://www.facebook.com/search/pages/?q=${query}`;
  }

  async extractPages() {
    return await this.page.evaluate(() => {
      const elements = document.querySelectorAll('[role="article"]');
      return Array.from(elements).map((el) => ({
        name: el.querySelector('a[role="link"]')?.textContent?.trim() || '',
        category: el.querySelector('.category')?.textContent?.trim() || '',
        url: el.querySelector('a[role="link"]')?.href || '',
        followers: el.querySelector('.followers')?.textContent?.trim() || '',
      }));
    });
  }

  async cleanup() {
    if (this.page) await this.page.close().catch(() => {});
    if (this.browser) await this.browser.close().catch(() => {});
  }
}

export default new FacebookScraper();