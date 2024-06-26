import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  Renderer2, signal, WritableSignal
} from '@angular/core';
import {PrivacyPolicyComponent} from "../privacy-policy/privacy-policy.component";
import {IonButton, IonCard, IonCardContent, IonIcon} from "@ionic/angular/standalone";
import {GoogleSsoService} from "../google-sso.service";
import {ToasterService} from "../../../shared/components/app-toast/toaster.service";
import {environment} from "../../../../environments/environment";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {catchError, filter, map} from "rxjs/operators";
import {handleError} from "../../../shared/utils/errorHandler";

@Component({
  selector: 'app-google-sso',
  templateUrl: './google-sso.component.html',
  styleUrls: ['./google-sso.component.scss'],
  standalone: true,
  imports: [
    PrivacyPolicyComponent,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSsoComponent  implements OnInit, AfterViewInit {

  private googleSSOService: GoogleSsoService = inject(GoogleSsoService);
  private toaster: ToasterService = inject(ToasterService);
  private _destroyRef: DestroyRef = inject(DestroyRef);
  private renderer: Renderer2 = inject(Renderer2);

  public isLogin: InputSignal<boolean> = input(false);
  public privacyPolicyAgreement: WritableSignal<boolean> = signal(false);

  private clientId: string = environment.GOOGLE_CLIENT_ID;

  initSSOSubscription(): void {
    this.googleSSOService.googleSSOLoaded$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((loaded: boolean) => loaded),
        map(() => this.initializeGoogleSSO()),
        catchError(({ error }) => handleError(error, this.toaster))
      )
      .subscribe();

    this.googleSSOService.loadGoogleSSOScript(this.renderer).subscribe();
  }

  private initializeGoogleSSO(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => this.handleGoogleSignIn(response)
    });

    // Manually bind the click event to the custom button
    const customButton = document.getElementById('google-btn');
    if (customButton) {
      customButton.addEventListener('click', () => {
        // @ts-ignore
        google.accounts.id.prompt();
      });
    }
  }
  handleGoogleSignIn(res) {
    const parsed = this.decodeToken(res.credential)

    debugger
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.initSSOSubscription();
  }
  constructor() { }

}
