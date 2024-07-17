import {Injectable, signal, WritableSignal} from "@angular/core";
import {Circle, GoogleMap, Marker} from "@capacitor/google-maps";
import {environment} from "../../../environments/environment";
import {Geolocation, PermissionStatus, Position} from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class LocatorService {

  map: GoogleMap;
  mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "weight": 1.5
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  googleMap: any;
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
        zoom: 12,
        styles: this.mapStyles
      }
    });

    this.hideMapAttribution(mapRef);
    this.createInstanceOfMap(coordinates, mapRef);
    await this.markersHandler(coordinates);
  }

  private carsLocations: WritableSignal<any> = signal([
    { lat: 48.3915, lng: 25.9203, title: "Location 1", snippet: "This is location 1 in Chernivtsi", isVehicle: true },
    { lat: 48.4922, lng: 25.9355, title: "Location 2", snippet: "This is location 2 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.9478, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.9978, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.8478, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
    { lat: 48.1900, lng: 25.8278, title: "Location 3", snippet: "This is location 3 in Chernivtsi", isVehicle: true },
  ]);
  async markersHandler(coordinates): Promise<void> {
     this.carsLocations.update((allCars) => {
      return [...allCars, { lat: coordinates.lat, lng: coordinates.lng, title: "Your Location", snippet: "This is your current location", isVehicle: false }]
    })

    for (const location of this.carsLocations()) {
      await this.addMarkerToMap(location);
    }
  }

  createInstanceOfMap(coordinates,mapRef): void {
    this.googleMap = new google.maps.Map(mapRef.nativeElement, {
      center: { lat: coordinates.lat, lng: coordinates.lng },
      zoom: 9,
      disableDefaultUI: true,
      styles: this.mapStyles,
    });
  }

  async addMarkerToMap(location: { lat: number, lng: number, title: string, snippet: string, isVehicle: boolean }) {
    const marker: Marker = {
      coordinate: { lat: location.lat, lng: location.lng },
      title: location.title,
      snippet: location.snippet,
      draggable: false,
    };

    await this.map.addMarkers([marker]);
    this.addBounceAnimationToMarker({ coordinate: marker.coordinate, isVehicle: location.isVehicle });
  }
  addBounceAnimationToMarker(car) {
    new google.maps.Marker({
      position: car.coordinate,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: {
        url: car.isVehicle ? '/assets/icon/svg/car-marker.svg' : '/assets/icon/svg/marker.svg'
      }
    });
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
