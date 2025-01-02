import Parser from 'rss-parser';
import * as cheerio from 'cheerio';

const parser = new Parser();

export async function processRssFeed(url) {
  try {
    const feed = await parser.parseURL(url);
    return feed.items.map(entry => {
      const $ = cheerio.load(entry.content || '');
      const imgTag = $('img').first();
      let imgSrc = '';

      if (imgTag.length) {
        imgSrc = imgTag.attr('src') || '';
        imgTag.remove();
        
        if (imgSrc.includes('scale_avatar')) {
          imgSrc = imgSrc.replace('scale_avatar', 'scale_large');
        }
      }

      return {
        title: entry.title,
        link: entry.link,
        description: $.html(),
        media_thumbnail: imgSrc
      };
    });
  } catch (error) {
    console.error('Error processing RSS feed:', error);
    return [];
  }
}