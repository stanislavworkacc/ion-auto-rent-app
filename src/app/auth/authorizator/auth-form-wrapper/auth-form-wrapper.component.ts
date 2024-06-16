import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {CloseBtnComponent} from "../../../shared/ui-kit/components/close-btn/close-btn.component";

@Component({
  selector: 'auth-form-wrapper',
  templateUrl: './auth-form-wrapper.component.html',
  styleUrls: ['./auth-form-wrapper.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    IonicModule,
    CloseBtnComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormWrapperComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  public initialBreakpoint: number = 0.5;

  ngOnInit() {
    setTimeout(() => {
      this.openModal();
    }, 500);
  }

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
}
