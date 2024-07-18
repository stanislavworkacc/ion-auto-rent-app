import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {Circle, GoogleMap, Marker} from "@capacitor/google-maps";
import {environment} from "../../../environments/environment";
import {Geolocation, PermissionStatus, Position} from '@capacitor/geolocation';
import {MarkerClickCallbackData} from "@capacitor/google-maps/dist/typings/definitions";
import {ModalController} from "@ionic/angular/standalone";
import {mapStyles} from "./locator-general";
import {MarkerModalComponent} from "./marker-modal/marker-modal.component";
@Injectable({
  providedIn: 'root'
})
export class LocatorService {

  private modalCtrl: ModalController = inject(ModalController);

  private carsLocations: WritableSignal<any> = signal([
    { lat: 48.3915, lng: 25.9203, title: "Location 1", snippet: "This is location 1 in Chernivtsi", isVehicle: true },
    { lat: 48.4922, lng: 25.9355, title: "Location 2", snippet: "This is location 2 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.9478, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.9978, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.8478, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.8278, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
  ]);

  map: GoogleMap;
  async createGoogleMap(mapRef): Promise<void> {
    await this.checkAndRequestPermissions()
    const coordinates = await this.getCurrentPosition();
    // @ts-ignore
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.GOOGLE_KEY,
      forceCreate: false,
      element: mapRef.nativeElement,
      language: 'uk',
      config: {
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
        center: {
          lat: coordinates.lat,
          lng: coordinates.lng
        },
        zoom: 8,
        styles: mapStyles
      }
    });

    this.hideMapAttribution(mapRef);
    await this.markersHandler(coordinates);
    await this.setMarkerClickListener();
  }

  async markersHandler(coordinates): Promise<void> {
     this.carsLocations.update((allCars) => {
      return [...allCars, { lat: coordinates.lat, lng: coordinates.lng, title: "Your Location", snippet: "This is your current location", isVehicle: false }]
    })

    for (const location of this.carsLocations()) {
      await this.addMarkerToMap(location);
    }
  }


  async setMarkerClickListener(): Promise<void> {
    await this.map.setOnMarkerClickListener(async (callback: MarkerClickCallbackData): Promise<void> => {
      const markerPosition = callback.latitude ? { lat: callback.latitude, lng: callback.longitude } : { lat: 0, lng: 0 };

      await this.map.setCamera({
        coordinate: markerPosition,
        zoom: 12,
        animate: true,
        angle: 2,
        bearing: 520
      });
      //
      // const modal = await this.modalCtrl.create({
      //   component: MarkerModalComponent,
      //   cssClass: 'auth-modal',
      //   componentProps: { marker: markerPosition },
      //   initialBreakpoint: 0.9,
      //   breakpoints: [0, 1]
      // });
      //
      // await modal.present();
    });
  }
  async addMarkerToMap(location: { lat: number, lng: number, title: string, snippet: string, isVehicle: boolean }) {
    const markerPath = !location.isVehicle ? '/assets/icon/user-geo-marker.png' : '/assets/icon/gps-big.png';
    const marker: Marker = {
      coordinate: { lat: location.lat, lng: location.lng },
      title: location.title,
      snippet: location.snippet,
      draggable: false,
      iconUrl: markerPath,
      iconSize: { width: 40, height: 40 },
    };

    await this.map.addMarkers([marker]);
  }

  hideMapAttribution(mapRef): void {
    const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]): void => {
      const elements = document.querySelectorAll('.gm-style-cc, .gmnoprint, .gmnoscreen, .gm-style-cc div[style*="position: relative"]');
      if (elements.length) {
        elements.forEach((el: any) => (el.style.display = 'none'));
        observer.disconnect();
      }
    });

    observer.observe(mapRef.nativeElement, { childList: true, subtree: true });
  }

  async getCurrentPosition(): Promise<{ lat: number, lng: number }> {
    const position: Position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  }

  async checkAndRequestPermissions(): Promise<void> {
    const permissions: PermissionStatus = await Geolocation.checkPermissions();
    if (permissions.location === 'denied') {
      await Geolocation.requestPermissions();
    }
  }


}
