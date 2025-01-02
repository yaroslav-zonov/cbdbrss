function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssXml(items) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Translation DB</title>
    <link>http://example.com/modified_feed</link>
    <description>База переводов комиксов.</description>
    ${items.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <media_thumbnail>${escapeXml(item.media_thumbnail)}</media_thumbnail>
    </item>`).join('')}
  </channel>
</rss>`;