import express from 'express';
import schedule from 'node-schedule';
import { processRssFeed } from './src/rssProcessor.js';
import { generateRssXml } from './src/rssGenerator.js';

const RSS_URL = 'https://comicsdb.ru/rss';
const PORT = process.env.PORT || 3000;

const app = express();
let cachedRss = '';

async function updateRssCache() {
  console.log('Updating RSS cache...');
  const items = await processRssFeed(RSS_URL);
  cachedRss = generateRssXml(items);
}

// Update cache every 30 minutes
schedule.scheduleJob('*/30 * * * *', updateRssCache);

// Main route serves RSS feed
app.get('/', (req, res) => {
  res.set('Content-Type', 'application/rss+xml');
  res.send(cachedRss);
});

// Initialize cache and start server
updateRssCache().then(() => {
  app.listen(PORT, () => {
    console.log(`RSS feed server running on port ${PORT}`);
  });
});