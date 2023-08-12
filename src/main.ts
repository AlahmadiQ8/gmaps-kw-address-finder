import './style.css'

import { Language, getPaciData } from './get-paci-data.ts'
import { PaciResult } from './paci-result.ts';

async function main(): Promise<void> {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  navigator.geolocation.getCurrentPosition(async pos => {
    const position: google.maps.LatLngLiteral = { lat: pos.coords.latitude, lng: pos.coords.longitude },
      map = new Map(document.getElementById("map") as HTMLElement, {
        center: position,
        zoom: 17,
        mapId: 'MY_AWESOME_MAP'
      });

    const infoWindow = new InfoWindow();

    const draggableMarker = new AdvancedMarkerElement({
      map: map,
      position,
      title: 'Uluru',
      gmpDraggable: true
    });

    infoWindow.open(draggableMarker.map, draggableMarker);
    infoWindow.setContent(buildPinPopupContent(`Drag me`));

    draggableMarker.addListener('dragend', async () => {
      const newPosition = draggableMarker.position as google.maps.LatLngLiteral;
      infoWindow.close();
      const res = await getPaciData(newPosition.lng, newPosition.lat, Language.EN) as PaciResult
      if (res.Error != null) {
        infoWindow.setContent(buildPinPopupContent(`Something went wrong`));
      } else {
        infoWindow.setContent(buildPinPopupContent(res.Result[0].DetailsEnglish));
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
        console.log(res.Result[0])
      }
      infoWindow.open(draggableMarker.map, draggableMarker);
    });

    const res = await getPaciData(position.lng, position.lat, Language.EN) as PaciResult
    console.log(res)
  })
}

main()



function buildPinPopupContent(text: string) {
  const el = document.createElement('div');
  el.className = "text-black font-bold"
  el.textContent = text
  return el
}
