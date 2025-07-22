import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

export default async function handler(req, res) {
  try {
    const rssUrl = 'https://minjust.gov.ru/ru/subscription/rss/extremist_materials/';
    const response = await fetch(rssUrl);
    const xml = await response.text();

    const parser = new XMLParser();
    const json = parser.parse(xml);
    const items = json.rss.channel.item || [];

    const titles = items.map(i => i.title?.toLowerCase().trim()).filter(Boolean);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(titles);
  } catch (error) {
    console.error('[Vercel Proxy Error]:', error);
    res.status(500).json({ error: 'Ошибка при загрузке данных' });
  }
}
