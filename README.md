# Experimenting with Kuwait's PACI Unofficial Geolocation REST API to Improve Use Address Extraction with Google Maps

[Link to Demo](#)

**tldr:** I want to use Google Maps to pin point my location and get my correct address with all required fields for Kuwait addresses, which is what most delivery apps do in Kuwait (deliveroo, talabat). But often times Google Maps returns incorrect data. So I made a demo on how to use Google Maps for user pin pointing and PACI api for extracting correct address info.

---

Most apps try to both simplify address input and improve address guessing accuracy. In most delivery apps in Kuwait they display Google Maps widget where the user pinpoint their location and the app tries to extract their address based on the pin point. Most of the time it's incorrect.

While Google maps does obtain accurate address data in most countries. That's not true for Kuwait addresses. I don't know why but my guesses are the following:

1. Google Maps may have incomplete data for Kuwait.
2. Perhaps Kuwait has specific field requirements for addresses that are not supported by Google Maps such as district and block.

Luckily, [Kuwait Finder](https://gis.paci.gov.kw/) has accurate data for Kuwait addresses and provides all necessary address fields. While they do expose maps UI, I'd still prefer to use Google maps: Better UX Experience, better accessibility support, can easily be embedded in web/mobile apps, and has exaustive well documented api.

In this demo, I show a basic example how to Google Maps with Kuwait Finder Inoficcial geolocation APIs.

The demo is actually straightforward:
1. User pin point their location on Google Maps.
2. Take the lat/long and send it to PACI to get the full address.

# Kuwait PACI Exposes an Unofficial REST API to Get an Address Given a Long/Lat

Example request:

https://kfappsrv.paci.gov.kw/kuwaitfinder/server/api/search/identify?params=JNTH7hVI%2BuLjw8cKOTjVKY989P%2FeozxhItA8DCVJ7YOLnbXzccIfzIG2OLxrsRbIqD5DFyxnNIui0nN8DS0V3WOOZv8GoLe0McXdrHCFGIUKU1sew1wm89l6xk6qwqmTMRIocfAH5IAbtTBBtN7TigaLO0VwT25Ja8bacRF7UpjFRbipqQF5I1oTX5WhaBUIb%2F2em%2FXomb009g8EQrkTc7nSbm%2FrfY%2FS%2B5K8wF7EJRDsZWhOK4YePBctCZhkdgtNGb8BMYwLeWy%2FlGigEBsldD2iRbgIiZ%2F0H686lMMk87z4HmmZbhx3inJNziRjDPKX2jNyE5gig%2FS5dIGTEVYBVKBU%2BWUkqz%2Fvm2JwzgB%2FuxqkeK3gwLHnB9RZyLdOFpr5Yg4ZeExIUtm9Nqt9kSGJ6bisN1PekPC8TsZoAMiE9PQeDW3kUhGyDF3PTttzsUEH9fQQEAOi2MCqxKtbAhXQX1f5E3Qng0OKkf%2BUrM1Cd2ONquBDCpPK7F%2FkxCuzseHXzqbCM01eH02uW%2F4bhQHe1tBYAtnatYFgs76VT%2BeAMzVLVfijeMgab%2FvWcPZ%2Bw75j4%2F6bH6EaqiP5ME0idv4isHiKI4GRl1rOeYH22hqcr%2F6qPiEEBw%2FDGy3e22H0wC%2F3yO0jY80jSD6P1tUfWrDJtnKpkHQSucM4vyHO%2BKMDsDbRjRD77X0V%2BXBmNfkJ2Mpb9gwG4KpOXl0%3D

How to construct `params` query parameter:

## 1. Build the query parameters

Below is an example I got from Chrome Dev tools when you visit https://gis.paci.gov.kw/Location/48.100216/29.215362

```ini
x=48.100216
&y=29.215362
&maplevel=
&mapscale=2256.994353
&xmin=47.77940063476482
&ymin=28.857864462816597
&xmax=47.820599365233555
&ymax=29.863234359727123
&language=ar
&currentlocationx=
&currentlocationy=
&userid=
&username=
&userlogintype=
&callerid=178.61.224.228
&callertype=Chrome
&callerversion=undefined
&calleros=Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F115.0.0.0%20Safari%2F537.36%20Edg%2F115.0.1901.188
&requesttime=2023-08-09T22%3A09%3A50%2B03%3A00
```

## 2. Encrypt the Query Parameters

You can find out how it's encrypted also from Chrome Dev tools.

![Alt text](assets/image.png))

## 3. Encode Encrypted Query Parameters for URI

use `encodeURIComponent` to encode the encrypted data

## 4. Fetch from PACI

```javascript
const encoded = encodeURIComponent(encryptedQueryParams)
const result = await fetch(`https://kfappsrv.paci.gov.kw/kuwaitfinder/server/api/search/identify?params=${encoded}`)
```
