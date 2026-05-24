import linkedinScraper from './linkedin.scraper.js';
import websiteScraper from './website.scraper.js';
import redditScraper from './reddit.scraper.js';
import facebookScraper from './facebook.scraper.js';
import twitterScraper from './twitter.scraper.js';
import instagramScraper from './instagram.scraper.js';
import googleMapsScraper from './googleMaps.scraper.js';
import newsScraper from './news.scraper.js';
import apolloScraper from './apollo.scraper.js';
import { BaseScraper } from './base.scraper.js';

// Map of source names to scraper instances
export const scraperMap = {
  linkedin: linkedinScraper,
  website: websiteScraper,
  reddit: redditScraper,
  facebook: facebookScraper,
  twitter: twitterScraper,
  instagram: instagramScraper,
  google_maps: googleMapsScraper,
  news: newsScraper,
  apollo: apolloScraper,
};

// Get scraper for a specific source
export const getScraper = (source) => {
  const scraper = scraperMap[source];
  if (!scraper) {
    throw new Error(`No scraper found for source: ${source}`);
  }
  return scraper;
};

// Get all supported sources
export const getSupportedSources = () => Object.keys(scraperMap);

// Run scrape for a specific source
export const runScrape = async (source, criteria) => {
  const scraper = getScraper(source);
  return await scraper.scrape(criteria);
};

// Run scrape for multiple sources in parallel
export const runMultiScrape = async (sources, criteria) => {
  const results = {};
  const errors = {};

  const promises = sources.map(async (source) => {
    try {
      results[source] = await runScrape(source, criteria);
    } catch (error) {
      errors[source] = error.message;
    }
  });

  await Promise.allSettled(promises);

  return { results, errors };
};

export { BaseScraper };