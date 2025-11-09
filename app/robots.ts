import { baseUrl } from 'app/sitemap'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
      {
        userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
        disallow: ['/']
      },
      {
        disallow: '/admin'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
