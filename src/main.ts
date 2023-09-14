import './style.css'

import { Language, getPaciData } from './get-paci-data.ts'
import { PaciResult } from './paci-result.ts';

async function main(): Promise<void> {
  navigator.permissions.query({ name: "geolocation" }).then(async (result) => {
    if (result.state === "granted") {
      navigator.geolocation.getCurrentPosition(async pos => {
        await displayMap(pos.coords.latitude, pos.coords.longitude)
      })
    } else {
      await displayMap(29.340395, 47.981989)
    }
  });
}

main()

async function displayMap(lat: number, long: number) {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

  const position: google.maps.LatLngLiteral = { lat, lng: long },
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: position,
      zoom: 17,
      mapId: 'MY_AWESOME_MAP'
    });

  const infoWindow = new InfoWindow();

  const draggableMarker = new Marker({
    map: map,
    position,
    title: 'Uluru',
  });

  let newPos: google.maps.LatLng | undefined = undefined

  map.addListener("idle",async () => {
    newPos = draggableMarker.getPosition() as google.maps.LatLng;
    const res = await getPaciData(newPos.lng(), newPos.lat(), Language.EN) as PaciResult
    infoWindow.open(draggableMarker.getMap(), draggableMarker);
    if (res.Error != null) {
      infoWindow.setContent(buildPinPopupContent(`Something went wrong`));
    } else {
      infoWindow.setContent(buildPinPopupContent(res.Result[0].DetailsEnglish));
      populateFields(res)
    }

    infoWindow.open(draggableMarker.getMap(), draggableMarker);
  })

  map.addListener("bounds_changed", () => {
    infoWindow.close()
    const center = map.getCenter()
    draggableMarker.setPosition(center)
    newPos = center
  })

  map.addListener("dragend", async () => {
    const newPosition = draggableMarker.getPosition() as google.maps.LatLng;
    const res = await getPaciData(newPosition.lng(), newPosition.lat(), Language.EN) as PaciResult
    if (res.Error != null) {
      infoWindow.setContent(buildPinPopupContent(`Something went wrong`));
    } else {
      infoWindow.setContent(buildPinPopupContent(res.Result[0].DetailsEnglish));
      populateFields(res)
      console.log(res.Result[0])
    }
    infoWindow.open(draggableMarker.getMap(), draggableMarker);
  });

}

function buildPinPopupContent(text: string) {
  const el = document.createElement('div');
  el.className = "text-black font-bold"
  el.textContent = text
  return el
}

function populateFields(res: PaciResult) {
  document.querySelector('#governorate')!.textContent = res.Result[0].GovernorateEnglish
  document.querySelector('#city')!.textContent = res.Result[0].NeighborhoodEnglish
  document.querySelector('#block')!.textContent = res.Result[0].BlockEnglish
  document.querySelector('#street')!.textContent = res.Result[0].StreetEnglish
  document.querySelector('#house')!.textContent = res.Result[0].HouseEnglish
  document.querySelector('#parcel')!.textContent = res.Result[0].ParcelEnglish
  document.querySelector('#governorate-ar')!.textContent = res.Result[0].GovernorateArabic
  document.querySelector('#city-ar')!.textContent = res.Result[0].NeighborhoodArabic
  document.querySelector('#block-ar')!.textContent = res.Result[0].BlockArabic
  document.querySelector('#street-ar')!.textContent = res.Result[0].StreetArabic
  document.querySelector('#house-ar')!.textContent = res.Result[0].HouseArabic
  document.querySelector('#parcel-ar')!.textContent = res.Result[0].ParcelArabic
}
