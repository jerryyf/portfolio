export type VisitorDetails = {
  status: string
  ip: string
  userAgent: string
  country?: string
  region?: string
  city?: string
  zip?: string
  lat?: number
  lon?: number
  timezone?: string
  isp?: string
  org?: string
}

function formatVisitMessage(visitor: VisitorDetails) {
  if (visitor.status === 'fail') {
    return `New visit:\nUser agent: ${visitor.userAgent}\nIP: ${visitor.ip}\nGeo lookup failed`
  }

  return `New visit:\nUser agent: ${visitor.userAgent}\nIP: ${visitor.ip}\nISP: ${visitor.isp}\nOrg: ${visitor.org}\nCountry: ${visitor.country}\nRegion: ${visitor.region}\nCity: ${visitor.city}\nZip: ${visitor.zip}\nLat: ${visitor.lat} Lon: ${visitor.lon}\nTimezone: ${visitor.timezone}`
}

export async function sendVisitNotification(visitor: VisitorDetails) {
  const botToken = process.env.BOT_TOKEN
  const chatId = process.env.CHAT_ID

  if (!botToken || !chatId) {
    throw new Error('BOT_TOKEN and CHAT_ID must be configured')
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatVisitMessage(visitor),
      }),
      signal: AbortSignal.timeout(3000),
    },
  )

  if (!response.ok) {
    throw new Error(`Telegram returned HTTP ${response.status}`)
  }
}
