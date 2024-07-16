import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, inject,
  OnInit, signal,
  ViewChild, WritableSignal
} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../environments/environment";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLabel,
  IonToolbar
} from "@ionic/angular/standalone";
import {LocatorService} from "./locator-service";
import {LocatorLoaderComponent} from "./locator-loader/locator-loader.component";
import {IonFabComponent} from "../../shared/ui-kit/components/ion-fab/ion-fab.component";

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
    IonIcon,
    LocatorLoaderComponent,
    IonFabComponent,
    IonFab,
    IonFabButton,
    IonFabList
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LocatorComponent  implements OnInit, AfterViewInit {

  private locatorService: LocatorService = inject(LocatorService);

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('mapLoader') mapLoader: ElementRef;

  isMapCreated: WritableSignal<boolean>  = signal(false);

  get locator() {
    return this.locatorService;
  }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    await this.locator.createGoogleMap(this.mapRef).then(() => {
      setTimeout(() => {
        this.isMapCreated.set(true)
      },1500)
    });
  }
}
