import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

class TwitterScraper extends BaseScraper {
  constructor(options = {}) {
    super('twitter', {
      maxRetries: 3,
      retryDelay: 5000,
      rateLimitDelay: 3000,
      timeout: 15000,
      ...options,
    });
  }

  async scrape(searchCriteria) {
    this.isRunning = true;
    this.results = [];
    this.errors = [];

    try {
      const queries = searchCriteria.queries || ['real estate looking for agent'];

      for (const query of queries) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.searchTweets(query));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ query, error: error.message });
          logger.warn(`Failed to search Twitter for "${query}": ${error.message}`);
        }
      }

      logger.info(`Twitter scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async searchTweets(query) {
    // Note: Twitter/X API v2 requires authentication
    // This uses the free search endpoint (requires bearer token)
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodedQuery}&max_results=100&tweet.fields=author_id,text,created_at`;

    const { data } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN || ''}`,
      },
    });

    const leads = [];
    for (const tweet of data.data || []) {
      const isPotentialLead = this.analyzeIntent(tweet.text);
      if (isPotentialLead) {
        leads.push(
          this.normalizeLead({
            name: `@${tweet.author_id}`,
            company: '',
            sourceUrl: `https://twitter.com/i/web/status/${tweet.id}`,
            text: tweet.text,
          })
        );
      }
    }

    return leads;
  }

  analyzeIntent(text) {
    const intentPatterns = [
      'looking for',
      'recommend',
      'need an agent',
      'anyone know',
      'suggestions',
      'help finding',
      'searching for',
    ];
    return intentPatterns.some((pattern) => text.toLowerCase().includes(pattern));
  }
}

export default new TwitterScraper();