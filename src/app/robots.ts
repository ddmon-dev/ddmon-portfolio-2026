import type { MetadataRoute } from 'next';

const socialCrawlers = [
  'facebookexternalhit',
  'Twitterbot',
  'Slackbot-LinkExpanding',
  'LinkedInBot',
  'kakaotalk-scrap',
  'Discordbot',
  'TelegramBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: socialCrawlers, allow: '/' },
      { userAgent: '*', disallow: '/' },
    ],
  };
}
