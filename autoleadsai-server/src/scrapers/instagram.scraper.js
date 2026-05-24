import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

class InstagramScraper extends BaseScraper {
  constructor(options = {}) {
    super('instagram', {
      maxRetries: 2,
      retryDelay: 8000,
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
      const hashtags = searchCriteria.hashtags || ['realestate', 'realestateagent'];

      for (const hashtag of hashtags) {
        await this.rateLimit();

        try {
          const leads = await this.scrapeHashtag(hashtag);
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ hashtag, error: error.message });
          logger.warn(`Failed to scrape #${hashtag}: ${error.message}`);
        }
      }

      logger.info(`Instagram scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async scrapeHashtag(hashtag) {
    // Instagram requires authentication for API access
    // This is a placeholder using the Basic Display API
    const url = `https://graph.instagram.com/v12.0/ig_hashtag_search?user_id=${process.env.INSTAGRAM_USER_ID}&q=${hashtag}`;

    const { data } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN || ''}`,
      },
    });

    return (data.data || []).map((post) =>
      this.normalizeLead({
        name: post.username || '',
        company: '',
        sourceUrl: post.permalink || '',
        caption: post.caption || '',
      })
    );
  }
}

export default new InstagramScraper();