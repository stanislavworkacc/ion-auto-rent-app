import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../environments/environment";
import {IonContent, IonHeader, IonIcon, IonLabel, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonLabel,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocatorComponent  implements OnInit, AfterViewInit {

  private cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('map') mapRef: ElementRef;

  map: GoogleMap;
  async createMap(): Promise<void> {
    // @ts-ignore
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.GOOGLE_KEY,
      forceCreate: true,
      element: this.mapRef.nativeElement,
      language: 'uk',
      config: {
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        streetViewControl: false,
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 12,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#202c3e"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "gamma": 0.01
              },
              {
                "lightness": 20
              },
              {
                "weight": "1.39"
              },
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "weight": "0.96"
              },
              {
                "saturation": "9"
              },
              {
                "visibility": "on"
              },
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 30
              },
              {
                "saturation": "9"
              },
              {
                "color": "#29446b"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "saturation": 20
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 20
              },
              {
                "saturation": -20
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 10
              },
              {
                "saturation": -30
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "saturation": 25
              },
              {
                "lightness": 25
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "lightness": -20
              }
            ]
          }
        ]
      }
    });

    this.addMarker(33.6, -117.9, 'Default Location');
  }

  addMarker(lat: number, lng: number, title: string) {
    this.map.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      title: title
    });
  }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    setTimeout(async () => {
      await this.createMap();

    },1260)
    // this.cdRef.markForCheck()
  }
}
