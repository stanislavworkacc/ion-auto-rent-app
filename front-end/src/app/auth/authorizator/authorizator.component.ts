import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthFormWrapperComponent} from "./auth-form-wrapper/auth-form-wrapper.component";
import {IonButton, IonIcon} from "@ionic/angular/standalone";

@Component({
  selector: 'app-authorizator',
  templateUrl: './authorizator.component.html',
  styleUrls: ['./authorizator.component.scss'],
  standalone: true,
  imports: [
    AuthFormWrapperComponent,
    IonButton,
    IonIcon
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizatorComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
