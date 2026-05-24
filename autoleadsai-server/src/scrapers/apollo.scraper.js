import { BaseScraper } from './base.scraper.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

class ApolloScraper extends BaseScraper {
  constructor(options = {}) {
    super('apollo', {
      maxRetries: 3,
      retryDelay: 5000,
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
      const queries = searchCriteria.queries || [];
      const maxResults = searchCriteria.maxResults || 25;

      for (const query of queries) {
        await this.rateLimit();

        try {
          const leads = await this.withRetry(() => this.searchContacts(query, maxResults));
          this.results.push(...leads);
        } catch (error) {
          this.errors.push({ query, error: error.message });
          logger.warn(`Failed to search Apollo for "${query}": ${error.message}`);
        }
      }

      logger.info(`Apollo scrape completed: ${this.results.length} leads found`);
      return this.results;

    } finally {
      this.isRunning = false;
    }
  }

  async searchContacts(query, maxResults) {
    // Apollo.io API (requires API key)
    const url = 'https://api.apollo.io/v1/mixed_people/search';

    const { data } = await axios.post(
      url,
      {
        api_key: process.env.APOLLO_API_KEY || '',
        q_keywords: query,
        per_page: maxResults,
        page: 1,
      },
      {
        timeout: this.options.timeout,
      }
    );

    return (data.people || []).map((person) =>
      this.normalizeLead({
        email: person.email || '',
        name: person.name || '',
        company: person.organization?.name || '',
        title: person.title || '',
        sourceUrl: person.linkedin_url || '',
      })
    );
  }

  normalizeLead(rawData) {
    return {
      email: this.sanitizeEmail(rawData.email),
      name: rawData.name,
      company: rawData.company,
      sourceUrl: rawData.sourceUrl,
      source: this.sourceName,
      raw: rawData,
    };
  }
}

export default new ApolloScraper();