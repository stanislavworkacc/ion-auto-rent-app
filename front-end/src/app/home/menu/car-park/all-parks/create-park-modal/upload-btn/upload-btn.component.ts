import {ChangeDetectionStrategy, Component, input, Input, InputSignal, OnInit} from '@angular/core';
import {IonButton, IonButtons, IonIcon, IonLabel, IonProgressBar} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonLabel,
    IonIcon,
    IonProgressBar,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadBtnComponent  implements OnInit {

  @Input() handleFileUpload: (event) => void;
  logoUploading: InputSignal<boolean> = input(false)
  uploadProgress: InputSignal<number> = input(0)

  ngOnInit() {}

}
