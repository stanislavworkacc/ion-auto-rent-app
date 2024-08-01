import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {IonFab, IonFabButton, IonFabList, IonIcon} from "@ionic/angular/standalone";
import {AuthService} from "../../../../../../../../../../shared/services/auth-service";

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrkIdPassportComponent  implements OnInit {

  private authService: AuthService = inject(AuthService);
  isSignPad: WritableSignal<boolean> = signal(false);

  get auth() {
    return this.authService;
  }
  async signPassport() {
    await this.matchPassword().then(() => this.showSignaturePad());
  }

  async editPassport() {
    const confirmed: boolean = await this.matchPassword();
  }

  showSignaturePad(): void {
    this.isSignPad.set(true);
  }
  matchPassword() {
    return this.auth.confirmPassword()
  }
  ngOnInit() {}

}
