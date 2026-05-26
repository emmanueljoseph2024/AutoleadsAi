import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../utils/logger.js';
import { getCachedOrFetch, cacheKeys, DEFAULT_TTL } from '../cache/cache.service.js';

export const generateLinkPreview = async (url) => {
  return getCachedOrFetch(
    cacheKeys.linkPreview(url),
    async () => {
      try {
        const { data: html } = await axios.get(url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });

        const $ = cheerio.load(html);

        const preview = {
          url,
          title: $('meta[property="og:title"]').attr('content') || $('title').text() || url,
          description:
            $('meta[property="og:description"]').attr('content') ||
            $('meta[name="description"]').attr('content') ||
            '',
          image:
            $('meta[property="og:image"]').attr('content') ||
            $('link[rel="icon"]').attr('href') ||
            null,
          favicon:
            $('link[rel="icon"]').attr('href') ||
            $('link[rel="shortcut icon"]').attr('href') ||
            '/favicon.ico',
          domain: new URL(url).hostname.replace('www.', ''),
          siteName: $('meta[property="og:site_name"]').attr('content') || '',
        };

        // Fix relative URLs
        if (preview.image && !preview.image.startsWith('http')) {
          preview.image = new URL(preview.image, url).toString();
        }
        if (preview.favicon && !preview.favicon.startsWith('http')) {
          preview.favicon = new URL(preview.favicon, url).toString();
        }

        return preview;
      } catch (error) {
        logger.warn(`Failed to generate link preview for ${url}: ${error.message}`);
        return {
          url,
          title: url,
          description: '',
          image: null,
          favicon: null,
          domain: new URL(url).hostname.replace('www.', ''),
          siteName: '',
        };
      }
    },
    DEFAULT_TTL.LINK_PREVIEW
  );
};