import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonSegment, IonSegmentButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {SegmentsComponent} from "../../../../../../../../shared/ui-kit/components/segments/segments.component";
import {DOC_TYPE, PASSPORT_UKR} from "../../profile-form.enums";
import {IonFabComponent} from "../../../../../../../../shared/ui-kit/components/ion-fab/ion-fab.component";
import {SignUpFormComponent} from "../../../../../../../../auth/authorizator/sign-up-form/sign-up-form.component";
import {UrkIdPassportComponent} from "./ukraine/urk-id-passport/urk-id-passport.component";

@Component({
  selector: 'app-passport-modal',
  templateUrl: './passport-modal.component.html',
  styleUrls: ['./passport-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    NgIf,
    IonItem,
    IonLabel,
    IonInput,
    SegmentsComponent,
    IonSegment,
    IonSegmentButton,
    IonFabComponent,
    SignUpFormComponent,
    UrkIdPassportComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassportModalComponent  implements OnInit {
  protected readonly DOC_TYPE = DOC_TYPE;
  protected readonly PASSPORT_UKR = PASSPORT_UKR;

  public passportTypes: WritableSignal<{ value: string, label: string }[]> = signal([]);
  public selectedPassport: WritableSignal<{ value: string, label: string }> = signal(null);

  setPassportTypes(): void {
    this.passportTypes.set([
      { value: PASSPORT_UKR.OLD, label: 'Паспорт' },
      { value: PASSPORT_UKR.ID, label: 'ID Паспорт' },
    ]);

    this.selectedPassport.set({ value: PASSPORT_UKR.ID, label: 'ID Паспорт' })
  }

  onSegmentChange(event: any) {
    const selectedValue = event.detail.value;
    const selectedOption = this.passportTypes().find(option => option.value === selectedValue);
    this.selectedPassport.set(selectedOption);
  }
  ngOnInit() {
    this.setPassportTypes();
  }
}
