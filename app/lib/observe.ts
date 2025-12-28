import { headers } from 'next/headers'
import { triggerLambda } from './lambda'
  
  export async function observe() {
    const headersList = headers()
    const forwardedFor = (await headersList).get('x-forwarded-for') || ''
    const ip = forwardedFor.split(',')[0]
    const userAgent = (await headersList).get('User-Agent') || 'error'

    const url = 'http://ip-api.com/json'
    let res = await fetch(url + '/' + ip)
    let data = await res.json()

    if (userAgent.includes('kube-probe')) {
        return
    }

    if (data.status != 'fail') {
      let payload = {
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
        ip: data.query,
        userAgent: userAgent
      }
      triggerLambda(payload)
    }
    else {
        let payload = {
            status: data.status,
            ip: ip,
            userAgent: userAgent
        }
        triggerLambda(payload)
    }
  }