import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject, input,
  Input, InputSignal,
  OnInit,
  WritableSignal
} from '@angular/core';
import {SliderFullPreviewComponent} from "./slider-full-preview/slider-full-preview.component";
import {ModalController} from "@ionic/angular/standalone";

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardSliderComponent implements OnInit {
  images: InputSignal<any[]> = input([])

  ngOnInit() {
  }

}
