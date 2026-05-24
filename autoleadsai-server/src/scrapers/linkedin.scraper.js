import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';

class LinkedinScraper extends BaseScraper {
  constructor(options = {}) {
    super('linkedin', {
      maxRetries: 3,
      retryDelay: 10000,
      rateLimitDelay: 5000,
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
      // Dynamic import of puppeteer (only when this scraper is used)
      const puppeteer = await import('puppeteer-extra');
      const StealthPlugin = await import('puppeteer-extra-plugin-stealth');
      puppeteer.default.use(StealthPlugin.default());

      this.browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      this.page = await this.browser.newPage();
      await this.page.setViewport({ width: 1280, height: 800 });

      // Navigate to LinkedIn search
      const searchUrl = this.buildSearchUrl(searchCriteria);
      await this.page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Scroll to load more results
      await this.scrollResults(searchCriteria.maxResults || 50);

      // Extract profiles
      const profiles = await this.extractProfiles();

      // Normalize to common format
      this.results = profiles
        .map((profile) => this.normalizeLead(profile))
        .filter((lead) => this.isValidLead(lead));

      logger.info(`LinkedIn scrape completed: ${this.results.length} leads found`);
      return this.results;

    } catch (error) {
      this.errors.push(error.message);
      logger.error('LinkedIn scrape failed:', error);
      return [];
    } finally {
      await this.cleanup();
      this.isRunning = false;
    }
  }

  buildSearchUrl(criteria) {
    const keywords = encodeURIComponent(criteria.keywords || 'real estate');
    const location = criteria.location ? `&location=${encodeURIComponent(criteria.location)}` : '';
    return `https://www.linkedin.com/search/results/people/?keywords=${keywords}${location}`;
  }

  async scrollResults(maxResults) {
    let previousHeight = 0;
    let scrolls = 0;
    const maxScrolls = Math.ceil(maxResults / 10);

    while (scrolls < maxScrolls) {
      await this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await this.sleep(2000);

      const newHeight = await this.page.evaluate('document.body.scrollHeight');
      if (newHeight === previousHeight) break;
      previousHeight = newHeight;
      scrolls++;
    }
  }

  async extractProfiles() {
    return await this.page.evaluate(() => {
      const profileElements = document.querySelectorAll('.search-result__info');
      return Array.from(profileElements).map((el) => ({
        name: el.querySelector('.actor-name')?.textContent?.trim() || '',
        title: el.querySelector('.subline-level-1')?.textContent?.trim() || '',
        company: el.querySelector('.subline-level-2')?.textContent?.trim() || '',
        profileUrl: el.querySelector('a.search-result__result-link')?.href || '',
      }));
    });
  }

  normalizeLead(rawData) {
    return {
      email: '', // LinkedIn doesn't expose email – requires enrichment
      name: rawData.name,
      company: rawData.company,
      sourceUrl: rawData.profileUrl,
      source: this.sourceName,
      raw: rawData,
    };
  }

  async cleanup() {
    if (this.page) await this.page.close().catch(() => {});
    if (this.browser) await this.browser.close().catch(() => {});
  }
}

export default new LinkedinScraper();