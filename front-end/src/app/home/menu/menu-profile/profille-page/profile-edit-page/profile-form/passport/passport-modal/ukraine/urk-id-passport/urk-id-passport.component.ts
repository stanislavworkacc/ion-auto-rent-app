import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {
  IonCheckbox,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel, IonRadio,
  IonRadioGroup
} from "@ionic/angular/standalone";
import {AuthService} from "../../../../../../../../../../shared/services/auth-service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {EditUrkIdValuesComponent} from "./edit-urk-values/edit-urk-values.component";
import {SignaturePadModule} from "angular2-signaturepad";

@Component({
  selector: 'urk-id-passport',
  templateUrl: './urk-id-passport.component.html',
  styleUrls: ['./urk-id-passport.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonFab,
    IonFabButton,
    IonFabList,
    IonItem,
    IonLabel,
    IonCheckbox,
    FormsModule,
    IonRadioGroup,
    IonRadio,
    NgForOf,
    EditUrkIdValuesComponent,
    SignaturePadModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkIdPassportComponent  implements OnInit {

  private authService: AuthService = inject(AuthService);

  gender: string = '';

  private passportDataRaw = [
    { key: 'Прізвище', value: 'ТКАЧЕНКО' },
    { key: "Ім'я", value: 'МАР\'ЯНА' },
    { key: 'По батькові', value: 'ІВАНІВНА' },
    { key: 'Стать', value: 'Не вказано' },
    { key: 'Громадянство', value: 'Україна/UKR' },
    { key: 'Дата народження', value: 'Не вказано' },
    { key: 'Дійсний до', value: 'Не вказано' },
    { key: 'Запис №.', value: 'Не вказано' },
    { key: 'Document No.', value: 'Не вказано' }
  ];

  passportDataSignals = this.passportDataRaw.map(item => signal(item));
  passportData: Signal<{key: string, value: string}[]>
    = computed(() =>
    this.passportDataSignals.map((sig: WritableSignal<{key: string, value: string}>) => sig()));
  signatureImage: WritableSignal<string> = signal('');

  get auth() {
    return this.authService;
  }
  async editPassport(): Promise<void> {
    const confirmed: boolean = await this.matchPassword();
  }

  matchPassword() {
    return this.auth.confirmPassword()
  }
  ngOnInit() {}

}
