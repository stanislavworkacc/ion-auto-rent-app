import {Injectable} from "@angular/core";
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

    this.googleMap = new google.maps.Map(mapRef.nativeElement, {
      center: { lat: coordinates.lat, lng: coordinates.lng },
      zoom: 9,
      disableDefaultUI: true,
      styles: this.mapStyles,
    });

    await this.addMarkerToMap(coordinates);
    this.hideMapAttribution(mapRef);
  }

  async addMarkerToMap(coordinates: { lat: number, lng: number }) {
    const marker: Marker = {
      coordinate: coordinates,
      title: "Your Location",
      snippet: "This is your current location",
      draggable: false,
      iconUrl: '/assets/icon/svg/marker.svg'
    };

    await this.map.addMarkers([marker]);
    this.addBounceAnimationToMarker(coordinates);
  }

  addBounceAnimationToMarker(coordinates: { lat: number, lng: number }) {
    new google.maps.Marker({
      position: coordinates,
      map: this.googleMap,
      title: "Your Location",
      animation: google.maps.Animation.DROP,
      icon: {
        url: '/assets/icon/svg/marker.svg'
      }
    });
  }

  async addCircleToMap(coordinates: { lat: number, lng: number }) {
    const circle: Circle = {
      center: coordinates,
      radius: 2000,
      strokeColor: '#122c56',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#a0a2a8',
      fillOpacity: 0.35
    };

    await this.map.addCircles([circle]);
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
