import { detect } from "detect-browser"
import CryptoJS from "crypto-js"

const ENCRYPTION_KEY = "should be 24 characters."

export async function setupCounter(long: number, lat: number, language: Language) {
  const paciRequestQueryParam: PaciSearchByLongLatRequest = {
    x: long,
    y: lat,
    maplevel: null,
    mapscale: 2256.994353,
    xmin: long - 0.1,
    ymin: lat - 0.1,
    xmax: long + 0.1,
    ymax: lat + 0.1,
    language,
    currentlocationx: null,
    currentlocationy: null,
    userid: null,
    username: null,
    userlogintype: null,
    callerid: await getClientIp(),
    callertype: detect()?.name || "",
    callerversion: "undefined",
    calleros: navigator.userAgent,
    requesttime: toIsoStringWithTimezoneOffset(new Date())
  }
  const searchParams = buildQueryParams(paciRequestQueryParam)
  const encrypted = CryptoJS.TripleDES.encrypt(searchParams, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()

  const res = await fetch(`https://kfappsrv.paci.gov.kw/kuwaitfinder/server/api/search/identify?params=${encodeURIComponent(encrypted)}`)
  return await res.json()

  // navigator.geolocation.getCurrentPosition(async position => {
  // console.log("y = " + position.coords.latitude)
  // console.log("x = " + position.coords.longitude)
  // })
}

async function getClientIp(): Promise<string> {
  const response = await fetch('https://api.ipify.org/?format=json')
  const jsonResponse = (await response.json()) as { ip: string }
  return jsonResponse.ip
}

interface PaciSearchByLongLatRequest {
  x: number,
  y: number,
  maplevel: null
  mapscale: number
  xmin: number
  ymin: number
  xmax: number
  ymax: number
  language: Language
  currentlocationx: null
  currentlocationy: null
  userid?: null
  username?: null
  userlogintype?: null
  callerid: string
  callertype: string
  callerversion: string
  calleros: string
  requesttime: string
}


export const enum Language {
  EN = 'en',
  AR = 'ar'
}

// https://stackoverflow.com/a/17415677/5431968
function toIsoStringWithTimezoneOffset(date: Date) {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num: number) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}

function buildQueryParams(paciRequestQueryParam: PaciSearchByLongLatRequest): string {
  const record: Record<string, string> = {}
  for (const [key, value] of Object.entries(paciRequestQueryParam)) {
    record[key] = value?.toString() || ''
  }
  const params = new URLSearchParams(record)
  return params.toString()
}
