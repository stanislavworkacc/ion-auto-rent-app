import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AdditionalOptionsService} from "./additional-options.service";
import {IonChip, IonIcon, IonLabel} from "@ionic/angular/standalone";

@Component({
  selector: 'additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.scss'],
  standalone: true,
  imports: [
    IonChip,
    IonIcon,
    IonLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalOptionsComponent  implements OnInit {

  private additionalOptionsService: AdditionalOptionsService = inject(AdditionalOptionsService);

  get additionalOptions() {
    return this.additionalOptionsService;
  }

  selectOption(option): void {
    this.additionalOptionsService.selectOption(option);
  }
  ngOnInit() {}

}
