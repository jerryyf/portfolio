import { sendVisitNotification, type VisitorDetails } from './telegram'

type GeoLookup = {
  status: string
  country?: string
  regionName?: string
  city?: string
  zip?: string
  lat?: number
  lon?: number
  timezone?: string
  isp?: string
  org?: string
  query?: string
}

export async function observe(ip: string, userAgent: string) {
  if (userAgent.includes('kube-probe')) {
    return
  }

  const response = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}`)
  const data = (await response.json()) as GeoLookup

  const visitor: VisitorDetails = data.status === 'fail'
    ? { status: data.status, ip, userAgent }
    : {
        status: data.status,
        country: data.country,
        region: data.regionName,
        city: data.city,
        zip: data.zip,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        isp: data.isp,
        org: data.org,
        ip: data.query || ip,
        userAgent,
      }

  await sendVisitNotification(visitor)
}
