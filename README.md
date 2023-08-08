# Experimenting with Kuwait's PACI Unofficial Geolocation REST API to Improve Use Address Extraction

Most apps try to both simplify address input and improve address guessing accuracy. In most delivery apps in Kuwait I noticed two methods, which both fail extract accurate address fields:

1. Access Location service (web or mobile) and obtain address fields from Google Maps API.
2. Have the customer pinpoint their address on Google maps.

While Google maps does obtain accurate address data in most countries. That's not true for Kuwait addresses. I don't know why but my guesses are the following:

1. Google Maps may have incomplete data for Kuwait.
2. Perhaps Kuwait has specific field requirements for addresses that are not supported by Google Maps such as district and block.

Luckily, these two problems are solved by [Kuwait Finder](https://gis.paci.gov.kw/) has accurate data for Kuwait addresses and provides all necessary address fields.

<!-- That said, it doesn't have the bells and whistles of Google maps: Better UX Experience, better accessibility support, can easily be embedded in web/mobile apps, and has exaustive maps api.  -->

Below I explore improving the two methods mentioned above using Kuwait Finder unofficial geolocation API.

# Kuwait PACI Exposes an Unofficial REST API to Get an Address Given a Long/Lat

I tried searching for official api or sdk and the only resource I found was this page which was not very helpful: https://kf3appsrv.paci.gov.kw/pacidocumentation/index.html

All I wanted was an API that takes an input and generates an output as follows:
* **Input:** Long/Lat
* **Output:** All Kuwait's required Address Field: District, Block, Avenue, Street, House number.

I was able to find such API while inspecting the ajax requests in https://gis.paci.gov.kw/Search/. It wasn't easy tasks since the API takes encrypted and encoded query parameters. Using Chrome dev tools, I was able to figure out how the encryption and encoding occurs.

