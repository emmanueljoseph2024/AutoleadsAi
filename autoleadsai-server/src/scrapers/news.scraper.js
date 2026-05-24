import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

class NewsScraper extends BaseScraper {
  constructor(options = {}) {
    super('news', {
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
      const queries = searchCriteria.queries || [
        'real estate market',
        'property development',
        'new real estate agency',
      ];

      for (const query of queries) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.searchNews(query));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ query, error: error.message });
          logger.warn(`Failed to search news for "${query}": ${error.message}`);
        }
      }

      logger.info(`News scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async searchNews(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://newsapi.org/v2/everything?q=${encodedQuery}&pageSize=100&sortBy=publishedAt`;

    const { data } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY || '',
      },
    });

    return (data.articles || []).map((article) =>
      this.normalizeLead({
        name: article.author || article.source?.name || '',
        company: article.source?.name || '',
        sourceUrl: article.url,
        title: article.title,
        publishedAt: article.publishedAt,
      })
    );
  }
}

export default new NewsScraper();