import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

class RedditScraper extends BaseScraper {
  constructor(options = {}) {
    super('reddit', {
      maxRetries: 3,
      retryDelay: 3000,
      rateLimitDelay: 2000,
      timeout: 15000,
      ...options,
    });
  }

  async scrape(searchCriteria) {
    this.isRunning = true;
    this.results = [];
    this.errors = [];

    try {
      const subreddits = searchCriteria.subreddits || ['realestate', 'RealEstateInvesting'];
      const keywords = searchCriteria.keywords || [];

      for (const subreddit of subreddits) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.scrapeSubreddit(subreddit, keywords));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ subreddit, error: error.message });
          logger.warn(`Failed to scrape r/${subreddit}: ${error.message}`);
        }
      }

      logger.info(`Reddit scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async scrapeSubreddit(subreddit, keywords) {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=100`;
    const { data } = await axios.get(url, {
      timeout: this.options.timeout,
      headers: { 'User-Agent': 'AutoLeadsAI/1.0' },
    });

    const posts = data.data.children;
    const leads = [];

    for (const post of posts) {
      const postData = post.data;
      const text = `${postData.title} ${postData.selftext || ''}`.toLowerCase();

      // Check if post matches keywords
      const matchesKeyword =
        keywords.length === 0 || keywords.some((kw) => text.includes(kw.toLowerCase()));

      if (!matchesKeyword) continue;

      // Look for patterns that indicate a potential lead
      const interestedPatterns = [
        'looking for',
        'recommendation',
        'suggest',
        'agent',
        'broker',
        'realtor',
        'buying',
        'selling',
        'property',
      ];

      const isPotentialLead = interestedPatterns.some((pattern) =>
        text.includes(pattern)
      );

      if (isPotentialLead) {
        leads.push(
          this.normalizeLead({
            name: postData.author,
            company: '',
            sourceUrl: `https://reddit.com${postData.permalink}`,
            title: postData.title,
            subreddit,
            score: postData.score,
          })
        );
      }
    }

    return leads;
  }

  normalizeLead(rawData) {
    return {
      email: '', // Reddit doesn't expose email
      name: rawData.name,
      company: rawData.company || '',
      sourceUrl: rawData.sourceUrl,
      source: this.sourceName,
      raw: rawData,
    };
  }
}

export default new RedditScraper();