import './style.css'

import { Language, setupCounter } from './counter.ts'
import { PaciResult } from './paci-result.ts';

async function initMap(): Promise<void> {
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
      // content: buildHtml(position),
      gmpDraggable: true
    });

    infoWindow.open(draggableMarker.map, draggableMarker);
    infoWindow.setContent(buildHtml2(`Drag me`));

    draggableMarker.addListener('dragend', async () => {
      const newPosition = draggableMarker.position as google.maps.LatLngLiteral;
      infoWindow.close();
      const res = await setupCounter(newPosition.lng, newPosition.lat, Language.EN) as PaciResult
      if (res.Error != null) {
        infoWindow.setContent(buildHtml2(`Something went wrong`));
      } else {
        infoWindow.setContent(buildHtml2(res.Result[0].DetailsEnglish));
      }
      infoWindow.open(draggableMarker.map, draggableMarker);
    });

    const res = await setupCounter(position.lng, position.lat, Language.EN) as PaciResult
    console.log(res)
  })
}

initMap()



function buildHtml2(text: string) {
  const el = document.createElement('div');
  el.className = "text-black"
  el.textContent = text
  return el
}
